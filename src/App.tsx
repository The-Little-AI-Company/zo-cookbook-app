import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookbookApp from "./pages/cookbook";
import ConnectPage from "./pages/connect";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CookbookApp />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
