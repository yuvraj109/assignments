# Omniful Logistics Dashboard

This assignment is a multi-tenant logistics dashboard built with modern React and Redux Toolkit. It demonstrates real-world patterns for authentication, role-based access control, data persistence, and a clean, responsive UI.

## What is Used

- **React** for building the user interface
- **Redux Toolkit** for state management
- **React Router** for navigation and route protection
- **CASL** for role-based permissions (Admin, Manager, Operator)
- **Tailwind CSS** for styling
- **@tanstack/react-table** for advanced tables
- **localStorage** for data persistence (orders, logs, settings, user state)
- **Custom hooks** for permissions and form drafts
- **Fake API** layer to simulate backend calls and persistence

## How It Works

- **Authentication & Roles:**
  - Users log in by selecting a role (Admin, Manager, Operator).
  - The app stores user info and authentication state in Redux and localStorage.
  - Logging out clears all user and app data from localStorage.

- **Permissions:**
  - CASL defines what each role can do (e.g., only Admin can edit settings, Operators can only see their assigned orders).
  - ProtectedRoute and hooks enforce permissions at both route and action level.

- **Orders:**
  - Users can view, create, edit, and delete orders (based on their role).
  - Orders are stored in Redux and persisted to localStorage.
  - All order actions (create, update, delete) are logged.

- **Logs:**
  - Every significant action (like deleting an order) creates a log entry with the acting user's info.
  - Logs are viewable in a dedicated page and are also persisted.

- **Settings:**
  - Company settings can be viewed and edited (by Admin/Manager roles).
  - Changes are saved to localStorage and reflected across the app.

- **UI & Navigation:**
  - The sidebar and header are always visible, with navigation links based on permissions.
  - All pages are protected by authentication and permissions.
  - The app is fully responsive and styled with Tailwind CSS.

- **Data Flow:**
  1. User logs in → Redux state and localStorage updated
  2. User performs actions (orders, settings, etc.) → Redux actions dispatched → Fake API updates localStorage
  3. Logs are created for each important action
  4. On reload, the app restores state from localStorage

---

