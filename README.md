# 🚀 Pushpak O2 

The official web platform for **Pushpak O2**, developers of hydrogen-powered, human-carrying VTOL aircraft. This application serves as the public face of the company, an investor portal, and a comprehensive administrative command center.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Architecture:** React Server Components (RSC) & Client Components
- **Styling:** Tailwind CSS (with custom design system)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend & Data
- **Database:** MongoDB Atlas (managed via Mongoose)
- **Authentication:** NextAuth.js v4 (Google OAuth + Custom Session Sync)
- **Storage:** Vercel Blob (for high-performance image delivery)
- **API:** Next.js Route Handlers

---

## 🌟 Key Features

### 1. Public Portal
- **Dynamic Content:** Real-time fetching of team members and blog posts.
- **High Performance:** Optimized LCP (Largest Contentful Paint) using `next/image` strategies.
- **SEO Optimized:** Automated Sitemap and Robots.txt generation, dynamic metadata for blogs.

### 2. Admin Dashboard (`/dashboards/admin`)
- **CMS (Content Management System):**
  - Custom **Rich Text Editor** built on Tiptap.
  - Features: Auto-slug generation, image uploads, formatting, and live previews.
- **Analytics:** Real-time dashboard usage and content views.
- **Team Management:** Add/Edit/Remove team members with instant cache revalidation.

### 3. Investor Portal (`/dashboards/investor`)
- Secure, role-based access for investors to view proprietary data and reports.
- Protected by custom middleware and session token synchronization.

---

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pushpako2/official-site.git
   cd official-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory. **DO NOT commit this file.**

   ```env
   # Core
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (NextAuth + Google)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_a_secure_random_string
   JWT_SECRET=generate_another_secure_random_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Storage (Vercel Blob)
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

   # Email (Contact Form)
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open:** [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages & API routes
│   ├── api/             # Backend API endpoints (Auth, Blogs, Team, etc.)
│   ├── dashboards/      # Protected Admin & Investor routes
│   └── (public)/        # Public marketing pages (Home, About, etc.)
├── components/
│   ├── ui/              # Reusable UI atoms (Buttons, Inputs, etc.)
│   └── Pages/           # Page-specific complex components
├── lib/
│   ├── db/              # Database connection logic
│   └── models/          # Mongoose Schemas (Blog, Team, Investor)
└── hooks/               # Custom React hooks (useCurrentUser, etc.)
```

---

## 🔒 Security

- **Middleware:** Routes under `/dashboards` are protected by Edge Middleware verifying session tokens.
- **Role-Based Access Control (RBAC):** Strict separation between `admin` and `investor` roles.
- **Data Protection:** Passwords and sensitive tokens are never exposed to the client.

---

## 📄 License

&copy; 2024 Pushpak O2. All rights reserved.