
import { Link } from "react-router-dom";
import { Play, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-green-400 p-2 rounded-lg">
                <Play className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold font-poppins gradient-text">VideoGet</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              The fastest and most reliable video downloader. Download videos from multiple platforms 
              with ease and in the highest quality available.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/download" className="text-muted-foreground hover:text-primary transition-colors">Download</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Platforms</h3>
            <ul className="space-y-2">
              <li><Link to="/platforms/youtube" className="text-muted-foreground hover:text-primary transition-colors">YouTube</Link></li>
              <li><Link to="/platforms/tiktok" className="text-muted-foreground hover:text-primary transition-colors">TikTok</Link></li>
              <li><Link to="/platforms/instagram" className="text-muted-foreground hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link to="/platforms/facebook" className="text-muted-foreground hover:text-primary transition-colors">Facebook</Link></li>
              <li><Link to="/platforms/twitter" className="text-muted-foreground hover:text-primary transition-colors">Twitter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                support@videoget.com
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                San Francisco, CA
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 VideoGet. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
