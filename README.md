# BurnAway Frontend

BurnAway is a modern, responsive web application designed to help developers monitor their mental health, predict burnout risks, and receive personalized recovery interventions. The user interface emphasizes dynamic aesthetics, ease of use, and multi-language support.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (with dark mode support)
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **Networking**: Axios
- **Linting & Code Quality**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- (Optional) Docker for containerized development

## ⚙️ Environment Variables

Create a `.env` file in the root of the frontend directory to configure external connections.

```env
# URL for the BurnAway backend API Gateway
VITE_API_URL=http://localhost:3000/api
```

## 📦 Installation

Install the required dependencies using npm:

```bash
npm install
```

## 🛠️ Running the Application

### Development Mode (with hot-reload)
```bash
npm run dev
```
The application will typically start at `http://localhost:5173`.

### Production Build
To create a production-ready build:
```bash
npm run build
```
You can then preview the build locally:
```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 📁 Project Structure

```text
BurnAway-frontend/
├── public/             # Static assets (images, icons)
├── src/
│   ├── components/     # Reusable React components (UI, charts, forms)
│   ├── contexts/       # React Context providers (AuthContext)
│   ├── hooks/          # Custom React hooks (useAuth, useLanguage)
│   ├── locales/        # Internationalization files (en.json, id.json)
│   ├── pages/          # Application views/routes (Dashboard, Profile, Login)
│   ├── services/       # API integration and Axios configuration
│   ├── utils/          # Helper functions and formatters
│   ├── App.jsx         # Main application component and routing configuration
│   ├── main.jsx        # React application entry point
│   └── index.css       # Global styles and Tailwind configuration
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration file
├── package.json        # Dependencies and scripts
└── eslint.config.js    # ESLint configuration
```

## ✨ Key Features

- **Dynamic Aesthetics**: Includes glassmorphism, responsive UI elements, dark mode support, and smooth micro-animations for a premium user experience.
- **Predictive Dashboard**: Visualize work habits and stress levels over time using Recharts.
- **Instant Recovery UI**: Instantly access and render AI-generated markdown advice directly after taking a burnout test.
- **Multilingual Support**: Switch seamlessly between English and Indonesian natively.