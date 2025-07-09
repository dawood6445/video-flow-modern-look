
import { Link } from "react-router-dom";
import { Play, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VideoGet</span>
            </Link>
            <p className="text-white/60 mb-4 max-w-md">
              The fastest and most reliable video downloader. Download videos from multiple platforms 
              with ease and in the highest quality available.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/download" className="text-white/60 hover:text-white transition-colors">Download</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-white/60 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 VideoGet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
