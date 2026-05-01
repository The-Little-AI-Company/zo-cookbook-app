import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookbookApp from "./pages/cookbook";
import IdeaDetailPage from "./pages/idea-detail";
import FAQPage from "./pages/faq";
import ChangelogPage from "./pages/changelog";
import BlogPage from "./pages/blog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CookbookApp />} />
        <Route path="/ideas/:type/:slug" element={<IdeaDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}
