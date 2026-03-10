/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicProduct from "./pages/PublicProduct";
import Layout from "./components/Layout";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("seller_user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem("seller_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("seller_user");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />} />
        <Route path="/p/:slug" element={<PublicProduct />} />

        {/* Protected Routes */}
        <Route path="/" element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="products" element={<Products user={user} />} />
          <Route path="products/new" element={<CreateProduct user={user} />} />
          <Route path="orders" element={<Orders user={user} />} />
          <Route path="settings" element={<Settings user={user} onLogout={handleLogout} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

