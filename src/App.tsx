import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
// import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
import Appetizers from "./pages/categories/Appetizers";
import Salads from "./pages/categories/Salads";
import MainCourses from "./pages/categories/MainCourses";
import Drinks from "./pages/categories/Drinks";
import Footer from "./components/Footer";
import MenuItemPage from "./pages/MenuItemPage";
import Cart from "./pages/Cart";
import { Box } from "@mui/material";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:id" element={<MenuItemPage />} />
            {/* category routes */}
            <Route path="/appetizers" element={<Appetizers />} />
            <Route path="/salads" element={<Salads />} />
            <Route path="/maincourses" element={<MainCourses />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
