import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Box } from "@mui/material";

import HomePage from "../src/pages/HomePage";
import MenuPage from "./pages/MenuPage";
import Appetizers from "./pages/categories/Appetizers";
import Salads from "./pages/categories/Salads";
import MainCourses from "./pages/categories/MainCourses";
import Drinks from "./pages/categories/Drinks";
import MenuItemPage from "./pages/MenuItemPage";
import Cart from "./pages/Cart";

import Footer from "./components/Footer";

import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function AppLayout() {
  const location = useLocation();

  const hideFooter =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/signup") ||
    location.pathname === "/auth";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuItemPage />} />

          <Route path="/appetizers" element={<Appetizers />} />
          <Route path="/salads" element={<Salads />} />
          <Route path="/maincourses" element={<MainCourses />} />
          <Route path="/drinks" element={<Drinks />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </Box>

      {!hideFooter && <Footer />}
    </Box>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
