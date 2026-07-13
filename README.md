# Pharmacy App 🏥

A React-based dashboard for monitoring clinical trials, laboratory testing, and pharmaceutical production. The application provides data visualization, interactive charts, and map integration to help track testing progress and approval status.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **TanStack Query**
- **TanStack Router**
- **Tailwind CSS**
- **Recharts**
- **React Leaflet / Leaflet**
- **Lucide React**

---

## Features

- Dashboard with key performance indicators (KPIs)
- Daily testing statistics
- Weekly testing progress visualization
- Drug approval analytics
- Testing process overview
- Success rate monitoring
- Interactive map of laboratories and research centers
- Responsive design

---

## Dashboard Overview

### Total Tests
Displays planned, executed, and completed tests for each day to compare actual progress with the testing plan.

### Total Tested Drugs
Shows the total number of tested drug samples and weekly testing progress.

### Drug Approval Rates
Tracks approved drug formulations compared with the total number of manufactured formulations over the last seven days.

### Testing Process
Visualizes how laboratory work is distributed across the four research stages:
- Preclinical
- Clinical
- Regulatory
- Phase 4 Approval

### Success Rate
Displays the percentage of approved formulations versus those requiring retesting.

---

## 📁 Project Architecture & Structure

The project follows a modular **Feature-Driven Architecture**, making the codebase easy to maintain and extend.

### `src/features/`
Contains feature modules such as authentication, chat, and medication management. Each feature includes its own components, hooks, API logic, and utilities.

### `src/routes/`
Defines the application's routes using **TanStack Router**, including both public and protected pages.

### `src/shared/`
Stores reusable components, API configuration, layouts, and shared utilities used across the application.

### `src/routeTree.gen.ts`
Automatically generated routing configuration created by TanStack Router.

---

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd pharmacy-app
npm install
```

### Development

Run the application locally:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

### Other Commands

```bash
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## Technologies Used

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| TanStack Query | Server State Management |
| TanStack Router | Routing |
| Recharts | Charts and Analytics |
| React Leaflet | Interactive Maps |
| Lucide React | Icons |

---

## Future Improvements

- Authentication
- Backend API integration
- Real-time dashboard updates
- Export reports
- Advanced filtering and search
- Dark mode support

---