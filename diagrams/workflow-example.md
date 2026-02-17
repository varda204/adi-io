# Example Workflow: Complete Feature Implementation

## Scenario: User requests "Add password reset functionality"

```
┌─────────────────────────────────────────────────────────────────────┐
│ T=0s: User Input                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  User: "Add password reset functionality with email verification"   │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=1s: Task Planner Agent - Analysis                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────┐              │
│  │ LLM Analysis (GPT-4)                             │              │
│  │                                                   │              │
│  │ Input: User request + Project context            │              │
│  │                                                   │              │
│  │ Retrieves from memory:                           │              │
│  │ • Existing auth system architecture              │              │
│  │ • Email service configuration (SendGrid)         │              │
│  │ • Database schema (PostgreSQL + Prisma)          │              │
│  │ • Test framework (Jest)                          │              │
│  │ • Deployment platform (Vercel)                   │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                      │
│  Decomposes task into subtasks:                                     │
│                                                                      │
│  ✓ 1. Database: Add password_reset_token column                     │
│  ✓ 2. Backend: Create password reset request endpoint               │
│  ✓ 3. Backend: Create password reset verify endpoint                │
│  ✓ 4. Email: Create reset email template                            │
│  ✓ 5. Frontend: Add forgot password form                            │
│  ✓ 6. Frontend: Add reset password form                             │
│  ✓ 7. Tests: Unit tests for all endpoints                           │
│  ✓ 8. Tests: Integration tests for flow                             │
│  ✓ 9. Security: Scan for vulnerabilities                            │
│  ✓ 10. Deploy: Push to staging                                      │
│                                                                      │
│  Estimated time: 15 minutes                                         │
│  Estimated cost: $0.25 (LLM API calls)                              │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=3s: Present Plan to User                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Kordra: "I'll implement password reset in 10 steps:                │
│           1. Update database schema...                              │
│           2. Create API endpoints...                                │
│           [shows full plan]                                         │
│                                                                      │
│           This will modify:                                         │
│           • 3 new files                                             │
│           • 5 existing files                                        │
│                                                                      │
│           Proceed? [Yes] [Modify Plan] [Cancel]"                    │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=5s: User Approves                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  User: [Clicks "Yes"]                                               │
│                                                                      │
│  Event emitted: workflow.started                                    │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=6s: Code Agent - Database Migration                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Task: Add password_reset_token column                              │
│                                                                      │
│  ┌────────────────────────────────────────────┐                    │
│  │ 1. Retrieve context                        │                    │
│  │    • Load schema.prisma                    │                    │
│  │    • Load existing migrations              │                    │
│  └────────────────────────────────────────────┘                    │
│                                                                      │
│  ┌────────────────────────────────────────────┐                    │
│  │ 2. Generate migration (GPT-4)              │                    │
│  │                                             │                    │
│  │    model User {                            │                    │
│  │      // ... existing fields                │                    │
│  │      password_reset_token   String?        │                    │
│  │      password_reset_expires DateTime?      │                    │
│  │    }                                        │                    │
│  └────────────────────────────────────────────┘                    │
│                                                                      │
│  ┌────────────────────────────────────────────┐                    │
│  │ 3. Execute tool: file_write                │                    │
│  │    • Updates prisma/schema.prisma          │                    │
│  │    • Creates migration file                │                    │
│  └────────────────────────────────────────────┘                    │
│                                                                      │
│  ✅ Step 1/10 complete                                              │
│                                                                      │
│  Event: task.completed (step=1)                                     │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=8s: Code Agent - Backend API (Parallel Steps 2-4)                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Step 2: POST /auth/forgot-password                          │  │
│  │                                                              │  │
│  │ File: routes/auth/forgot-password.ts                        │  │
│  │                                                              │  │
│  │ import { Router } from 'express';                           │  │
│  │ import crypto from 'crypto';                                │  │
│  │ import { prisma } from '@/lib/prisma';                      │  │
│  │ import { sendEmail } from '@/lib/email';                    │  │
│  │                                                              │  │
│  │ export const forgotPasswordRoute = Router();                │  │
│  │                                                              │  │
│  │ forgotPasswordRoute.post('/', async (req, res) => {         │  │
│  │   const { email } = req.body;                               │  │
│  │                                                              │  │
│  │   const user = await prisma.user.findUnique({               │  │
│  │     where: { email }                                        │  │
│  │   });                                                        │  │
│  │                                                              │  │
│  │   if (!user) {                                              │  │
│  │     // Don't reveal if email exists (security)             │  │
│  │     return res.json({ message: 'Check email' });           │  │
│  │   }                                                          │  │
│  │                                                              │  │
│  │   const token = crypto.randomBytes(32).toString('hex');    │  │
│  │   const expires = new Date(Date.now() + 3600000); // 1h    │  │
│  │                                                              │  │
│  │   await prisma.user.update({                                │  │
│  │     where: { id: user.id },                                 │  │
│  │     data: {                                                  │  │
│  │       password_reset_token: token,                          │  │
│  │       password_reset_expires: expires                       │  │
│  │     }                                                        │  │
│  │   });                                                        │  │
│  │                                                              │  │
│  │   await sendEmail({                                         │  │
│  │     to: email,                                              │  │
│  │     subject: 'Password Reset',                             │  │
│  │     template: 'password-reset',                            │  │
│  │     data: { token }                                         │  │
│  │   });                                                        │  │
│  │                                                              │  │
│  │   res.json({ message: 'Check email' });                    │  │
│  │ });                                                          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ✅ Step 2/10 complete                                              │
│                                                                      │
│  [Steps 3-4 implemented similarly...]                               │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=12s: Code Agent - Frontend Components                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Steps 5-6: React components for forgot/reset password forms        │
│                                                                      │
│  Files created:                                                      │
│  • components/ForgotPasswordForm.tsx                                │
│  • components/ResetPasswordForm.tsx                                 │
│  • pages/forgot-password.tsx                                        │
│  • pages/reset-password.tsx                                         │
│                                                                      │
│  ✅ Steps 5-6/10 complete                                           │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=15s: Guardrail - Pre-Test Security Scan                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Running security checks before testing...                          │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Secret Detection (TruffleHog)           │                       │
│  │ ✅ No secrets detected                  │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Code Patterns (Semgrep)                 │                       │
│  │ ⚠️  Warning: Password reset token       │                       │
│  │    should expire after 1 hour (found)   │                       │
│  │ ✅ Passes (warning only)                │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ✅ Security scan passed                                            │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=16s: QA Agent - Test Generation                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 7: Generate unit tests                                        │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ File: routes/auth/forgot-password.test.ts                   │  │
│  │                                                              │  │
│  │ describe('POST /auth/forgot-password', () => {              │  │
│  │   it('sends reset email for valid email', async () => {    │  │
│  │     const response = await request(app)                     │  │
│  │       .post('/auth/forgot-password')                        │  │
│  │       .send({ email: 'user@example.com' });                │  │
│  │                                                              │  │
│  │     expect(response.status).toBe(200);                      │  │
│  │     expect(mockSendEmail).toHaveBeenCalled();               │  │
│  │   });                                                        │  │
│  │                                                              │  │
│  │   it('does not reveal invalid email', async () => {        │  │
│  │     const response = await request(app)                     │  │
│  │       .post('/auth/forgot-password')                        │  │
│  │       .send({ email: 'nonexistent@example.com' });         │  │
│  │                                                              │  │
│  │     expect(response.status).toBe(200);                      │  │
│  │     expect(mockSendEmail).not.toHaveBeenCalled();           │  │
│  │   });                                                        │  │
│  │                                                              │  │
│  │   it('generates unique tokens', async () => {              │  │
│  │     // ... test implementation                             │  │
│  │   });                                                        │  │
│  │ });                                                          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Files created:                                                      │
│  • 4 unit test files                                                │
│  • 1 integration test file                                          │
│  • Total: 25 test cases                                             │
│                                                                      │
│  ✅ Step 7/10 complete                                              │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=18s: QA Agent - Test Execution                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 8: Run test suite                                             │
│                                                                      │
│  $ npm test -- auth/forgot-password                                 │
│                                                                      │
│  Running tests...                                                    │
│                                                                      │
│  ✅ POST /auth/forgot-password                                      │
│     ✅ sends reset email for valid email                            │
│     ✅ does not reveal invalid email                                │
│     ✅ generates unique tokens                                      │
│     ✅ tokens expire after 1 hour                                   │
│     ✅ validates email format                                       │
│                                                                      │
│  ✅ POST /auth/reset-password                                       │
│     ✅ resets password with valid token                             │
│     ✅ rejects expired token                                        │
│     ✅ rejects invalid token                                        │
│     ✅ invalidates token after use                                  │
│                                                                      │
│  Integration Tests:                                                  │
│  ✅ Complete password reset flow                                    │
│                                                                      │
│  Results:                                                            │
│  ✅ 25 tests passed                                                 │
│  ❌ 0 tests failed                                                  │
│  📊 Coverage: 98% lines, 95% branches                               │
│                                                                      │
│  ✅ Step 8/10 complete                                              │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=22s: Security Agent - Full Vulnerability Scan                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 9: Security scanning                                          │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ CodeQL Analysis                         │                       │
│  │ Scanning for:                           │                       │
│  │ • SQL injection                         │                       │
│  │ • XSS vulnerabilities                   │                       │
│  │ • Timing attacks                        │                       │
│  │ • Information disclosure                │                       │
│  │                                          │                       │
│  │ ✅ No high/critical issues found        │                       │
│  │ ℹ️  1 info: Consider rate limiting      │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Dependency Scan (npm audit)             │                       │
│  │ ✅ 0 vulnerabilities                    │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ✅ Step 9/10 complete                                              │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=25s: Deploy Agent - Create PR and Deploy to Staging              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 10: Deployment                                                │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Git Operations                          │                       │
│  │ $ git checkout -b feat/password-reset   │                       │
│  │ $ git add .                             │                       │
│  │ $ git commit -m "Add password reset"    │                       │
│  │ $ git push origin feat/password-reset   │                       │
│  │ ✅ Branch pushed                        │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Create Pull Request                     │                       │
│  │                                          │                       │
│  │ Title: Add password reset functionality │                       │
│  │                                          │                       │
│  │ Description:                             │                       │
│  │ - Database: Added reset token fields    │                       │
│  │ - API: Forgot & reset password endpoints│                       │
│  │ - UI: Forgot & reset password forms     │                       │
│  │ - Tests: 25 tests, 98% coverage         │                       │
│  │ - Security: Passed CodeQL scan          │                       │
│  │                                          │                       │
│  │ ✅ PR #123 created                      │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ┌─────────────────────────────────────────┐                       │
│  │ Vercel Deployment (Staging)             │                       │
│  │                                          │                       │
│  │ Building...     ████████████ 100%       │                       │
│  │ Deploying...    ████████████ 100%       │                       │
│  │                                          │                       │
│  │ ✅ Deployed to:                         │                       │
│  │ https://kordra-pr-123.vercel.app        │                       │
│  │                                          │                       │
│  │ Preview ready for testing               │                       │
│  └─────────────────────────────────────────┘                       │
│                                                                      │
│  ✅ Step 10/10 complete                                             │
│                                                                      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ T=30s: Workflow Complete - Report to User                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ✅ Password reset functionality complete!                          │
│                                                                      │
│  Summary:                                                            │
│  • 8 files created                                                  │
│  • 5 files modified                                                 │
│  • 25 tests created (all passing)                                   │
│  • 98% code coverage                                                │
│  • 0 security issues                                                │
│  • PR #123 created                                                  │
│  • Deployed to staging                                              │
│                                                                      │
│  Total time: 30 seconds                                             │
│  Total cost: $0.28                                                  │
│                                                                      │
│  Next steps:                                                         │
│  • Review PR: https://github.com/.../pull/123                       │
│  • Test staging: https://kordra-pr-123.vercel.app                   │
│  • Merge when ready                                                 │
│                                                                      │
│  [Review PR] [Test in Browser] [Deploy to Production]              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Timeline Summary

```
0s  ────► User request received
1s  ────► Task planning started
3s  ────► Plan presented to user
5s  ────► User approval received
6s  ────► Database migration (Step 1)
8s  ────► Backend API implementation (Steps 2-4)
12s ────► Frontend implementation (Steps 5-6)
15s ────► Pre-test security scan
16s ────► Test generation (Step 7)
18s ────► Test execution (Step 8)
22s ────► Security scan (Step 9)
25s ────► Deployment (Step 10)
30s ────► Workflow complete ✅

Total: 30 seconds from request to deployment
```

## Events Emitted

```
T=0s    workflow.started
T=6s    task.completed (step=1)
T=8s    task.completed (step=2)
T=9s    task.completed (step=3)
T=10s   task.completed (step=4)
T=12s   task.completed (step=5)
T=13s   task.completed (step=6)
T=15s   guardrail.passed (security_scan)
T=16s   task.completed (step=7)
T=18s   task.completed (step=8)
T=20s   test.passed (25/25 tests)
T=22s   task.completed (step=9)
T=22s   guardrail.passed (vulnerability_scan)
T=25s   deployment.started
T=28s   deployment.completed
T=30s   workflow.completed
```

---

**Last Updated**: February 2026
