import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookbookApp from "./pages/cookbook";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CookbookApp />} />
      </Routes>
    </BrowserRouter>
  );
}
