# Getting Started with ADI-IO

Welcome to ADI-IO! This guide will help you get up and running with the platform in just a few minutes.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [First Steps](#first-steps)
4. [Key Features Tour](#key-features-tour)
5. [Common Tasks](#common-tasks)
6. [Tips & Best Practices](#tips--best-practices)
7. [Next Steps](#next-steps)

---

## Quick Start

Get ADI-IO running in 3 commands:

```bash
# 1. Clone the repository
git clone https://github.com/varda204/adi-io.git
cd adi-io

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit `http://localhost:8080` and you're ready to go! 🚀

---

## Detailed Setup

### Prerequisites

Make sure you have these installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun**
- **Git** - [Download here](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation Steps

#### 1. Clone the Repository

```bash
# Via HTTPS
git clone https://github.com/varda204/adi-io.git

# Or via SSH (if you have SSH keys set up)
git clone git@github.com:varda204/adi-io.git

# Navigate to the project directory
cd adi-io
```

#### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using bun (faster alternative)
bun install
```

This will install all required packages listed in `package.json`.

#### 3. Configure Environment (Optional)

For basic local development, you can skip this step. For advanced features:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
nano .env  # or use your preferred editor
```

#### 4. Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.4.19  ready in 423 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 5. Open in Browser

Navigate to `http://localhost:8080` in your web browser.

---

## First Steps

### 1. Explore the Landing Page

The landing page showcases ADI-IO's key features:
- AI-powered development assistance
- Project management capabilities
- Deployment automation
- Team collaboration tools

### 2. Navigate to Authentication

Click on **Get Started** or **Sign In** to access the authentication page.

> **Note**: In the current version, authentication is UI-only. Backend integration is planned for Q2 2026.

### 3. Explore the Dashboard

After "logging in," you'll see the main dashboard with:
- Overview of your projects
- Recent activity
- Quick actions
- System status

### 4. Meet KORDI - Your AI Assistant

Look for the **KORDI** assistant icon (usually in the bottom right):
- Click to open the chat interface
- Try the quick action buttons
- Use voice commands by saying "Hey Kordi" (if enabled)

---

## Key Features Tour

### 📊 Dashboard

**Location**: `/dashboard`

The central hub for all your activities:
- **Metrics Cards**: Quick stats on your projects
- **Recent Activity**: Latest commits, deployments, and actions
- **Quick Actions**: Common tasks at your fingertips
- **System Health**: Real-time status indicators

**Try This**:
```
1. Click on different metric cards
2. Check the recent activity feed
3. Use the quick action buttons
```

### 📁 Projects

**Location**: `/projects`

Manage all your development projects:
- **Create Project**: Click "New Project" button
- **Search & Filter**: Find projects by name or status
- **Project Cards**: View commits, PRs, and health scores
- **Actions**: Star, archive, or manage projects

**Try This**:
```
1. Create a new project
2. Use the search bar to filter projects
3. Click on a project to view details
```

### 💻 Workspace

**Location**: `/workspace`

Your integrated development environment:
- **File Tree**: Browse project files
- **AI Suggestions**: Get intelligent task suggestions
- **Branch Management**: Create and switch branches
- **Live Drafts**: See real-time code updates

**Try This**:
```
1. Explore the file tree
2. Click on AI suggestions
3. Try creating a new branch
```

### 🚀 Deployments

**Location**: `/deployments`

Deploy your applications with ease:
- **Deployment Flow**: Step-by-step wizard
- **YAML Config**: Edit deployment configurations
- **History**: View past deployments
- **Live Logs**: Watch deployment progress in real-time

**Try This**:
```
1. Start a new deployment
2. Follow the deployment flow
3. Check the deployment history
```

### 🏥 System Health

**Location**: `/system-health`

Monitor your infrastructure:
- **Uptime Tracking**: 99.8% uptime display
- **Bug Detection**: Active issue tracking
- **Pipeline Visualization**: Deployment pipeline status
- **Metrics**: System performance indicators

**Try This**:
```
1. Review system uptime
2. Check active bugs
3. Explore pipeline visualization
```

### 👥 Team

**Location**: `/team`

Collaborate with your team:
- **Team Members**: See who's working on what
- **Activity Feed**: Real-time updates on team actions
- **KORDI AI Member**: Your AI teammate is always active
- **Invite System**: Add new team members

**Try This**:
```
1. View team member profiles
2. Check the activity feed
3. Try the invite feature
```

### ⚙️ Settings

**Location**: `/settings`

Customize your experience:
- **Account Settings**: Update your profile
- **Deployment Preferences**: Configure deployment options
- **IDE Selector**: Choose your preferred IDE
- **AI Behavior**: Customize KORDI's responses

**Try This**:
```
1. Update your profile information
2. Adjust deployment preferences
3. Configure AI settings
```

---

## Common Tasks

### Creating a New Project

```
1. Navigate to Projects (/projects)
2. Click "New Project" or "+" button
3. Fill in project details:
   - Project Name
   - Description
   - Repository URL (optional)
   - Team Members
4. Click "Create Project"
5. Your project appears in the list!
```

### Interacting with KORDI

**Text Chat**:
```
1. Click the KORDI icon
2. Type your question or command
3. Press Enter or click Send
4. KORDI responds with helpful information
```

**Voice Commands** (if enabled):
```
1. Say "Hey Kordi"
2. Wait for the voice indicator
3. Speak your command clearly
4. KORDI processes and responds
```

**Quick Actions**:
```
1. Open KORDI assistant
2. Click a quick action button:
   - Deploy: Start deployment
   - Explain Code: Get code explanations
   - Run Bug Scan: Check for bugs
   - Create PR: Open pull request
```

### Starting a Deployment

```
1. Go to Deployments (/deployments)
2. Click "New Deployment"
3. Follow the deployment wizard:
   - Select platform (Vercel, etc.)
   - Configure settings
   - Review and confirm
4. Monitor progress in live logs
5. View deployment in history
```

### Managing Team Members

```
1. Navigate to Team (/team)
2. Click "Invite Member"
3. Enter email address
4. Select role/permissions
5. Send invitation
```

---

## Tips & Best Practices

### Performance Tips

1. **Use Modern Browsers**: Chrome, Firefox, Safari, or Edge
2. **Enable Hardware Acceleration**: In browser settings
3. **Clear Cache**: If experiencing issues (Cmd+Shift+R or Ctrl+Shift+R)
4. **Close Unused Tabs**: Free up browser resources

### Productivity Tips

1. **Keyboard Shortcuts**:
   - `Cmd/Ctrl + K`: Open command palette (coming soon)
   - `Cmd/Ctrl + B`: Toggle sidebar
   - `Esc`: Close modals/dialogs

2. **Voice Commands**: Use hands-free with KORDI
   - "Hey Kordi, deploy my app"
   - "Hey Kordi, show me recent commits"
   - "Hey Kordi, create a new branch"

3. **Quick Actions**: Save time with one-click actions
   - Star frequently used projects
   - Use deployment templates
   - Set up favorite commands

### Customization Tips

1. **Theme**: Toggle dark/light mode (coming soon)
2. **Layout**: Customize dashboard cards
3. **Notifications**: Configure notification preferences
4. **AI Behavior**: Adjust KORDI's response style

---

## Troubleshooting

### Development Server Won't Start

**Error**: `Port 8080 is already in use`

**Solution**:
```bash
# Find and kill the process using port 8080
# On macOS/Linux:
lsof -ti:8080 | xargs kill -9

# On Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 3000
```

### Dependencies Installation Fails

**Error**: `npm ERR!` during installation

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Page Shows Blank Screen

**Problem**: Browser compatibility or JavaScript error

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Try a different browser
4. Clear browser cache
5. Restart development server

### Voice Commands Not Working

**Problem**: Microphone access or browser support

**Solution**:
1. Grant microphone permissions
2. Use Chrome/Edge (best support)
3. Check microphone settings
4. Ensure HTTPS in production

---

## Next Steps

Now that you're set up, here's what to explore next:

### Learn More

- 📖 [Technical Specifications](../TECHNICAL_SPECS.md) - Dive deep into the architecture
- 🗺️ [Roadmap](../ROADMAP.md) - See what's coming next
- 🤝 [Contributing](../CONTRIBUTING.md) - Join the development

### Build Something

- Create your first project
- Deploy a sample application
- Customize your workspace
- Invite team members

### Get Involved

- ⭐ Star the repository on GitHub
- 🐛 Report bugs or issues
- 💡 Suggest new features
- 📝 Contribute to documentation

### Join the Community

- GitHub Discussions: Ask questions and share ideas
- Discord (Coming Soon): Real-time chat with the community
- Twitter: Follow @adiio_dev for updates
- Blog: Read tutorials and announcements

---

## Need Help?

If you're stuck or have questions:

1. **Documentation**: Check our comprehensive docs
2. **GitHub Issues**: Search existing issues or create a new one
3. **Discussions**: Ask the community
4. **Email**: support@adi-io.dev

---

## Quick Reference

### Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter

# Git
git status           # Check changes
git pull             # Update from remote
git push             # Push changes

# Troubleshooting
npm cache clean --force   # Clear npm cache
rm -rf node_modules       # Remove dependencies
npm install               # Reinstall dependencies
```

### Important URLs

- **Development**: http://localhost:8080
- **GitHub Repo**: https://github.com/varda204/adi-io
- **Lovable Project**: https://lovable.dev/projects/af50258b-3fe5-4af5-a447-478c9247b632

---

**Welcome to ADI-IO! We're excited to have you here.** 🎉

Start building, deploying, and collaborating with the power of AI!
