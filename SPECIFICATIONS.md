# Technical Specifications - Orba
## Modern Project Management Platform

---

## 1. Project Overview

### 1.1 Context
**Orba** is a modern project management platform inspired by Kanban principles, designed to streamline task organization and team collaboration. The application aims to provide an intuitive and elegant solution for agile project management.

### 1.2 Objectives
- Provide a Kanban-based project management tool
- Facilitate team collaboration
- Offer a modern and accessible user interface
- Integrate billing and subscription features
- Ensure user security and authentication

---

## 2. Functional Specifications

### 2.1 User Management

#### 2.1.1 Authentication
- **Registration/Login**: Authentication system with NextAuth.js
- **Supported methods**:
  - Email/password authentication
  - OAuth (external providers)
- **Security**: Password hashing with bcryptjs
- **Password recovery**: Email-based reset system

#### 2.1.2 User Profile
- **Personal information**:
  - Name, email, bio
  - Location, company, job title
  - Profile picture
- **Statistics**:
  - Number of projects
  - Completed tasks
  - Logged hours
  - Team members

### 2.2 Project Management

#### 2.2.1 Creation and Configuration
- **Project creation** with name, description, color
- **Optional due date**
- **Owner**: Project creator
- **Project templates**: Predefined templates by category

#### 2.2.2 Collaboration
- **Member management**:
  - Email invitations
  - Roles: member, administrator
  - Status: pending, active
- **Permissions**:
  - Owner: full control
  - Administrator: member and task management
  - Member: task creation and modification

### 2.3 Kanban System

#### 2.3.1 Columns
- **Customizable columns**:
  - Title, color, position
  - Create, modify, delete
  - Drag-and-drop reorganization

#### 2.3.2 Tasks
- **Task properties**:
  - Title, description
  - Priority (low, medium, high)
  - Due date
  - Assignee (team member)
  - Labels/tags
  - Position in column

#### 2.3.3 Advanced Features
- **Drag-and-drop**: Intuitive task reorganization
- **Comments**: Task discussions
- **Attachments**: File uploads
- **History**: Change tracking

### 2.4 Subscription System

#### 2.4.1 Stripe Integration
- **Subscription plans**:
  - Free plan (limited features)
  - Premium plan (full features)
- **Payment management**:
  - Secure checkout
  - Customer portal for subscription management
  - Webhooks for synchronization

#### 2.4.2 Premium Features
- **Advanced templates**
- **Extended collaboration**
- **Detailed statistics**
- **Priority support**

---

## 3. Technical Specifications

### 3.1 Architecture

#### 3.1.1 Frontend
- **Framework**: Next.js 15.5.6 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **3D**: Three.js with React Three Fiber

