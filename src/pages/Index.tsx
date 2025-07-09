
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  Play,
  CheckCircle,
  ArrowRight,
  Youtube,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import AdSection from "@/components/AdSection";

const Index = () => {
  const [url, setUrl] = useState("");

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "Download videos in seconds with our optimized servers"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "100% Safe",
      description: "No malware, no ads, completely secure downloads"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and platforms"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-400" />,
      title: "Multiple Platforms",
      description: "Support for YouTube, TikTok, Instagram, and more"
    }
  ];

  const platforms = [
    { name: "YouTube", icon: <Youtube className="h-8 w-8" />, color: "text-red-500" },
    { name: "Instagram", icon: <Instagram className="h-8 w-8" />, color: "text-pink-500" },
    { name: "Facebook", icon: <Facebook className="h-8 w-8" />, color: "text-blue-500" },
    { name: "Twitter", icon: <Twitter className="h-8 w-8" />, color: "text-blue-400" },
  ];

  const stats = [
    { number: "15M+", label: "Videos Downloaded" },
    { number: "750K+", label: "Happy Users" },
    { number: "100+", label: "Supported Sites" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-green-400/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 animate-fade-in">
              Download Videos
              <span className="gradient-text block mt-2">
                Instantly & Free
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
              The fastest and most reliable video downloader. Download from YouTube, TikTok, 
              Instagram, and 100+ other platforms in HD quality.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row gap-4 glass-effect p-2 rounded-lg">
                <Input
                  type="url"
                  placeholder="Paste video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                />
                <Link to="/download">
                  <Button className="h-12 px-8 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium w-full sm:w-auto">
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> Free Forever</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> No Registration</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-poppins gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Supported Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download videos from your favorite social media platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Link 
                key={index} 
                to={`/platforms/${platform.name.toLowerCase()}`}
                className="glass-effect p-6 rounded-lg text-center hover:bg-card/40 transition-all duration-300 hover-scale"
              >
                <div className={`flex justify-center mb-4 ${platform.color}`}>
                  {platform.icon}
                </div>
                <h3 className="text-lg font-semibold">{platform.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Why Choose VideoGet?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best video downloading experience with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect hover:bg-card/40 transition-all duration-300 hover-scale border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-poppins mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdSection />

      {/* How it Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to download any video
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste URL", description: "Copy and paste the video URL from any supported platform" },
              { step: "2", title: "Choose Quality", description: "Select your preferred video quality and format" },
              { step: "3", title: "Download", description: "Click download and get your video instantly" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-primary to-green-400 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold font-poppins mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect rounded-2xl p-8 md:p-12 border-border">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who trust VideoGet for their video downloading needs
            </p>
            <Link to="/download">
              <Button className="h-12 px-8 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium text-lg">
                Start Downloading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
