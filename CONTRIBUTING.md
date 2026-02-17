# Contributing to ADI-IO

Thank you for your interest in contributing to ADI-IO! We welcome contributions from the community and are grateful for your support.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Testing Guidelines](#testing-guidelines)
9. [Documentation](#documentation)
10. [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at conduct@adi-io.dev. All complaints will be reviewed and investigated promptly and fairly.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **bun** package manager
- **Git** for version control
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/adi-io.git
   cd adi-io
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/varda204/adi-io.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

4. **Create a branch for your work**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

---

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports
- Use the bug report template
- Include clear steps to reproduce
- Provide environment details (browser, OS, etc.)
- Include screenshots if applicable

#### ✨ Feature Requests
- Use the feature request template
- Clearly describe the problem it solves
- Provide use cases and examples
- Consider implementation complexity

#### 📝 Documentation
- Fix typos and grammatical errors
- Improve clarity and examples
- Add missing documentation
- Translate documentation

#### 💻 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Refactoring
- Test coverage improvements

#### 🎨 Design Contributions
- UI/UX improvements
- Accessibility enhancements
- Visual assets
- Style guide contributions

---

## Development Workflow

### 1. Find or Create an Issue

- Check [existing issues](https://github.com/varda204/adi-io/issues)
- Comment on the issue to claim it
- Wait for maintainer approval before starting work
- For small fixes, you can skip this step

### 2. Work on Your Changes

```bash
# Keep your branch up to date
git fetch upstream
git rebase upstream/main

# Make your changes
# ... edit files ...

# Run linting
npm run lint

# Test your changes
# (Run manual tests or automated tests when available)

# Commit your changes
git add .
git commit -m "feat: add new feature"
```

### 3. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
# Use the pull request template
# Link related issues
```

### 4. Address Review Feedback

- Respond to review comments
- Make requested changes
- Push updates to your branch
- Request re-review when ready

### 5. Merge

- Maintainers will merge your PR when approved
- Delete your branch after merge

---

## Coding Standards

### TypeScript/JavaScript

#### Style Guidelines

```typescript
// ✅ Good: Use meaningful variable names
const userName = getUserName();
const projectList = await fetchProjects();

// ❌ Bad: Avoid single letter or unclear names
const u = getUserName();
const pl = await fetchProjects();

// ✅ Good: Use const for values that don't change
const MAX_RETRIES = 3;
const apiUrl = '/api/projects';

// ❌ Bad: Don't use let for constants
let MAX_RETRIES = 3;

// ✅ Good: Destructure objects and arrays
const { name, email } = user;
const [first, second] = items;

// ✅ Good: Use template literals for strings
const message = `Hello, ${userName}!`;

// ❌ Bad: Avoid string concatenation
const message = 'Hello, ' + userName + '!';
```

#### Component Guidelines

```typescript
// ✅ Good: Functional components with proper typing
interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelect 
}) => {
  return (
    <Card onClick={() => onSelect(project.id)}>
      <h3>{project.name}</h3>
    </Card>
  );
};

// ✅ Good: Use React hooks properly
const MyComponent = () => {
  const [state, setState] = useState<string>('');
  
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [/* dependencies */]);
  
  return <div>{state}</div>;
};
```

#### File Organization

```typescript
// Order of imports
// 1. React and React-related
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. External libraries
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ProjectCard';

// 4. Utilities and types
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

// 5. Styles (if any)
import './styles.css';
```

### CSS/Tailwind

```tsx
// ✅ Good: Use Tailwind utilities consistently
<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
  <span className="text-sm font-medium text-gray-700">Content</span>
</div>

// ✅ Good: Use cn() for conditional classes
<Button 
  className={cn(
    "base-classes",
    isActive && "active-classes",
    isDisabled && "disabled-classes"
  )}
>
  Click me
</Button>

// ❌ Bad: Avoid inline styles unless absolutely necessary
<div style={{ color: 'red', fontSize: '14px' }}>Text</div>
```

### Naming Conventions

- **Files**: 
  - Components: `PascalCase.tsx` (e.g., `ProjectCard.tsx`)
  - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
  - Pages: `PascalCase.tsx` (e.g., `Dashboard.tsx`)

- **Variables/Functions**: `camelCase`
- **Components**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **CSS Classes**: `kebab-case` (when not using Tailwind)

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build config, etc.)
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(projects): add project search functionality

# Bug fix
fix(deployment): resolve deployment logs not loading

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(workspace): simplify file tree component

# Performance
perf(dashboard): optimize project list rendering

# Multiple changes (use body)
feat(kordi): enhance voice command recognition

- Add support for custom wake words
- Improve accuracy with better noise filtering
- Add multi-language support for voice commands

Closes #123
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit subject line to 72 characters
- Capitalize subject line
- Do not end subject line with a period
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Use body to explain what and why, not how

---

## Pull Request Process

### Before Creating a PR

- [ ] Code follows style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] Linting passes (`npm run lint`)
- [ ] Manual testing completed
- [ ] No console errors or warnings

### PR Title Format

Use the same format as commit messages:
```
feat(component): add new feature
fix(page): resolve issue with...
docs: update contributing guide
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #(issue number)
Related to #(issue number)

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have manually tested my changes
```

### Review Process

1. **Automated Checks**: CI/CD runs linting and builds
2. **Code Review**: At least one maintainer reviews
3. **Feedback**: Reviewers may request changes
4. **Updates**: Address feedback and push updates
5. **Approval**: Maintainer approves the PR
6. **Merge**: Maintainer merges the PR

### After Merge

- Delete your branch
- Update your local repository
- Close related issues (if not auto-closed)

---

## Testing Guidelines

### Manual Testing Checklist

- [ ] Feature works as intended
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] Works in Chrome, Firefox, and Safari
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (basic)
- [ ] No performance degradation

### Writing Tests (When Available)

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  it('renders project name', () => {
    const project = { id: '1', name: 'Test Project' };
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
  
  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    const project = { id: '1', name: 'Test Project' };
    render(<ProjectCard project={project} onSelect={onSelect} />);
    
    screen.getByText('Test Project').click();
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

---

## Documentation

### What to Document

- **New Features**: Add usage examples and explanations
- **API Changes**: Document new endpoints or parameter changes
- **Configuration**: Document new environment variables or settings
- **Breaking Changes**: Clearly document migration steps

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Link to related documentation
- Update table of contents

### Where to Add Documentation

- `README.md` - Getting started and overview
- `TECHNICAL_SPECS.md` - Technical implementation details
- `ROADMAP.md` - Future plans and features
- `CONTRIBUTING.md` - This file
- Inline code comments - For complex logic

---

## Community

### Getting Help

- **GitHub Discussions**: Ask questions and share ideas
- **GitHub Issues**: Report bugs and request features
- **Discord** (Coming Soon): Real-time community chat
- **Email**: community@adi-io.dev

### Ways to Get Involved

- **First-Time Contributors**: Look for `good first issue` labels
- **Bug Hunters**: Test features and report bugs
- **Documentation**: Improve docs and write tutorials
- **Code Reviews**: Review other contributors' PRs
- **Community Support**: Help answer questions in Discussions
- **Spread the Word**: Share ADI-IO on social media

### Recognition

We value all contributions! Contributors will be:
- Listed in our CONTRIBUTORS.md file
- Mentioned in release notes (for significant contributions)
- Invited to contributor-only events
- Eligible for contributor swag (coming soon)

---

## Questions?

If you have questions about contributing, please:

1. Check existing documentation
2. Search GitHub Discussions
3. Create a new discussion
4. Email us at community@adi-io.dev

---

**Thank you for contributing to ADI-IO! 🎉**

Every contribution, no matter how small, helps make ADI-IO better for everyone.
