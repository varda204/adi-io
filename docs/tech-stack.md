# Kordra Tech Stack

## Table of Contents
1. [Overview](#overview)
2. [Model Layer](#model-layer)
3. [Orchestration Layer](#orchestration-layer)
4. [Memory Layer](#memory-layer)
5. [State Store](#state-store)
6. [Policy Engine](#policy-engine)
7. [Infrastructure Assumptions](#infrastructure-assumptions)

---

## Overview

Kordra's technology stack is designed for **autonomous AI development** with a focus on:
- **Model flexibility**: Support multiple LLM providers
- **Scalable orchestration**: Handle complex multi-agent workflows
- **Persistent memory**: Maintain context across sessions
- **Security-first**: Built-in policy enforcement
- **Cloud-native**: Designed for containerized deployment

---

## Model Layer

### API-Based Large Language Models

The model layer provides the reasoning and generation capabilities for all agents.

#### **Primary Models**

| Provider | Model | Use Case | Context Window | Cost ($/1M tokens) |
|----------|-------|----------|----------------|-------------------|
| **OpenAI** | GPT-4 Turbo | Complex reasoning, code generation | 128k | Input: $10, Output: $30 |
| **OpenAI** | GPT-3.5 Turbo | Simple tasks, quick responses | 16k | Input: $0.50, Output: $1.50 |
| **Anthropic** | Claude 3 Opus | Long context analysis, planning | 200k | Input: $15, Output: $75 |
| **Anthropic** | Claude 3 Sonnet | Balanced performance/cost | 200k | Input: $3, Output: $15 |
| **Google** | Gemini 1.5 Pro | Multi-modal understanding | 1M | Input: $7, Output: $21 |

#### **Model Selection Strategy**

```python
def select_model(task_type: str, context_size: int, budget: float):
    """
    Intelligently route tasks to appropriate models
    """
    if context_size > 128_000:
        return "claude-3-opus"  # Long context
    
    if task_type in ["code_generation", "refactoring"]:
        return "gpt-4-turbo"  # Best for code
    
    if task_type in ["simple_query", "clarification"]:
        return "gpt-3.5-turbo"  # Cost-effective
    
    if budget < 0.01:  # Low budget
        return "gpt-3.5-turbo"
    
    return "gpt-4-turbo"  # Default
```

#### **Embedding Models**

For vector database operations:

| Provider | Model | Dimensions | Use Case |
|----------|-------|-----------|----------|
| **OpenAI** | text-embedding-3-large | 3072 | High-quality code embeddings |
| **OpenAI** | text-embedding-3-small | 1536 | Cost-effective search |
| **Cohere** | embed-english-v3.0 | 1024 | Specialized for semantic search |

#### **Fallback Strategy**

```yaml
primary: gpt-4-turbo
fallbacks:
  - claude-3-sonnet
  - gpt-3.5-turbo
retry_policy:
  max_attempts: 3
  backoff: exponential
  timeout: 30s
```

#### **Local Model Support (Future)**

For air-gapped or privacy-sensitive deployments:
- **LLaMA 2/3**: Open-source, good performance
- **Mistral**: Efficient, commercially friendly
- **Code LLaMA**: Specialized for code tasks
- **StarCoder**: Code generation focus

---

## Orchestration Layer

### Agent Workflow Management

#### **Primary: LangGraph**

**Why LangGraph?**
- Built specifically for AI agent workflows
- Native state management
- Cycle support for iterative tasks
- Easy visualization of agent graphs
- Strong TypeScript/Python support

**Example Workflow Definition**:
```python
from langgraph.graph import StateGraph, END

# Define workflow state
class WorkflowState(TypedDict):
    task: str
    code: str
    tests: str
    status: str

# Create graph
workflow = StateGraph(WorkflowState)

# Add nodes (agents)
workflow.add_node("planner", plan_task)
workflow.add_node("coder", generate_code)
workflow.add_node("tester", create_tests)
workflow.add_node("reviewer", review_code)

# Define edges (flow)
workflow.add_edge("planner", "coder")
workflow.add_edge("coder", "tester")
workflow.add_edge("tester", "reviewer")

# Conditional routing
workflow.add_conditional_edges(
    "reviewer",
    should_iterate,
    {
        True: "coder",  # Needs revision
        False: END      # Approved
    }
)

# Set entry point
workflow.set_entry_point("planner")

# Compile
app = workflow.compile()
```

#### **Alternative: Custom State Machine**

For simpler use cases or custom requirements:

```typescript
class WorkflowEngine {
  private state: WorkflowState;
  private transitions: Map<string, Transition[]>;
  
  async execute(workflow: Workflow): Promise<Result> {
    while (!this.isComplete(this.state)) {
      const currentStep = this.state.currentStep;
      const agent = this.getAgent(currentStep);
      
      // Execute agent
      const result = await agent.execute(this.state);
      
      // Update state
      this.state = this.applyTransition(result);
      
      // Check guardrails
      await this.checkGuardrails(this.state);
      
      // Emit event
      this.eventBus.emit('step.completed', {
        step: currentStep,
        result: result
      });
    }
    
    return this.state.finalResult;
  }
}
```

#### **Orchestration Features**

| Feature | LangGraph | Custom |
|---------|-----------|--------|
| Visual workflow editing | ✅ | ❌ |
| Cycle support | ✅ | ✅ |
| State persistence | ✅ | Manual |
| Error handling | Built-in | Custom |
| Streaming output | ✅ | Manual |
| Time travel debugging | ✅ | ❌ |

---

## Memory Layer

### Vector Database

#### **Options**

| Database | Hosting | Performance | Cost | Best For |
|----------|---------|-------------|------|----------|
| **Pinecone** | Managed | Excellent | $$$ | Production, zero-ops |
| **Weaviate** | Self-hosted/Cloud | Excellent | $$ | Hybrid search, flexibility |
| **Qdrant** | Self-hosted/Cloud | Very Good | $$ | Privacy, on-prem |
| **Chroma** | Self-hosted | Good | $ | Development, small scale |
| **pgvector** | PostgreSQL | Good | $ | Existing Postgres infrastructure |

#### **Recommended: Pinecone**

**Why Pinecone?**
- Fully managed (no ops burden)
- Excellent performance at scale
- Built-in metadata filtering
- Good Python/TypeScript SDKs
- SLA guarantees

**Setup Example**:
```python
import pinecone

# Initialize
pinecone.init(
    api_key=os.getenv("PINECONE_API_KEY"),
    environment="us-west1-gcp"
)

# Create index
index_name = "kordra-memory"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=3072,  # text-embedding-3-large
        metric="cosine",
        metadata_config={
            "indexed": ["project_id", "type", "timestamp"]
        }
    )

# Connect to index
index = pinecone.Index(index_name)

# Upsert vectors
index.upsert(vectors=[
    {
        "id": "code_snippet_123",
        "values": embedding_vector,
        "metadata": {
            "project_id": "proj_456",
            "type": "code",
            "language": "typescript",
            "timestamp": "2026-02-17T10:00:00Z"
        }
    }
])

# Query
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True,
    filter={"project_id": "proj_456"}
)
```

#### **Data Schema**

```json
{
  "id": "unique_id",
  "vector": [0.1, 0.2, ...],  // 3072 dimensions
  "metadata": {
    "project_id": "proj_123",
    "type": "code|conversation|decision|error",
    "content": "Original text content",
    "language": "typescript",
    "file_path": "src/auth/login.ts",
    "timestamp": "2026-02-17T10:00:00Z",
    "author": "agent|user",
    "tags": ["authentication", "security"]
  }
}
```

#### **Retrieval Strategy**

```python
async def retrieve_context(query: str, filters: Dict) -> List[Context]:
    # 1. Generate embedding
    embedding = await openai.embeddings.create(
        model="text-embedding-3-large",
        input=query
    )
    
    # 2. Search vector DB
    results = index.query(
        vector=embedding.data[0].embedding,
        top_k=10,
        filter=filters,
        include_metadata=True
    )
    
    # 3. Rerank by recency
    scored_results = [
        {
            **r,
            "score": r.score * recency_weight(r.metadata.timestamp)
        }
        for r in results.matches
    ]
    
    # 4. Return top K
    return sorted(scored_results, key=lambda x: x.score, reverse=True)[:5]
```

---

## State Store

### Session & Workflow State Management

#### **Primary: Redis**

**Why Redis?**
- In-memory performance (sub-millisecond latency)
- Native pub/sub for events
- Stream support for event sourcing
- Persistence options (AOF, RDB)
- Clustering for scale

**Use Cases**:
- Active workflow state
- Agent internal state
- Session data
- Task queues
- Rate limiting counters

**Example**:
```python
import redis

# Connect
r = redis.Redis(
    host='localhost',
    port=6379,
    decode_responses=True
)

# Store workflow state
workflow_id = "wf_123"
state = {
    "current_step": "code_generation",
    "progress": 0.65,
    "variables": {"user_id": "usr_456"},
    "checkpoint": "step_3_completed"
}

r.hset(f"workflow:{workflow_id}", mapping=state)
r.expire(f"workflow:{workflow_id}", 86400)  # 24h TTL

# Retrieve state
current_state = r.hgetall(f"workflow:{workflow_id}")
```

#### **Secondary: PostgreSQL**

**Why PostgreSQL?**
- ACID guarantees
- Complex queries
- Long-term persistence
- Audit trail
- Relationships between entities

**Use Cases**:
- Workflow history
- User accounts
- Project metadata
- Deployment records
- Audit logs

**Schema Example**:
```sql
CREATE TABLE workflows (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    state JSONB NOT NULL,
    result JSONB
);

CREATE INDEX idx_workflows_user ON workflows(user_id);
CREATE INDEX idx_workflows_project ON workflows(project_id);
CREATE INDEX idx_workflows_status ON workflows(status);
```

#### **State Management Pattern**

```python
class StateManager:
    def __init__(self, redis_client, postgres_client):
        self.redis = redis_client
        self.postgres = postgres_client
    
    async def save_state(self, workflow_id: str, state: Dict):
        # Hot state in Redis
        await self.redis.hset(f"workflow:{workflow_id}", mapping=state)
        await self.redis.expire(f"workflow:{workflow_id}", 3600)
        
        # Checkpoint to PostgreSQL every N steps
        if state.get("checkpoint_required"):
            await self.postgres.execute(
                """
                INSERT INTO workflow_checkpoints
                (workflow_id, step, state, timestamp)
                VALUES ($1, $2, $3, NOW())
                """,
                workflow_id, state["current_step"], state
            )
    
    async def restore_state(self, workflow_id: str) -> Dict:
        # Try Redis first
        state = await self.redis.hgetall(f"workflow:{workflow_id}")
        
        if not state:
            # Fallback to PostgreSQL
            state = await self.postgres.fetchrow(
                """
                SELECT state FROM workflow_checkpoints
                WHERE workflow_id = $1
                ORDER BY timestamp DESC
                LIMIT 1
                """,
                workflow_id
            )
        
        return state
```

---

## Policy Engine

### Guardrail Enforcement Framework

#### **Architecture**

```
┌─────────────────────────────────────┐
│      Policy Engine                   │
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Rule Registry                 │ │
│  │  • Built-in rules              │ │
│  │  • Custom rules                │ │
│  │  • Rule priorities             │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Evaluation Engine             │ │
│  │  • Rule matching               │ │
│  │  • Condition evaluation        │ │
│  │  • Action execution            │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Enforcement                   │ │
│  │  • Block                       │ │
│  │  • Warn                        │ │
│  │  • Require approval            │ │
│  │  • Audit                       │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### **Rule Definition Language**

```yaml
rules:
  - id: no-secrets-in-code
    name: "Prevent hardcoded secrets"
    type: security
    severity: critical
    condition:
      pattern: "(api[_-]?key|password|secret|token)\\s*=\\s*['\"][^'\"]+['\"]"
      scope: "**/*.{ts,js,py}"
    action: block
    message: "Hardcoded secrets detected. Use environment variables."
  
  - id: require-tests
    name: "All code must have tests"
    type: quality
    severity: warning
    condition:
      files_changed: "src/**/*.ts"
      missing_files: "src/**/*.test.ts"
    action: warn
    message: "No test file found for modified code."
  
  - id: production-deployment-approval
    name: "Production requires approval"
    type: governance
    severity: high
    condition:
      action: deploy
      environment: production
    action: require_approval
    approvers: ["tech-lead", "devops"]
    message: "Production deployment requires approval."
```

#### **Implementation**

```python
class PolicyEngine:
    def __init__(self):
        self.rules = self.load_rules()
    
    async def evaluate(self, context: Context) -> PolicyResult:
        violations = []
        warnings = []
        approvals_needed = []
        
        for rule in self.rules:
            if self.matches(rule, context):
                result = await self.evaluate_rule(rule, context)
                
                if result.violated:
                    if rule.action == "block":
                        violations.append(result)
                    elif rule.action == "warn":
                        warnings.append(result)
                    elif rule.action == "require_approval":
                        approvals_needed.append(result)
        
        return PolicyResult(
            passed=len(violations) == 0,
            violations=violations,
            warnings=warnings,
            approvals_needed=approvals_needed
        )
    
    def matches(self, rule: Rule, context: Context) -> bool:
        # Evaluate conditions
        if rule.condition.get("pattern"):
            return self.pattern_match(
                rule.condition["pattern"],
                context.content
            )
        
        if rule.condition.get("action"):
            return context.action == rule.condition["action"]
        
        return True
```

#### **Security Scanners Integration**

| Tool | Purpose | Integration |
|------|---------|-------------|
| **CodeQL** | Static code analysis | GitHub Actions / CLI |
| **Semgrep** | Pattern-based security scanning | CLI / API |
| **TruffleHog** | Secret detection | CLI |
| **npm audit** | Dependency vulnerabilities | CLI |
| **Snyk** | Comprehensive security | API |

**Example Integration**:
```python
async def run_security_scan(code: str, language: str) -> List[Issue]:
    scanners = [
        CodeQLScanner(language),
        SemgrepScanner(language),
        TruffleHogScanner()
    ]
    
    issues = []
    for scanner in scanners:
        scanner_issues = await scanner.scan(code)
        issues.extend(scanner_issues)
    
    return deduplicate(issues)
```

---

## Infrastructure Assumptions

### Deployment Architecture

#### **Containerized Deployment (Kubernetes)**

```yaml
# Recommended production setup
Components:
  - Frontend: React SPA (Nginx container)
  - Backend API: Node.js/Python (multiple replicas)
  - Agent Workers: Python (auto-scaling pods)
  - Redis: StatefulSet with persistence
  - PostgreSQL: StatefulSet with replication
  - Vector DB: Pinecone (managed) or Weaviate (StatefulSet)

Resources:
  Frontend:
    replicas: 2
    cpu: 200m
    memory: 256Mi
  
  Backend API:
    replicas: 3
    cpu: 500m
    memory: 1Gi
  
  Agent Workers:
    replicas: 2-10 (auto-scale)
    cpu: 1000m
    memory: 2Gi
  
  Redis:
    replicas: 3 (cluster)
    cpu: 500m
    memory: 2Gi
    storage: 10Gi
  
  PostgreSQL:
    replicas: 2 (primary + replica)
    cpu: 1000m
    memory: 4Gi
    storage: 50Gi
```

#### **Networking**

```yaml
Ingress:
  - domain: app.kordra.ai
    routes:
      - path: /
        service: frontend
      - path: /api
        service: backend-api
      - path: /ws
        service: websocket-server

TLS: Let's Encrypt (cert-manager)

Internal Services:
  - redis.kordra.svc.cluster.local:6379
  - postgres.kordra.svc.cluster.local:5432
  - agent-workers.kordra.svc.cluster.local:8080
```

#### **Observability**

| Component | Tool | Purpose |
|-----------|------|---------|
| **Metrics** | Prometheus + Grafana | System health, performance |
| **Logs** | Loki + Grafana | Centralized logging |
| **Traces** | Tempo + Grafana | Distributed tracing |
| **APM** | Sentry | Error tracking |
| **Uptime** | Pingdom / UptimeRobot | External monitoring |

#### **CI/CD Pipeline**

```yaml
name: Deploy Kordra
on:
  push:
    branches: [main]

jobs:
  test:
    - Run unit tests
    - Run integration tests
    - Security scan (CodeQL)
  
  build:
    - Build Docker images
    - Push to registry
    - Scan images (Trivy)
  
  deploy:
    - Deploy to staging (auto)
    - Run smoke tests
    - Deploy to production (manual approval)
    - Health check
    - Rollback on failure
```

#### **Scaling Strategy**

**Horizontal Pod Autoscaler**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: agent-workers-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: agent-workers
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

#### **Backup & Disaster Recovery**

```yaml
Backup Strategy:
  PostgreSQL:
    frequency: Hourly incremental, Daily full
    retention: 30 days
    tool: pg_dump + S3
  
  Redis:
    frequency: Every 5 minutes (RDB)
    retention: 7 days
    tool: Redis persistence + S3
  
  Vector DB:
    frequency: Daily export
    retention: 30 days
    tool: Pinecone backup API

Recovery Time Objective (RTO): 1 hour
Recovery Point Objective (RPO): 5 minutes
```

#### **Security Considerations**

```yaml
Network Security:
  - Private VPC
  - Network policies (deny all by default)
  - Ingress firewall rules
  - TLS everywhere (internal + external)

Secrets Management:
  - Kubernetes Secrets
  - External Secrets Operator (AWS Secrets Manager / Vault)
  - Rotate credentials every 90 days

Access Control:
  - RBAC for Kubernetes
  - IAM roles for cloud resources
  - Principle of least privilege
  - MFA for admin access

Compliance:
  - SOC 2 Type II
  - GDPR compliance
  - Data encryption at rest and in transit
  - Audit logging
```

---

## Technology Choices Summary

| Layer | Primary Choice | Alternative | Rationale |
|-------|---------------|-------------|-----------|
| **LLM** | OpenAI GPT-4 | Anthropic Claude | Best code generation, wide adoption |
| **Embeddings** | OpenAI text-embedding-3-large | Cohere embed-v3 | High quality, 3072 dimensions |
| **Orchestration** | LangGraph | Custom state machine | Built for AI workflows, good DX |
| **Vector DB** | Pinecone | Weaviate | Managed, zero-ops, excellent performance |
| **State Store** | Redis | None | Sub-ms latency, pub/sub, streams |
| **Database** | PostgreSQL | None | ACID, mature, rich ecosystem |
| **Message Queue** | Redis Streams | Kafka | Simpler, same stack as state store |
| **Container Runtime** | Kubernetes | Docker Swarm | Industry standard, rich ecosystem |
| **CI/CD** | GitHub Actions | GitLab CI | Native integration, free for OSS |
| **Monitoring** | Grafana Stack | Datadog | Open-source, self-hosted option |

---

## Development vs Production

### Development Setup

```bash
# Minimal setup for local development
docker-compose.yml:
  - Frontend: localhost:8080
  - Backend: localhost:3000
  - Redis: localhost:6379
  - PostgreSQL: localhost:5432
  - Chroma (vector DB): localhost:8000

Environment: .env.development
LLM: GPT-3.5 Turbo (cost-effective)
```

### Production Setup

```bash
# Full production infrastructure
Platform: Kubernetes (AWS EKS / GCP GKE)
  - Frontend: CDN + Nginx
  - Backend: Auto-scaling pods
  - Redis: Managed (ElastiCache / Cloud Memorystore)
  - PostgreSQL: Managed (RDS / Cloud SQL)
  - Pinecone: Managed

Environment: Kubernetes Secrets
LLM: GPT-4 Turbo (best quality)
```

---

**Last Updated**: February 2026  
**Version**: 1.0.0
