import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { MealList } from './components/MealList';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                <h2 className="text-xl font-bold text-slate-700 mb-1">Dashboard</h2>
                <p className="text-xs">Dashboard is currently empty</p>
              </div>
            }
          />
          <Route path="/meal-list" element={<MealList />} />
          <Route
            path="/create-meal"
            element={
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                <h2 className="text-xl font-bold text-slate-700 mb-1">Create Meal</h2>
                <p className="text-xs">Create Meal page is currently empty</p>
              </div>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