#### 3.1.2 Backend
- **API**: Next.js API Routes (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **Payments**: Stripe
- **Email**: ZeptoMail for notifications

#### 3.1.3 Infrastructure
- **Deployment**: Docker with docker-compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Performance monitoring component

### 3.2 Database

#### 3.2.1 Main Models
- **User**: Users and profile information
- **Project**: Projects with metadata
- **Column**: Kanban columns
- **Task**: Tasks with complete properties
- **Comment**: Task comments
- **Attachment**: File attachments

#### 3.2.2 Support Models
- **Account/Session**: NextAuth session management
- **Subscription**: Stripe subscriptions
- **ProjectMember**: Project members
- **ProjectTemplate**: Project templates
- **ContactSubmission**: Contact forms

### 3.3 API Endpoints

#### 3.3.1 Authentication
- `POST /api/auth/register`: Registration
- `POST /api/auth/forgot-password`: Forgot password
- `POST /api/auth/reset-password`: Password reset

#### 3.3.2 Projects
- `GET /api/projects`: Project list
- `POST /api/projects`: Project creation
- `GET /api/projects/[id]`: Project details
- `PUT /api/projects/[id]`: Project modification
- `DELETE /api/projects/[id]`: Project deletion

#### 3.3.3 Tasks and Columns
- `GET /api/projects/[id]/columns`: Project columns
- `POST /api/projects/[id]/columns`: Column creation
- `GET /api/projects/[id]/tasks`: Project tasks
- `POST /api/projects/[id]/tasks`: Task creation
- `PUT /api/tasks/[id]`: Task modification

#### 3.3.4 Collaboration
- `GET /api/projects/[id]/members`: Project members
- `POST /api/projects/[id]/members`: Member invitation
- `POST /api/projects/[id]/leave`: Leave project

---

## 4. User Interface

### 4.1 Design System
- **Components**: shadcn/ui with Radix UI
- **Themes**: Dark/light mode with next-themes
- **Typography**: Geist Sans and Geist Mono fonts
- **Colors**: Consistent palette with CSS variables
- **Responsive**: Mobile-first adaptive design

### 4.2 Main Pages

#### 4.2.1 Public Pages
- **Home** (`/`): Landing page with presentation
- **Features** (`/features`): Feature details
- **Pricing** (`/pricing`): Plans and pricing
- **Documentation** (`/docs`): User guide

#### 4.2.2 Authenticated Pages
- **Dashboard** (`/dashboard`): Project overview
- **Project** (`/dashboard/project/[id]`): Kanban interface
- **Profile** (`/profile`): User profile management

#### 4.2.3 Legal Pages
- **Terms of Service** (`/terms`)
- **Privacy Policy** (`/privacy`)

### 4.3 Key Components
- **KanbanBoard**: Main board with columns
- **KanbanCard**: Interactive task cards
- **NewTaskDialog**: Task creation modal
- **EditTaskDialog**: Task editing modal
- **TeamDialog**: Team member management

---

## 5. Security and Performance

### 5.1 Security
- **Authentication**: Secure sessions with NextAuth
- **Authorization**: API permission verification
- **Validation**: Zod schemas for data validation
- **HTTPS**: Communication encryption
- **CORS**: Appropriate origin configuration

### 5.2 Performance
- **SSR/SSG**: Server-side rendering with Next.js
- **Optimization**: Turbopack for development
- **Monitoring**: Integrated monitoring component
- **Caching**: Appropriate caching strategies

---

## 6. Deployment and Maintenance

### 6.1 Environments
- **Development**: Local configuration with Docker
- **Staging**: Testing environment
- **Production**: Secure deployment

### 6.2 CI/CD
- **GitHub Actions**: Automated workflows
- **Tests**: Automated checks
- **Deployment**: Continuous deployment pipeline

### 6.3 Monitoring
- **Logs**: Error logging
- **Metrics**: Performance monitoring
- **Alerts**: Problem notifications

---

## 7. Future Enhancements

### 7.1 Planned Features
- **Real-time notifications**: WebSockets
- **Integrations**: Third-party APIs (Slack, GitHub, etc.)
- **Advanced reports**: Analytics and dashboards
- **Mobile**: Native mobile application

### 7.2 Technical Improvements
- **Microservices**: Distributed architecture
- **Redis cache**: Performance improvements
- **CDN**: Global content distribution
- **Testing**: Extended test coverage

---

## 8. Constraints and Limitations

### 8.1 Technical Constraints
- **Compatibility**: Modern browsers only
- **Database**: PostgreSQL required
- **Node.js**: Version 18+ required

### 8.2 Current Limitations
- **Real-time collaboration**: Not implemented
- **Push notifications**: Not available
- **Data export**: Limited functionality

---

## 9. Development Stack

### 9.1 Dependencies
```json
{
  "next": "15.5.6",
  "react": "19.1.0",
  "typescript": "latest",
  "@prisma/client": "^6.17.1",
  "next-auth": "^4.24.11",
  "stripe": "^19.1.0",
  "@dnd-kit/core": "^6.3.1",
  "framer-motion": "^12.23.24",
  "tailwindcss": "latest",
  "@radix-ui/react-*": "latest"
}
```

### 9.2 Development Tools
- **Package Manager**: pnpm
- **Database**: PostgreSQL with Prisma
- **Styling**: Tailwind CSS + shadcn/ui
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

---

This specification document reflects the current state of the Orba project and defines the requirements for its complete development.