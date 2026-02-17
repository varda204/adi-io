# ADI-IO (Kordra) - AI-Powered Development Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)

**ADI-IO** (powered by **KORDI**) is an AI-powered development operations and deployment platform that revolutionizes how development teams manage projects, collaborate, and deploy applications. Built with cutting-edge React and TypeScript technologies, it combines AI assistance with comprehensive DevOps tooling.

## 🌟 Key Features

### 🤖 **KORDI - AI Autonomous Teammate**
- **Voice Command Interface**: Activate with "Hey Kordi" for hands-free control
- **Intelligent Chat**: AI responds to development commands (deploy, code explanation, bug scanning)
- **Quick Actions**: Pre-configured commands for common tasks
- **Context-Aware Assistance**: Intelligent suggestions based on your current workspace

### 📊 **Project Management**
- Create and manage multiple development projects
- Advanced search and filtering (by status, starred, archived)
- Track commits, open PRs, health scores, and team members
- Real-time project health monitoring

### 🚀 **Deployment Automation**
- Multi-platform deployment support (Vercel, and more)
- Step-by-step deployment flow with confidence scoring
- YAML configuration panel with live editing
- Real-time deployment log streaming
- Complete deployment history tracking

### 💻 **Integrated Workspace**
- File tree explorer with intelligent suggestions
- Branch management and git operations
- AI-suggested code generation tasks
- Live draft cards for real-time updates
- Context-aware welcome experience

### 🏥 **System Health Monitoring**
- Real-time uptime tracking
- Active bug detection and tracking
- Deployment pipeline visualization
- Infrastructure monitoring dashboard
- Pull request status tracking

### 👥 **Team Collaboration**
- Real-time team member activity tracking
- Voice and video communication capabilities
- Activity feeds with commits and PR reviews
- Team member invite system
- KORDI displayed as an active AI team member

### 🔄 **Live Repository Synchronization**
- Real-time commit streaming
- Auto-updating file structure
- Magic Mode for AI-assisted sync
- Visual syncing status indicators

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.8** - Type-safe development
- **Vite 5.4** - Fast build tool and dev server
- **React Router v6.30** - Client-side routing

### UI Components
- **shadcn-ui** - Pre-built accessible React components
- **Radix UI** - Headless component primitives (40+ components)
- **Lucide React** - 460+ beautiful icons
- **Tailwind CSS 3.4** - Utility-first CSS framework

### State Management
- **TanStack Query v5.83** - Server state management
- **React Hook Form 7.61** - Form handling with validation
- **Zod 3.25** - TypeScript-first schema validation

### Additional Tools
- **Recharts 2.15** - Data visualization
- **Embla Carousel** - Image carousel
- **Sonner** - Toast notifications
- **React Resizable Panels** - Draggable layouts

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/varda204/adi-io.git
   cd adi-io
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Auth.tsx        # Authentication
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Projects.tsx    # Project management
│   ├── Workspace.tsx   # Development workspace
│   ├── Deployments.tsx # Deployment management
│   ├── SystemHealth.tsx # System monitoring
│   ├── Team.tsx        # Team collaboration
│   └── Settings.tsx    # User settings
├── components/         # Reusable components
│   ├── GlobalKordiAssistant.tsx  # AI assistant
│   ├── DeploymentFlow.tsx        # Deployment workflow
│   ├── LiveRepoSync.tsx          # Repository sync
│   ├── VoiceCommandInterface.tsx # Voice control
│   └── ui/             # shadcn-ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application router
```

## 🎨 Design Philosophy

- **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, smooth animations
- **Accessibility**: ARIA-compliant components, keyboard navigation, semantic HTML
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Dark Mode**: Full theme support with smooth transitions
- **Performance**: Code splitting, lazy loading, optimized bundles

## 🔧 Configuration

### Build Configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.ts` - Tailwind CSS customization
- `eslint.config.js` - Code linting rules

### Component Configuration
- `components.json` - shadcn-ui component settings

## 📚 Documentation

- [Technical Specifications](./TECHNICAL_SPECS.md) - Detailed architecture and implementation
- [Roadmap](./ROADMAP.md) - Future plans and milestones
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute to the project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on:
- Code of Conduct
- Development workflow
- Submitting pull requests
- Coding standards

## 🔐 Security

If you discover a security vulnerability, please email security@adi-io.dev. All security vulnerabilities will be promptly addressed.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌐 Links

- **Lovable Project**: [https://lovable.dev/projects/af50258b-3fe5-4af5-a447-478c9247b632](https://lovable.dev/projects/af50258b-3fe5-4af5-a447-478c9247b632)
- **Documentation**: [Coming Soon]
- **Live Demo**: [Coming Soon]

## 💬 Support

- GitHub Issues: [Report a bug or request a feature](https://github.com/varda204/adi-io/issues)
- Discussions: [Join the community](https://github.com/varda204/adi-io/discussions)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by the ADI-IO team**
