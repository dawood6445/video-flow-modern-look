
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Download from "./pages/Download";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import YouTube from "./pages/platforms/YouTube";
import TikTok from "./pages/platforms/TikTok";
import Instagram from "./pages/platforms/Instagram";
import Facebook from "./pages/platforms/Facebook";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdBanner from "./components/AdBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <AdBanner position="top" />
          <AdBanner position="left" />
          <AdBanner position="right" />
          
          <div className="pt-16"> {/* Add padding for top ad banner */}
            <Navbar />
            <main className="flex-1 px-4 lg:px-32"> {/* Add side padding for ad banners */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/download" element={<Download />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/platforms/youtube" element={<YouTube />} />
                <Route path="/platforms/tiktok" element={<TikTok />} />
                <Route path="/platforms/instagram" element={<Instagram />} />
                <Route path="/platforms/facebook" element={<Facebook />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          
          <AdBanner position="bottom" />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
