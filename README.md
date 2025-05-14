# Bio-on heaalthcare - Herbal eCommerce Website

A full-stack, production-ready herbal eCommerce website built with Next.js, Supabase, and TailwindCSS.

## Features

- 🪴 Herbal-themed design with earthy colors
- 🔐 Customer authentication and user profiles
- 🔑 Admin dashboard for product and order management
- 🧱 Supabase backend with PostgreSQL, Auth, and Row Level Security
- 🛒 Complete shopping experience with cart and checkout
- 📦 Order and inventory management
- 👤 User portal for order history and account management
- 🖥️ Responsive design with modern UI components

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: TailwindCSS, shadcn/ui components
- **Deployment**: Vercel (frontend), Supabase (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/Bio-on heaalthcare.git
   cd Bio-on heaalthcare
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

1. Create a new Supabase project.
2. Run the SQL queries in `schema.sql` to set up the database schema.
3. Set up Row Level Security (RLS) policies as defined in the schema.

### Admin Setup

To create an admin user:

1. Register a regular user through the website.
2. In the Supabase dashboard, go to the SQL editor.
3. Run the following SQL query, replacing `user_id` with the UUID of the user you want to make an admin:
   \`\`\`sql
   INSERT INTO admin_users (id, email)
   SELECT id, email FROM auth.users WHERE id = 'user_id';
   \`\`\`

## Deployment

### Frontend (Vercel)

1. Push your code to a GitHub repository.
2. Create a new project on Vercel and import your repository.
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the project.

### Backend (Supabase)

Your Supabase project is already deployed and accessible via the provided URL and API keys.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Let's create the `.env.example` file:
