import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../src/pages/HomePage";
// import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
