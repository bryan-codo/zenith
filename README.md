# Zenith Health OS

A modern, minimalist healthcare management dashboard built with React, TypeScript, and TailwindCSS, powered by a Supabase backend.

## Features

*   **Authentication**: Secure login and signup powered by Supabase Auth.
*   **Patient Management**: Create, view, and manage a list of patients.
*   **Appointments & Prescriptions**: Schedule appointments and manage prescriptions.
*   **Dynamic Dashboard**: Get an at-a-glance view of your clinic's operations.
*   **Full-Stack**: All data is persisted in a PostgreSQL database on Supabase.

## Getting Started

Follow these instructions to set up the project, connect it to your own Supabase instance, and deploy it to the web using Vercel.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [npm](https://www.npmjs.com/)
*   A [GitHub](https://github.com/) account
*   A [Supabase](https://supabase.com/) account
*   A [Vercel](https://vercel.com/) account

---

### Step 1: Supabase Project Setup

1.  **Create a New Project**:
    *   Go to your [Supabase Dashboard](https://app.supabase.com/) and click "New project".
    *   Give it a name (e.g., `zenith-health-os`) and a strong database password.
    *   Choose a region and click "Create project".

2.  **Get API Credentials**:
    *   After your project is created, navigate to **Project Settings** (the gear icon in the left sidebar).
    *   Click on the **API** tab.
    *   You will need two values from this page:
        *   **Project URL**
        *   **Project API Keys** > `anon` `public` key.

3.  **Set up the Database Schema**:
    *   In the left sidebar, go to the **SQL Editor**.
    *   Click on **+ New query**.
    *   Open the `db_schema.sql` file from this repository, copy its entire content, and paste it into the Supabase SQL Editor.
    *   Click **Run**. This will create all the necessary tables (`patients`, `appointments`, etc.) for the application to work.

---

### Step 2: Local Development Setup

1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Create Environment File**:
    *   Create a new file named `.env.local` in the root of the project.
    *   Copy the contents of `.env.example` into your new `.env.local` file.
    *   Paste the **Project URL** and **anon key** you got from Supabase in Step 1.

    Your `.env.local` file should look like this:
    ```
    VITE_SUPABASE_URL="https://your-project-url.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application should now be running locally, connected to your Supabase backend. You can create a new account and start using it.

---

### Step 3: Deploy to Vercel

1.  **Push to GitHub**:
    *   Create a new repository on GitHub.
    *   Link your local project to the GitHub repository and push your code.

2.  **Create a Vercel Project**:
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** > **Project**.
    *   Import your GitHub repository. Vercel will automatically detect that it's a Vite project.

3.  **Configure Environment Variables**:
    *   In the project configuration screen, expand the **Environment Variables** section.
    *   Add the two variables from your `.env.local` file:
        *   `VITE_SUPABASE_URL`
        *   `VITE_SUPABASE_ANON_KEY`
    *   Paste the corresponding values from your Supabase project.

4.  **Deploy**:
    *   Click the **Deploy** button. Vercel will build and deploy your application.
    *   Once finished, you'll have a live URL for your Zenith Health OS application!
