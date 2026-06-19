import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookbookApp from "./pages/cookbook";
import IdeaDetailPage from "./pages/idea-detail";
import FAQPage from "./pages/faq";
import ChangelogPage from "./pages/changelog";
import BlogPage from "./pages/blog";
import WhatsNewPage from "./pages/whats-new";
import SubmitPage from "./pages/submit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CookbookApp />} />
        <Route path="/ideas/:type/:slug" element={<IdeaDetailPage />} />
        <Route path="/whats-new" element={<WhatsNewPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </BrowserRouter>
  );
}
