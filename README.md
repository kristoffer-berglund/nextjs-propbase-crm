# Propbase (Real Estate CRM)
A specialized CRM & Property management system for Real Estate Agents.
Currently pivoting from a generic inventory concept to a domain-specific tool for managing Property Listings and Agent assignments.

## The Vision
Having worked with **FasAd** and **MiMove** for 2 years, I noticed that many broker tools are clunky. 
**Propbase** is my take on a modern, fast, and type-safe dashboard built with TypeScript/React/Next.js.

## Current Module: Property Management
The core functionality (CRUD) allows agents to:
- **List Properties** (replacing "Books")
- **Assign Agents** (replacing "Authors")
- **Manage Clients**
- **Manage Status** (Active/Sold)

A fullstack web application for managing books, built with modern web technologies. This project utilizes **Next.js** (App Router) for both frontend and backend, styled with **Tailwind CSS** and **Shadcn/ui**, along with **Prisma** and **PostgreSQL** for robust data management. Authentication is handled by **Better-Auth** and data validation by **Zod**. Deployment that scales with **Neon** serverless databases and reliable performance using **Vercel**.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React, TypeScript)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [Better-Auth](https://better-auth.com/)
* **Validation:** [Zod](https://zod.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
* **Version Control:** Git
* **Deployment:** [Neon](https://neon.com/), [Vercel](https://vercel.com/)

## Features

* **Secure Authentication:** User signup and login powered by Better-Auth.
* **Property Management:** Add, edit, and delete properties (CRUD operations).
* **Client Management:** Administrate buyer/seller status for individual properties.
* **Data Validation:** Robust input validation using Zod schemas.
* **Responsive Design:** Fully optimized for both mobile and desktop devices.
* **Server-Side Rendering (SSR):** Fast loading speeds and optimized for SEO.
* **Type Safety:** Full TypeScript support throughout the entire application.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* A PostgreSQL database (local or hosted, e.g., Supabase/Neon)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kristoffer-berglund/nextjs-book-manager.git
    cd nextjs-book-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root of your project and add your database and authentication secrets:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
    
    # Better-Auth Configuration
    BETTER_AUTH_SECRET="your_generated_secret_here"
    BETTER_AUTH_URL="http://localhost:3000" 
    ```

4.  **Setup the database:**
    Run migrations to create the tables in your database:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

```bash
├── app/                  # Next.js App Router (pages and layouts)
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── lib/                  # Helper functions and configuration (auth, db, utils)
├── prisma/               # Database schema and migrations
├── public/               # Static files (images, fonts)
└── styles/               # Global styles (globals.css)
