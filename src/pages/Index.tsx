
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
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
  const navigate = useNavigate();

  const handleDownload = () => {
    if (url.trim()) {
      navigate(`/download?video_url=${encodeURIComponent(url.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast",
      description: "Download videos in seconds"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-400" />,
      title: "100% Safe",
      description: "No malware, completely secure"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Mobile Friendly",
      description: "Works on all devices"
    },
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: "1000+ Platforms",
      description: "Support for all major platforms"
    }
  ];

  const platforms = [
    { name: "YouTube", icon: <Youtube className="h-6 w-6" />, color: "text-red-500", description: "4K, playlists, audio" },
    { name: "TikTok", icon: <Instagram className="h-6 w-6" />, color: "text-pink-500", description: "No watermark, HD quality" },
    { name: "Instagram", icon: <Instagram className="h-6 w-6" />, color: "text-pink-600", description: "Stories, Reels, IGTV" },
    { name: "Facebook", icon: <Facebook className="h-6 w-6" />, color: "text-blue-500", description: "Watch, live videos" },
    { name: "Twitter", icon: <Twitter className="h-6 w-6" />, color: "text-blue-400", description: "Videos, GIFs, threads" },
  ];

  const stats = [
    { number: "1000+", label: "Supported Sites" },
    { number: "50M+", label: "Videos Downloaded" },
    { number: "2M+", label: "Happy Users" },
    { number: "99.9%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-green-400/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 animate-fade-in">
              Download Videos from
              <span className="gradient-text block mt-2">
                1000+ Platforms Instantly
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              The most comprehensive video downloader supporting YouTube, TikTok, Instagram, Facebook, Twitter, and 1000+ other platforms. Download in HD quality, extract audio, and save content for offline viewing.
            </p>
            
            <div className="max-w-xl mx-auto mb-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row gap-3 glass-effect p-2 rounded-lg">
                <Input
                  type="url"
                  placeholder="Paste any video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-11 bg-background/50 border-border"
                />
                <Button 
                  onClick={handleDownload}
                  className="h-11 px-6 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> Free Forever</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> No Registration</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> HD Quality</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> 1000+ Sites</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-poppins gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Platforms */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Download from 1000+ Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support for all major social media platforms and video hosting sites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {platforms.map((platform, index) => (
              <Link 
                key={index} 
                to={`/platforms/${platform.name.toLowerCase()}`}
                className="glass-effect p-4 rounded-lg hover:bg-card/40 transition-all duration-300 hover-scale group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`${platform.color} group-hover:scale-110 transition-transform`}>
                    {platform.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
            <div className="glass-effect p-4 rounded-lg bg-gradient-to-br from-primary/5 to-green-400/5 border-2 border-dashed border-primary/20">
              <div className="text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-base mb-1">+995 More</h3>
                <p className="text-sm text-muted-foreground">Vimeo, Dailymotion, Reddit, Pinterest, LinkedIn, Twitch & more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Features Section */}
      <section className="py-16 bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Why Choose VideoGet?
            </h2>
            <p className="text-lg text-muted-foreground">
              The most advanced video downloader with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect hover:bg-card/40 transition-all duration-300 hover-scale border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold font-poppins mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Download any video in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste URL", description: "Copy video URL from any of 1000+ supported platforms" },
              { step: "2", title: "Choose Format", description: "Select quality, format, and download options" },
              { step: "3", title: "Download", description: "Get your video instantly in seconds" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-primary to-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold font-poppins mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect rounded-2xl p-8 md:p-12 border-border">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Start Downloading Now
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join millions who trust VideoGet for downloading from 1000+ platforms
            </p>
            <Link to="/download">
              <Button className="h-12 px-8 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium text-lg">
                Try VideoGet Free
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
