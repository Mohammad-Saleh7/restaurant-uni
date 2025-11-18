import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../src/pages/HomePage";
import Footer from "./components/Footer";
const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
