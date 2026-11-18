# 🍳 SmartChef – Recipe Cards Application

A responsive, modern React application that fetches live recipe data from the [DummyJSON Recipes API](https://dummyjson.com/recipes) using **Axios**, encapsulates data management within a **custom React hook**, and presents a UI styled with **Tailwind CSS**.

---

## 🌟 Key Features

1. **Working API Integration with Axios**:
   - Fetches 50 curated recipes from `https://dummyjson.com/recipes`.
   - Uses `AbortController` cleanup in `useEffect` to prevent memory leaks.
2. **Custom Hook (`useRecipes`)**:
   - Encapsulates state (`recipes`, `loading`, `error`) and logic (`refetch`).
3. **Reusable `RecipeCard` Component**:
   - Displays all required data:
     - 🖼️ **Recipe Image** (aspect-ratio preserved with `object-cover`)
     - 🏷️ **Recipe Name**
     - 🌍 **Cuisine**
     - ⭐ **Rating** (with review count badge)
     - ⚡ **Difficulty** (color-coded status badge: Easy / Medium / Hard)
     - ⏱️ **Total Cook & Prep Time**
4. **Interactive Action Controls**:
   - **View Recipe**: Opens an interactive modal detailing ingredients (with checklist) and step-by-step cooking instructions.
   - **Save (Bookmark)**: Toggles favorite recipes, updates the navbar badge count, and persists across browser refreshes via `localStorage`.
5. **Polished Loading & Error States**:
   - Pulsing **Skeleton Cards** (`RecipeSkeleton`) that mirror the card dimensions during data fetching.
   - **Error Alert** (`ErrorAlert`) with a "Try Again" retry trigger.
6. **Search & Cuisine Filtering**:
   - Real-time search by recipe name, cuisine, or ingredients.
   - Quick category pills for instant filtering.
7. **Fully Responsive Design**:
   - Mobile: 1 column
   - Tablet / Small Laptop: 2 columns
   - Desktop / Large Screen: 3 columns

---

## 📁 Project Structure

```
P-Meals-Card/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation, search, bookmark counter & avatar
│   │   ├── RecipeCard.jsx      # Reusable recipe card with badges & CTA buttons
│   │   ├── RecipeSkeleton.jsx  # Pulsing placeholder loader
│   │   ├── ErrorAlert.jsx      # Error banner with retry mechanism
│   │   ├── RecipeModal.jsx     # Full recipe detail modal (ingredients & steps)
│   │   └── SavedModal.jsx      # Saved recipes drawer/modal
│   ├── hooks/
│   │   └── useRecipes.js       # Custom React hook with Axios data fetching
│   ├── App.jsx                 # Main orchestrator & responsive layout
│   ├── index.css               # Tailwind CSS directives & global styling
│   └── main.jsx                # React DOM root entry
├── index.html                  # HTML entry with Plus Jakarta Sans typography
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Documentation and interview guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Installation
Open your terminal in this project directory:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🎓 Viva & Project Defense Guide

When presenting this project, here is how to explain your technical decisions:

### 1. Why use a Custom Hook (`useRecipes`)?
> **Explanation:** Placing the data fetching logic inside a custom hook adheres to the **Separation of Concerns** principle. The UI components (`App.jsx`, `RecipeCard.jsx`) stay purely presentational, while `useRecipes.js` owns the asynchronous API lifecycle, loading states, error handling, and memory cleanup.

### 2. Why Axios instead of native `fetch`?
> **Explanation:**
> - Axios automatically serializes and parses JSON responses without needing an extra `.json()` step.
> - Axios rejects promises for any non-2xx HTTP status codes (e.g., 404, 500), making error handling cleaner.
> - Axios seamlessly supports cancellation via `AbortController`.

### 3. Why is `key={recipe.id}` critical in `.map()`?
> **Explanation:** React's reconciliation engine uses keys to identify which DOM elements have changed, added, or removed. Using a unique identifier like `recipe.id` ensures predictable performance and avoids UI glitches when searching or filtering.

### 4. How is mobile responsiveness handled?
> **Explanation:** Built with Tailwind's mobile-first grid system:
> `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`.
