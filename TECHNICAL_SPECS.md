# Technical Specifications - ADI-IO (Kordra)

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Frontend Architecture](#frontend-architecture)
3. [Component Structure](#component-structure)
4. [State Management](#state-management)
5. [Data Flow](#data-flow)
6. [API Integration](#api-integration)
7. [Authentication & Security](#authentication--security)
8. [Performance Optimization](#performance-optimization)
9. [Build & Deployment](#build--deployment)
10. [Testing Strategy](#testing-strategy)
11. [Browser Compatibility](#browser-compatibility)
12. [Accessibility Standards](#accessibility-standards)

---

## System Architecture

### Overview
ADI-IO is a Single Page Application (SPA) built on a modern React-based architecture with TypeScript for type safety. The application follows a component-based architecture with clear separation of concerns.

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │   Pages      │  │  Components  │              │  │
│  │  │  - Dashboard │  │  - KORDI AI  │              │  │
│  │  │  - Projects  │  │  - Deployment│              │  │
│  │  │  - Workspace │  │  - LiveSync  │              │  │
│  │  └──────────────┘  └──────────────┘              │  │
│  │  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Hooks       │  │  Utilities   │              │  │
│  │  │  - Custom    │  │  - lib/utils │              │  │
│  │  └──────────────┘  └──────────────┘              │  │
│  └───────────────────────────────────────────────────┘  │
│                          │                               │
│                          ▼                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │            React Query (State Cache)              │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend Services                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   API    │  │  GitHub  │  │ Deploy   │              │
│  │  Server  │  │   API    │  │ Services │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack Details

#### Core Framework
- **React 18.3.1**
  - Concurrent rendering for better performance
  - Automatic batching of state updates
  - Hooks-based component architecture
  - Suspense for code splitting

- **TypeScript 5.8**
  - Strict type checking enabled
  - Enhanced IDE support with IntelliSense
  - Improved code maintainability
  - Compile-time error detection

- **Vite 5.4**
  - Lightning-fast Hot Module Replacement (HMR)
  - Optimized production builds with Rollup
  - Native ES modules in development
  - Built-in CSS code splitting

#### Routing
- **React Router v6.30**
  - Client-side routing with history API
  - Nested routes support
  - Route-based code splitting
  - Protected routes for authentication

---

## Frontend Architecture

### Component Hierarchy

```
App.tsx (Root)
├── Router
│   ├── Public Routes
│   │   ├── / (Landing Page - Index.tsx)
│   │   └── /auth (Authentication - Auth.tsx)
│   └── Protected Routes
│       ├── /dashboard (Dashboard.tsx)
│       ├── /projects (Projects.tsx)
│       ├── /workspace (Workspace.tsx)
│       ├── /deployments (Deployments.tsx)
│       ├── /system-health (SystemHealth.tsx)
│       ├── /team (Team.tsx)
│       └── /settings (Settings.tsx)
└── Global Components
    ├── GlobalKordiAssistant (AI Chat Interface)
    ├── Toaster (Notification System)
    └── TooltipProvider (Tooltip Context)
```

### Page Components

#### 1. **Landing Page (Index.tsx)**
- **Purpose**: First-touch user experience
- **Features**:
  - Hero section with value proposition
  - Feature highlights
  - Call-to-action buttons
  - Responsive design with animations
- **Key Components**: Button, Card, Badge

#### 2. **Authentication (Auth.tsx)**
- **Purpose**: User authentication flow
- **Features**:
  - Login/Register forms
  - Form validation with Zod
  - Error handling
  - Redirect after authentication
- **Key Components**: Form, Input, Button, Card

#### 3. **Dashboard (Dashboard.tsx)**
- **Purpose**: Central hub for all activities
- **Features**:
  - Overview metrics
  - Recent activity feed
  - Quick actions
  - System status indicators
- **Key Components**: Card, Chart (Recharts), Badge, Progress

#### 4. **Projects (Projects.tsx)**
- **Purpose**: Project management interface
- **Features**:
  - Project listing with search/filter
  - Project creation dialog
  - Project cards with metadata
  - Status tracking (commits, PRs, health)
  - Starred and archived projects
- **Key Components**: Card, Dialog, Input, Badge, Button

#### 5. **Workspace (Workspace.tsx)**
- **Purpose**: Integrated development environment
- **Features**:
  - File tree explorer
  - AI-suggested tasks
  - Branch management
  - Live draft cards
  - Context-aware welcome
- **Key Components**: TreeView, Card, Select, Button, Badge

#### 6. **Deployments (Deployments.tsx)**
- **Purpose**: Deployment management and automation
- **Features**:
  - Deployment flow wizard
  - YAML configuration editor
  - Deployment history
  - Live log streaming
  - Multi-platform support
- **Key Components**: 
  - DeploymentFlow (custom)
  - Tabs, ScrollArea, Textarea
  - Badge, Button, Card

#### 7. **System Health (SystemHealth.tsx)**
- **Purpose**: System monitoring dashboard
- **Features**:
  - Uptime tracking (99.8%)
  - Bug detection dashboard
  - Deployment pipeline visualization
  - Infrastructure monitoring
  - PR status tracking
- **Key Components**: Card, Badge, Progress, Chart

#### 8. **Team (Team.tsx)**
- **Purpose**: Team collaboration hub
- **Features**:
  - Team member listing
  - Real-time activity feed
  - Voice/video communication
  - AI teammate (KORDI) display
  - Invite system
- **Key Components**: Avatar, Card, Badge, Button, Dialog

#### 9. **Settings (Settings.tsx)**
- **Purpose**: User preferences and configuration
- **Features**:
  - Account settings
  - Deployment preferences
  - IDE selector
  - AI behavior customization
- **Key Components**: Form, Input, Select, Switch, Button

### Core Feature Components

#### **GlobalKordiAssistant**
```typescript
Features:
- Voice activation ("Hey Kordi")
- Chat interface with message history
- Quick action buttons
- Context-aware responses
- Minimize/maximize functionality
- Voice indicator animation

Technology:
- Web Speech API for voice recognition
- State management with useState
- Audio feedback with HTML5 Audio
- Animated UI with CSS animations
```

#### **DeploymentFlow**
```typescript
Features:
- Multi-step deployment wizard
- Progress tracking with confidence scores
- Platform selection (Vercel, etc.)
- Configuration validation
- Deployment preview

Components:
- Stepper/Progress indicator
- Form inputs for configuration
- Preview cards
- Action buttons
```

#### **LiveRepoSync**
```typescript
Features:
- Real-time commit streaming
- Auto-updating file tree
- Branch selection
- Magic Mode toggle
- Sync status indicators

Technology:
- WebSocket/polling for real-time updates
- State synchronization
- Optimistic UI updates
```

#### **VoiceCommandInterface**
```typescript
Features:
- Wake word detection ("Hey Kordi")
- Voice command processing
- Visual feedback (waveform animation)
- Audio output for responses

Technology:
- Web Speech Recognition API
- AudioContext for waveform visualization
- Speech Synthesis API for responses
```

---

## Component Structure

### shadcn-ui Components Used

#### Layout Components
- **Card** - Container with header, content, footer sections
- **Separator** - Horizontal/vertical dividers
- **Scroll Area** - Custom scrollbar with smooth scrolling
- **Resizable Panels** - Draggable split layouts
- **Tabs** - Tabbed interface with keyboard navigation

#### Form Components
- **Input** - Text input with validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection with search
- **Checkbox** - Checkbox with indeterminate state
- **Radio Group** - Radio button groups
- **Switch** - Toggle switch
- **Slider** - Range slider
- **Label** - Accessible form labels

#### Overlay Components
- **Dialog** - Modal dialogs with focus trap
- **Alert Dialog** - Confirmation dialogs
- **Popover** - Floating content containers
- **Tooltip** - Contextual help tooltips
- **Dropdown Menu** - Context menus
- **Command** - Command palette (Cmd+K)
- **Sheet** - Slide-out panels
- **Drawer** (Vaul) - Bottom drawer component

#### Feedback Components
- **Toast** (Sonner) - Toast notifications
- **Progress** - Progress bars and indicators
- **Badge** - Status badges and labels
- **Avatar** - User profile images with fallback
- **Skeleton** - Loading placeholder animations

#### Navigation Components
- **Navigation Menu** - Accessible navigation
- **Menubar** - Application menu bar
- **Breadcrumb** - Breadcrumb navigation

#### Data Display Components
- **Table** - Sortable, filterable tables
- **Accordion** - Collapsible content sections
- **Collapsible** - Toggle content visibility
- **Carousel** (Embla) - Image/content carousel
- **Aspect Ratio** - Maintain aspect ratios
- **Calendar** (React Day Picker) - Date selection

#### Interactive Components
- **Button** - Multiple variants (default, outline, ghost, etc.)
- **Toggle** - Toggle buttons
- **Toggle Group** - Grouped toggle buttons
- **Context Menu** - Right-click menus
- **Hover Card** - Hover-triggered content

---

## State Management

### State Architecture

```typescript
// Global State (React Query)
QueryClient → Server State Cache
  ├── Projects Data
  ├── Deployments Data
  ├── Team Data
  └── System Health Data

// Local Component State (useState)
  ├── UI State (modals, dropdowns, etc.)
  ├── Form State (React Hook Form)
  └── Temporary Data (search filters, etc.)

// Context State
  ├── Theme Context (Dark/Light mode)
  ├── Auth Context (User authentication)
  └── Tooltip Context (Global tooltips)
```

### React Query Configuration

```typescript
// Server State Management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// Query Keys Structure
{
  'projects': ['projects'],
  'project-detail': ['projects', projectId],
  'deployments': ['deployments', projectId],
  'team': ['team'],
  'system-health': ['system-health'],
}
```

### Form State Management

```typescript
// React Hook Form with Zod Validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: '',
    email: '',
  },
});
```

---

## Data Flow

### Typical Data Flow Pattern

```
User Interaction
      ↓
Event Handler (onClick, onSubmit)
      ↓
State Update (setState, form.submit)
      ↓
React Query Mutation/Query
      ↓
API Request to Backend
      ↓
Response Processing
      ↓
Cache Update (React Query)
      ↓
Component Re-render
      ↓
UI Update with New Data
```

### Example: Project Creation Flow

```typescript
1. User clicks "Create Project" button
2. Dialog opens (UI state update)
3. User fills form and submits
4. Form validation (Zod schema)
5. React Query mutation triggers
6. POST request to API
7. Success response received
8. Query cache invalidated
9. Projects list refetches
10. New project appears in list
11. Success toast notification
12. Dialog closes
```

---

## API Integration

### API Client Setup

```typescript
// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Fetch wrapper with error handling
async function apiClient(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

### API Endpoints Structure

```typescript
// Projects API
GET    /api/projects              # List all projects
POST   /api/projects              # Create project
GET    /api/projects/:id          # Get project details
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project

// Deployments API
GET    /api/deployments           # List deployments
POST   /api/deployments           # Create deployment
GET    /api/deployments/:id       # Get deployment status
GET    /api/deployments/:id/logs  # Stream deployment logs

// Team API
GET    /api/team/members          # List team members
POST   /api/team/invite           # Invite member
GET    /api/team/activity         # Get activity feed

// System API
GET    /api/system/health         # System health status
GET    /api/system/metrics        # System metrics
```

### React Query Hooks

```typescript
// Custom hooks for API calls
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient('/projects'),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProjectData) => 
      apiClient('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
```

---

## Authentication & Security

### Authentication Flow

```typescript
1. User submits login credentials
2. POST /api/auth/login
3. Server validates credentials
4. JWT token returned
5. Token stored in localStorage/sessionStorage
6. Token attached to API requests
7. Protected routes check auth status
8. Redirect to /auth if not authenticated
```

### Security Measures

#### 1. **Input Validation**
- Zod schemas for all form inputs
- Client-side validation before API calls
- Server-side validation (expected)

#### 2. **XSS Protection**
- React's built-in XSS protection
- DOMPurify for user-generated content (if needed)
- Content Security Policy headers

#### 3. **CSRF Protection**
- CSRF tokens for state-changing operations
- SameSite cookie attribute

#### 4. **Authentication**
- JWT-based authentication
- Secure token storage
- Token expiration handling
- Refresh token mechanism

#### 5. **Authorization**
- Role-based access control (RBAC)
- Protected routes with guards
- API endpoint authorization

#### 6. **HTTPS**
- TLS/SSL encryption for all traffic
- Secure cookie flags (HttpOnly, Secure)

---

## Performance Optimization

### Code Splitting

```typescript
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Workspace = lazy(() => import('./pages/Workspace'));

// Component in router
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/workspace" element={<Workspace />} />
  </Routes>
</Suspense>
```

### Optimization Techniques

#### 1. **React Query Caching**
- Automatic background refetching
- Stale-while-revalidate pattern
- Optimistic updates for mutations
- Cache deduplication

#### 2. **Memoization**
```typescript
// useMemo for expensive calculations
const filteredProjects = useMemo(() => 
  projects.filter(p => p.status === 'active'),
  [projects]
);

// useCallback for event handlers
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);

// React.memo for component memoization
export const ProjectCard = React.memo(({ project }) => {
  // component logic
});
```

#### 3. **Virtual Scrolling**
- For long lists (1000+ items)
- Only render visible items
- Reduces DOM nodes

#### 4. **Image Optimization**
- Lazy loading images
- WebP format with fallbacks
- Responsive images (srcset)
- Image compression

#### 5. **Bundle Optimization**
- Tree shaking unused code
- Minification and compression
- Asset optimization
- Dynamic imports

### Performance Metrics

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log); // Cumulative Layout Shift
getFID(console.log); // First Input Delay
getFCP(console.log); // First Contentful Paint
getLCP(console.log); // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
```

---

## Build & Deployment

### Build Process

```bash
# Development build
npm run dev
# - Starts Vite dev server
# - Hot Module Replacement enabled
# - Source maps included
# - No minification

# Production build
npm run build
# - TypeScript compilation
# - Tree shaking
# - Minification
# - Asset optimization
# - Source map generation
# - Output to dist/
```

### Build Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-*'],
        },
      },
    },
  },
});
```

### Deployment Targets

#### 1. **Vercel (Recommended)**
```bash
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### 2. **Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

### Environment Variables

```bash
# .env.example
VITE_API_URL=https://api.adi-io.dev
VITE_WS_URL=wss://ws.adi-io.dev
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_ENABLE_ANALYTICS=true
```

---

## Testing Strategy

### Testing Pyramid

```
        /\
       /  \       E2E Tests (Cypress/Playwright)
      /────\
     /      \     Integration Tests (React Testing Library)
    /────────\
   /          \   Unit Tests (Vitest)
  /────────────\
```

### Unit Testing

```typescript
// Example: useProjects hook test
import { renderHook } from '@testing-library/react';
import { useProjects } from './useProjects';

test('fetches projects successfully', async () => {
  const { result, waitFor } = renderHook(() => useProjects());
  
  await waitFor(() => result.current.isSuccess);
  
  expect(result.current.data).toHaveLength(5);
});
```

### Component Testing

```typescript
// Example: ProjectCard component test
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

test('renders project card with correct data', () => {
  const project = {
    id: '1',
    name: 'Test Project',
    status: 'active',
  };
  
  render(<ProjectCard project={project} />);
  
  expect(screen.getByText('Test Project')).toBeInTheDocument();
  expect(screen.getByText('active')).toBeInTheDocument();
});
```

### Integration Testing

```typescript
// Example: Deployment flow integration test
import { render, screen, userEvent } from '@testing-library/react';
import { DeploymentFlow } from './DeploymentFlow';

test('completes deployment flow', async () => {
  render(<DeploymentFlow />);
  
  // Step 1: Select platform
  await userEvent.click(screen.getByText('Vercel'));
  await userEvent.click(screen.getByText('Next'));
  
  // Step 2: Configure
  await userEvent.type(screen.getByLabelText('Project Name'), 'test-app');
  await userEvent.click(screen.getByText('Next'));
  
  // Step 3: Deploy
  await userEvent.click(screen.getByText('Deploy'));
  
  expect(screen.getByText('Deployment started')).toBeInTheDocument();
});
```

---

## Browser Compatibility

### Supported Browsers

- **Chrome/Edge**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: Android 10+

### Polyfills & Fallbacks

```typescript
// Web Speech API fallback
if (!('webkitSpeechRecognition' in window)) {
  console.warn('Speech recognition not supported');
  // Fallback to text input only
}

// Clipboard API fallback
async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
```

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

#### 1. **Keyboard Navigation**
- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip navigation links

#### 2. **Screen Reader Support**
- Semantic HTML elements
- ARIA labels and roles
- Live region announcements
- Alt text for images

#### 3. **Color & Contrast**
- Minimum contrast ratio 4.5:1 for text
- Color not sole means of conveying information
- High contrast mode support

#### 4. **Responsive & Scalable**
- Text resizable up to 200%
- Responsive design for all screen sizes
- Touch targets minimum 44x44px

#### 5. **Form Accessibility**
```typescript
<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
```

### Accessibility Testing Tools

- **axe DevTools**: Automated accessibility testing
- **NVDA/JAWS**: Screen reader testing
- **Lighthouse**: Accessibility audit
- **WAVE**: Visual feedback tool

---

## Conclusion

This technical specification document provides a comprehensive overview of the ADI-IO platform's architecture, technologies, and implementation details. For specific implementation guidance, refer to the code examples and patterns described in each section.

**Last Updated**: February 2026  
**Version**: 1.0.0
