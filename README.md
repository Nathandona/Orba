# Orba

Orba is a sleek, modern project management tool inspired by Kanban principles, designed to streamline task organization and team collaboration. Built with Next.js, it uses NextAuth for secure authentication and shadcn/ui for elegant, accessible UI components.

## Features

- Dynamic Kanban-style boards for task organization
- User authentication with NextAuth (OAuth and credentials support)
- Responsive, accessible UI powered by shadcn components
- Drag-and-drop cards for intuitive workflow management
- Agile-friendly and customizable for diverse projects

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework for server-side rendering and static site generation
- [NextAuth.js](https://next-auth.js.org/) — Authentication solution for Next.js applications
- [shadcn/ui](https://ui.shadcn.com/) — Component library built with Radix UI and Tailwind CSS
- TypeScript for type safety and developer experience

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Nathandona/Orba.git
   cd orba
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn
   ```

3. Configure environment variables:

   Create a `.env.local` file based on `.env.example` including settings for NextAuth providers and database connection.

4. Run the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to start using Orba.

## Scripts

- `dev` - Run development server
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run linter checks
- `test` - Run tests (add test framework as needed)