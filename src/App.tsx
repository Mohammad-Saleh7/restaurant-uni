import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
// import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
import Appetizers from "./pages/Appetizers";
import Salads from "./pages/Salads";
import MainCourses from "./pages/MainCourses";
import Drinks from "./pages/Drinks";
import Footer from "./components/Footer";
import MenuItemPage from "./pages/MenuItemPage";
const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:id" element={<MenuItemPage />} />
          {/* category routes */}
          <Route path="/appetizers" element={<Appetizers />} />
          <Route path="/salads" element={<Salads />} />
          <Route path="/maincourses" element={<MainCourses />} />
          <Route path="/drinks" element={<Drinks />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
