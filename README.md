# 🛒 Meal Mall – Groceries & Meal Card Dashboard

A full-featured React application modeled after the **Meal Mall** dashboard design, powered by the [DummyJSON Groceries Category API](https://dummyjson.com/products/category/groceries) using **Axios**, a custom React hook (`useGroceries`), and responsive styling with **Tailwind CSS**.

---

## 🌟 Key Architecture & Features

### 1. Dashboard Layout (Meal Mall Design)
- **Left Sidebar (`bg-slate-900`)**:
  - Meal Mall branding & active API badge
  - Navigation tabs with icon badges:
    - 📊 **Dashboard**: Metrics & top-rated items overview
    - 🍽️ **Meal Card**: Responsive product grid with tag filters & sorting
    - ➕ **Meal Create**: Interactive form to add new grocery items
    - 🛍️ **Saved & Cart**: Bookmarked items with live count
- **Top Navigation Bar (`bg-white`)**:
  - Dynamic page title
  - Real-time search across titles, descriptions, and tags
  - Cart counter badge with quick checkout modal
  - Profile avatar

### 2. Live API Integration with Axios (`useGroceries.js`)
- Fetches all grocery items from `https://dummyjson.com/products/category/groceries`.
- Implements `useState`, `useEffect`, and `useCallback`.
- Incorporates `AbortController` cancellation to prevent memory leaks.
- Supports client-side creation (`addProduct`) and refetching (`refetch`).

### 3. Reusable `MealCard` Component
Displays each grocery item with:
- 🖼️ **Product Thumbnail** with smooth hover zoom
- ⭐ **Rating Badge** (e.g. ⭐ 4.19)
- 🏷️ **Category Tag** (`fruits`, `meat`, etc.) & **Stock Status** (`In Stock` / `Low Stock`)
- 🏷️ **Discount Badge** (`12% OFF`)
- 💰 **Price & Strikethrough Original Price**
- 🚚 **Shipping Guarantee**
- ⚡ **Dual Action Buttons**:
  - **"View Details"**: Opens comprehensive modal with product specs, dimensions, warranty, return policy, and customer reviews.
  - **"Add to Cart"**: Toggles item into cart/saved with persistent `localStorage` storage.

### 4. Interactive Modals
- **`ProductDetailModal`**: Displays high-res images, pricing breakdown, shipping information, dimensions, and customer feedback.
- **`CreateMealModal`**: Form allowing users to create new items (Title, Price, Stock, Category, Rating, Image) directly into the app state.
- **`CartModal`**: Drawer displaying cart contents with price summation and simulated checkout.

---

## 📁 Project Structure

```
P-Meals-Card/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx            # Dark slate sidebar with navigation
│   │   ├── Topbar.jsx             # Top bar with search, cart badge & profile
│   │   ├── DashboardView.jsx      # Metrics overview & top-rated items
│   │   ├── MealCard.jsx           # Reusable product/meal card component
│   │   ├── CardSkeleton.jsx       # Pulsing skeleton placeholder loader
│   │   ├── ErrorAlert.jsx         # Error alert with retry button
│   │   ├── ProductDetailModal.jsx # Full product specifications & reviews modal
│   │   ├── CreateMealModal.jsx    # Meal Create / Add Item modal
│   │   └── CartModal.jsx          # Cart & Saved items checkout drawer
│   ├── hooks/
│   │   └── useGroceries.js        # Axios API data hook with AbortController
│   ├── App.jsx                    # Application layout & state orchestrator
│   ├── index.css                  # Tailwind CSS styling
│   └── main.jsx                   # Entry point
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```
Navigate to `http://localhost:5173`.
