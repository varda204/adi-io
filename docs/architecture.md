# Kordra Architecture

## Table of Contents
1. [System Overview](#system-overview)
2. [System Components](#system-components)
3. [Agent Orchestration](#agent-orchestration)
4. [Memory Layer](#memory-layer)
5. [Tool Integrations](#tool-integrations)
6. [Event-Driven Model](#event-driven-model)
7. [Guardrails](#guardrails)

---

## System Overview

Kordra is built as a multi-layered autonomous AI development platform. The architecture is designed to support:
- **Stateful execution** across multiple sessions
- **Multi-agent orchestration** for complex workflows
- **Persistent memory** for context retention
- **Security-first design** with built-in guardrails
- **Extensible tool framework** for integration flexibility

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                           │
│  (Web UI, CLI, Voice Interface, API Endpoints)                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Agent Orchestration Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Task Planner │  │ Code Agent   │  │Deploy Agent  │         │
│  │    Agent     │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         ▲                 ▲                  ▲                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                       │
│                  ┌────────┴────────┐                            │
│                  │  State Machine  │                            │
│                  │  (Workflow Mgmt)│                            │
│                  └─────────────────┘                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Memory Layer                                │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │  Vector Database │  │  State Store     │                    │
│  │  (Long-term)     │  │  (Session State) │                    │
│  │  - Pinecone      │  │  - Redis         │                    │
│  │  - Weaviate      │  │  - PostgreSQL    │                    │
│  └──────────────────┘  └──────────────────┘                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Tool Execution Layer                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │  Git   │ │ Build  │ │  Test  │ │ Deploy │ │   API  │       │
│  │ Tools  │ │ Tools  │ │ Runner │ │ Engine │ │Gateway │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Guardrails & Policy Layer                       │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ Security Scanner │  │  Policy Engine   │                    │
│  │ - CodeQL         │  │  - Custom Rules  │                    │
│  │ - Semgrep        │  │  - Compliance    │                    │
│  └──────────────────┘  └──────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## System Components

### 1. Presentation Layer

**Purpose**: User interaction entry points

**Components**:
- **Web UI**: React-based dashboard for project management, monitoring, and configuration
- **CLI**: Command-line interface for scriptable interactions
- **Voice Interface**: Natural language voice commands ("Hey Kordra, deploy to staging")
- **API Gateway**: RESTful and GraphQL endpoints for programmatic access

**Key Features**:
- Multi-modal input (text, voice, API)
- Real-time status updates via WebSocket
- Role-based access control
- Session management

---

### 2. Agent Orchestration Layer

**Purpose**: Coordinate multiple specialized AI agents to execute complex workflows

**Core Components**:

#### **Task Planner Agent**
- **Responsibility**: Decompose high-level requests into executable sub-tasks
- **Example**: "Build authentication" → [Design schema, Write code, Create tests, Deploy]
- **Key Features**:
  - Task dependency resolution
  - Parallel vs sequential execution planning
  - Resource allocation
  - Progress tracking

#### **Code Agent**
- **Responsibility**: Generate, refactor, and review code
- **Key Features**:
  - Context-aware code generation
  - Multi-file editing
  - Code style enforcement
  - Documentation generation

#### **Deploy Agent**
- **Responsibility**: Handle deployment workflows
- **Key Features**:
  - Multi-platform deployment (Vercel, Netlify, AWS, etc.)
  - Environment configuration
  - Rollback capabilities
  - Health check validation

#### **QA Agent**
- **Responsibility**: Testing and quality assurance
- **Key Features**:
  - Automated test generation
  - Test execution and reporting
  - Performance benchmarking
  - Bug detection

**State Machine**:
- Coordinates agent interactions
- Manages workflow state transitions
- Handles error recovery and retries
- Implements checkpoint/resume logic

---

### 3. Model Integration Layer

**Purpose**: Interface with LLM providers

**Supported Models**:
- **OpenAI GPT-4**: Primary reasoning and code generation
- **Anthropic Claude**: Long-context analysis and planning
- **Google Gemini**: Multi-modal understanding
- **Open-source models**: Local deployment options (LLaMA, Mistral)

**Features**:
- Model selection based on task type
- Fallback strategies for API failures
- Cost optimization (route simple tasks to cheaper models)
- Response caching to reduce API calls

---

## Agent Orchestration

### Workflow Execution Model

```
User Request
     │
     ▼
┌─────────────────┐
│ Task Planner    │  ← Decomposes into sub-tasks
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Task Queue     │  ← Prioritizes and schedules
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Parallel Agent Execution            │
│  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Agent1│  │Agent2│  │Agent3│       │
│  └──────┘  └──────┘  └──────┘       │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  Result Aggregation & Validation    │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  Guardrail Check                    │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│  Execute (or Human Approval)        │
└─────────────────────────────────────┘
```

### Agent Communication Protocol

**Message Format**:
```json
{
  "agent_id": "code_agent_01",
  "task_id": "auth_implementation_123",
  "status": "in_progress",
  "progress": 0.65,
  "output": {
    "files_modified": ["auth.ts", "user.model.ts"],
    "tests_created": ["auth.test.ts"],
    "coverage": 0.87
  },
  "next_action": "request_review",
  "dependencies": ["qa_agent_validation"]
}
```

### Coordination Strategies

1. **Sequential Execution**: Tasks that depend on previous outputs
2. **Parallel Execution**: Independent tasks executed simultaneously
3. **Event-Driven**: Agents react to events (e.g., build completion triggers deployment)
4. **Human-in-the-Loop**: Critical decisions require human approval

---

## Memory Layer

### Architecture

```
┌────────────────────────────────────────────────────┐
│              Memory Management                      │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐       │
│  │  Vector Database │  │  State Store     │       │
│  │  (Long-term)     │  │  (Session)       │       │
│  ├──────────────────┤  ├──────────────────┤       │
│  │ • Code snippets  │  │ • Active tasks   │       │
│  │ • Conversations  │  │ • Agent state    │       │
│  │ • Decisions      │  │ • Variables      │       │
│  │ • Project context│  │ • Checkpoints    │       │
│  └──────────────────┘  └──────────────────┘       │
│                                                     │
│  ┌──────────────────────────────────────┐         │
│  │        Retrieval System              │         │
│  │  • Semantic search                   │         │
│  │  • Relevance ranking                 │         │
│  │  • Context windowing                 │         │
│  └──────────────────────────────────────┘         │
└────────────────────────────────────────────────────┘
```

### Long-Term Memory (Vector Database)

**Stored Information**:
- **Code Context**: Functions, classes, modules, and their relationships
- **Conversation History**: Past interactions and decisions
- **Project Knowledge**: Architecture decisions, coding standards, patterns
- **Error Resolutions**: How past bugs were fixed

**Implementation**:
- **Embedding Model**: OpenAI `text-embedding-3-large` or similar
- **Vector DB Options**: Pinecone, Weaviate, Qdrant, or Chroma
- **Retrieval**: Semantic search with cosine similarity
- **Chunking Strategy**: Code blocks, functions, or semantic units

**Example Query**:
```python
# User asks: "How did we implement rate limiting before?"
query_embedding = embed("rate limiting implementation")
similar_contexts = vector_db.search(query_embedding, top_k=5)
# Returns: Previous rate limiting code, decisions, and discussions
```

### Session State (State Store)

**Stored Information**:
- **Active Tasks**: Current task queue and execution state
- **Agent State**: Each agent's internal state and context
- **Temporary Variables**: Runtime data for workflow execution
- **Checkpoints**: Save points for resuming interrupted workflows

**Implementation**:
- **Primary**: Redis for fast read/write
- **Backup**: PostgreSQL for persistence and durability
- **TTL**: Configurable expiration for temporary data

### Memory Retrieval Strategy

1. **Query Analysis**: Determine what information is needed
2. **Semantic Search**: Query vector database for relevant context
3. **Recency Weighting**: Prioritize recent information
4. **Relevance Filtering**: Only include context above similarity threshold
5. **Context Window Management**: Fit retrieved data into LLM context limit

---

## Tool Integrations

### Tool Framework Architecture

```
┌────────────────────────────────────────────┐
│           Tool Registry                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Git Tool │  │Build Tool│  │Test Tool │ │
│  └──────────┘  └──────────┘  └──────────┘ │
└────────────────────────────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────────┐
│       Tool Execution Engine                 │
│  • Parameter validation                     │
│  • Permission checking                      │
│  • Execution sandboxing                     │
│  • Result caching                           │
└────────────────────────────────────────────┘
```

### Core Tool Categories

#### **1. Version Control Tools**
- **Git Operations**: clone, commit, push, pull, branch, merge
- **PR Management**: create PR, request review, merge
- **Repository Analysis**: diff, log, blame
- **Integration**: GitHub, GitLab, Bitbucket APIs

#### **2. Build & Test Tools**
- **Build Systems**: npm, yarn, Maven, Gradle, Make
- **Test Runners**: Jest, pytest, JUnit, Mocha
- **Linters**: ESLint, Pylint, RuboCop
- **Formatters**: Prettier, Black, gofmt

#### **3. Deployment Tools**
- **Platforms**: Vercel, Netlify, AWS, Google Cloud, Azure
- **Containerization**: Docker build and push
- **Infrastructure**: Terraform, CloudFormation
- **Monitoring**: Health checks, log streaming

#### **4. API Integration Tools**
- **HTTP Client**: Generic REST API calls
- **Database**: SQL and NoSQL query execution
- **Third-party Services**: Stripe, Twilio, SendGrid, etc.
- **Internal APIs**: Custom business logic endpoints

#### **5. Code Analysis Tools**
- **Static Analysis**: CodeQL, Semgrep, SonarQube
- **Dependency Scanning**: npm audit, Snyk, Dependabot
- **Code Metrics**: Complexity, coverage, duplication

### Tool Definition Schema

```json
{
  "name": "git_commit",
  "description": "Create a git commit with a message",
  "parameters": {
    "message": {
      "type": "string",
      "required": true,
      "description": "Commit message"
    },
    "files": {
      "type": "array",
      "required": false,
      "description": "Files to include (default: all staged)"
    }
  },
  "permissions": ["repository:write"],
  "execution": {
    "type": "shell",
    "command": "git commit -m '{{message}}' {{files}}"
  },
  "guardrails": ["no_secrets_in_message", "valid_commit_format"]
}
```

### Tool Execution Flow

1. **Agent requests tool**: Provides tool name and parameters
2. **Validation**: Check parameter types and required fields
3. **Permission check**: Verify agent has permission for this tool
4. **Guardrail pre-check**: Run security scans before execution
5. **Execute**: Run tool in sandboxed environment
6. **Guardrail post-check**: Validate results
7. **Return result**: Send output back to agent

---

## Event-Driven Model

### Event Architecture

```
┌────────────────────────────────────────────┐
│         Event Bus (Pub/Sub)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │Publisher │  │ Message  │  │Subscriber│ │
│  │ (Agent)  │→ │  Queue   │→ │ (Agent)  │ │
│  └──────────┘  └──────────┘  └──────────┘ │
└────────────────────────────────────────────┘
```

### Event Types

#### **System Events**
- `agent.started`: Agent begins execution
- `agent.completed`: Agent finishes task
- `agent.failed`: Agent encounters error
- `workflow.paused`: Human approval needed
- `workflow.resumed`: Approval granted

#### **Tool Events**
- `tool.executed`: Tool execution completed
- `build.started`: Build process initiated
- `build.completed`: Build finished
- `deployment.started`: Deployment initiated
- `deployment.completed`: Deployment finished

#### **User Events**
- `user.requested`: New user request received
- `user.approved`: User approved action
- `user.rejected`: User rejected action

### Event Flow Example

```
User: "Deploy to production"
     │
     ▼
Event: user.requested
     │
     ▼
Task Planner: Creates deployment plan
     │
     ▼
Event: workflow.paused (requires approval)
     │
     ▼
UI: Shows deployment plan for approval
     │
     ▼
User: Approves
     │
     ▼
Event: user.approved
     │
     ▼
Deploy Agent: Executes deployment
     │
     ▼
Event: deployment.started
     │
     ▼
Event: deployment.completed
     │
     ▼
User: Receives notification
```

### Benefits of Event-Driven Architecture

1. **Decoupling**: Agents don't need to know about each other
2. **Scalability**: Easy to add new agents that react to events
3. **Auditability**: All events are logged for compliance
4. **Real-time Updates**: UI receives immediate updates
5. **Retry Logic**: Failed events can be replayed

---

## Guardrails

### Security & Safety Framework

```
┌────────────────────────────────────────────┐
│          Guardrail System                   │
├────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Pre-Execution Guardrails            │  │
│  │  • Input validation                  │  │
│  │  • Permission check                  │  │
│  │  • Rate limiting                     │  │
│  │  • Cost estimation                   │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Execution Guardrails                │  │
│  │  • Sandboxing                        │  │
│  │  • Resource limits                   │  │
│  │  • Timeout enforcement               │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Post-Execution Guardrails           │  │
│  │  • Security scanning                 │  │
│  │  • Secret detection                  │  │
│  │  • Policy compliance                 │  │
│  │  • Quality checks                    │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

### Guardrail Categories

#### **1. Security Guardrails**
- **Secret Detection**: Prevent hardcoded credentials (regex + ML-based)
- **Vulnerability Scanning**: CodeQL, Semgrep for security issues
- **Dependency Scanning**: Check for known vulnerabilities in dependencies
- **SQL Injection Prevention**: Validate database queries
- **XSS Prevention**: Sanitize user inputs

#### **2. Policy Guardrails**
- **Coding Standards**: Enforce style guides (ESLint, Prettier configs)
- **License Compliance**: Check dependency licenses
- **Data Privacy**: Ensure GDPR/CCPA compliance
- **Access Control**: Verify permissions before actions
- **Approval Workflows**: Require human approval for critical actions

#### **3. Quality Guardrails**
- **Code Coverage**: Minimum test coverage thresholds
- **Complexity Limits**: Cyclomatic complexity checks
- **Performance**: Response time and resource usage limits
- **Documentation**: Require comments for complex logic

#### **4. Cost & Resource Guardrails**
- **API Rate Limiting**: Prevent excessive LLM API calls
- **Resource Quotas**: CPU, memory, disk limits
- **Budget Controls**: Maximum spend per workflow
- **Concurrency Limits**: Max parallel agent executions

### Guardrail Implementation

**Example: Secret Detection**
```python
def check_secrets(code: str) -> List[SecretViolation]:
    violations = []
    
    # Regex patterns for common secrets
    patterns = {
        "aws_key": r"AKIA[0-9A-Z]{16}",
        "api_key": r"api[_-]?key['\"]?\s*[:=]\s*['\"][a-zA-Z0-9]{20,}['\"]",
        "private_key": r"-----BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY-----"
    }
    
    for secret_type, pattern in patterns.items():
        matches = re.findall(pattern, code)
        for match in matches:
            violations.append(
                SecretViolation(
                    type=secret_type,
                    location=find_line_number(code, match),
                    severity="critical"
                )
            )
    
    return violations
```

**Example: Cost Guardrail**
```python
def check_cost_limit(workflow: Workflow) -> bool:
    estimated_cost = calculate_workflow_cost(workflow)
    budget_limit = get_user_budget(workflow.user_id)
    
    if estimated_cost > budget_limit:
        raise CostLimitExceeded(
            f"Workflow cost ${estimated_cost} exceeds budget ${budget_limit}"
        )
    
    return True
```

### Guardrail Enforcement Levels

1. **Block**: Prevent execution entirely (e.g., secrets detected)
2. **Warn**: Log warning but allow execution (e.g., minor style violations)
3. **Approve**: Require human approval (e.g., production deployment)
4. **Audit**: Log for review but don't block (e.g., unusual patterns)

### Custom Guardrail Definition

Users can define custom guardrails:

```yaml
name: "No Console Logs in Production"
type: code_quality
severity: error
pattern: "console\\.log\\("
scope:
  - "src/**/*.ts"
  - "!src/**/*.test.ts"
action: block
message: "console.log statements are not allowed in production code"
```

---

## Architecture Decisions

### Key Design Principles

1. **Modularity**: Each component is independently replaceable
2. **Extensibility**: Easy to add new agents, tools, or guardrails
3. **Security-First**: Guardrails are not optional or bypassable
4. **Observability**: Full logging and tracing of all operations
5. **Fault Tolerance**: Graceful degradation when services fail

### Technology Choices

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Frontend** | React + TypeScript | Type safety, ecosystem, developer experience |
| **Backend** | Node.js / Python | LangChain/LangGraph support, AI library ecosystem |
| **Vector DB** | Pinecone / Weaviate | Managed service, good performance, easy scaling |
| **State Store** | Redis + PostgreSQL | Speed + durability |
| **Message Queue** | Redis Streams / Kafka | Event streaming, replay capabilities |
| **Orchestration** | LangGraph | Built for AI agent workflows |
| **LLM Provider** | OpenAI + Anthropic | Best-in-class models, reliable APIs |

### Future Enhancements

- **Distributed Execution**: Run agents across multiple nodes
- **Model Fine-Tuning**: Custom models for specific domains
- **Marketplace**: Community-contributed tools and guardrails
- **Offline Mode**: Local LLM support for air-gapped environments
- **Advanced Reasoning**: Chain-of-thought, tree-of-thought prompting

---

**Last Updated**: February 2026  
**Version**: 1.0.0
