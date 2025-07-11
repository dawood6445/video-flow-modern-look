
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
  Play,
  CheckCircle,
  ArrowRight,
  Youtube,
  Instagram,
  Facebook,
  Heart,
  Share2,
  MessageCircle,
  Smile,
  Star,
  Users,
  TrendingUp
} from "lucide-react";
import AdSection from "@/components/AdSection";
import ThemeToggle from "@/components/ThemeToggle";

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
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Lightning Fast",
      description: "Download videos in seconds with our optimized servers"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "100% Safe",
      description: "No malware, no ads, completely secure downloads"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-pink-500" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and platforms"
    },
    {
      icon: <Globe className="h-8 w-8 text-sky-500" />,
      title: "Multiple Platforms",
      description: "Support for YouTube, TikTok, Instagram, and more"
    }
  ];

  const platforms = [
    { name: "YouTube", icon: <Youtube className="h-8 w-8" />, color: "text-red-500", users: "2B+" },
    { name: "Instagram", icon: <Instagram className="h-8 w-8" />, color: "text-pink-500", users: "1B+" },
    { name: "Facebook", icon: <Facebook className="h-8 w-8" />, color: "text-blue-500", users: "2.8B+" },
  ];

  const stats = [
    { number: "15M+", label: "Videos Downloaded", icon: <Download className="h-6 w-6" /> },
    { number: "750K+", label: "Happy Users", icon: <Users className="h-6 w-6" /> },
    { number: "100+", label: "Supported Sites", icon: <Globe className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="h-6 w-6" /> }
  ];

  const howItWorks = [
    { 
      step: "1", 
      title: "Paste URL", 
      description: "Copy and paste the video URL from any supported platform",
      icon: <Share2 className="h-6 w-6" />
    },
    { 
      step: "2", 
      title: "Choose Quality", 
      description: "Select your preferred video quality and format",
      icon: <Star className="h-6 w-6" />
    },
    { 
      step: "3", 
      title: "Download", 
      description: "Click download and get your video instantly",
      icon: <Download className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 dark:from-pink-950 dark:via-purple-950 dark:to-sky-950">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-400/20 to-orange-400/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl pulse-glow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="slide-in-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6">
                Download Videos
                <span className="gradient-text block mt-2">
                  Instantly & Free
                </span>
              </h1>
            </div>
            
            <div className="slide-in-right">
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                The fastest and most reliable video downloader. Download from YouTube, TikTok, 
                Instagram, and 100+ other platforms in HD quality.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-8 slide-in-left">
              <div className="social-card p-6 gradient-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="Paste video URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-14 bg-white/80 dark:bg-gray-900/80 border-2 border-transparent focus:bg-white dark:focus:bg-gray-900 text-lg"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="h-14 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:via-purple-600 hover:to-sky-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { icon: <CheckCircle className="mr-2 h-4 w-4 text-green-500" />, text: "Free Forever" },
                { icon: <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />, text: "No Registration" },
                { icon: <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />, text: "HD Quality" },
                { icon: <CheckCircle className="mr-2 h-4 w-4 text-orange-500" />, text: "Fast Download" }
              ].map((item, index) => (
                <span key={index} className="flex items-center bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  {item.icon}{item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile and Desktop Preview */}
          <div className="mt-20 flex justify-center items-center gap-8">
            <div className="slide-in-left">
              <div className="relative">
                <div className="w-64 h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Smartphone className="h-16 w-16 mx-auto mb-4 floating-animation" />
                      <p className="font-semibold">Mobile App</p>
                      <p className="text-sm opacity-80">Download anywhere</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center pulse-glow">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="slide-in-right">
              <div className="relative">
                <div className="w-80 h-48 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-3 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Globe className="h-12 w-12 mx-auto mb-2 bounce-slow" />
                      <p className="font-semibold">Desktop Version</p>
                      <p className="text-sm opacity-80">Full features</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center pulse-glow">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="social-card p-6 hover-scale">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-poppins gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              Supported Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download videos from your favorite social media platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Link 
                key={index} 
                to={`/platforms/${platform.name.toLowerCase()}`}
                className="social-card p-8 text-center hover-scale group"
              >
                <div className={`flex justify-center mb-6 ${platform.color} group-hover:scale-110 transition-transform duration-300`}>
                  <div className="p-4 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-lg">
                    {platform.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-poppins mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-4">{platform.users} active users</p>
                <div className="flex justify-center space-x-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-purple-50 to-orange-50 dark:from-sky-950 dark:via-purple-950 dark:to-orange-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              Why Choose VideoGet?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best video downloading experience with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="social-card p-6 text-center hover-scale group">
                <div className="flex justify-center mb-6 group-hover:bounce transition-all duration-300">
                  <div className="p-4 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold font-poppins mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSection />

      {/* How it Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Three simple steps to download any video
            </p>
            <div className="flex justify-center">
              <Smile className="h-12 w-12 text-yellow-500 bounce-slow" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="social-card p-8 hover-scale">
                  <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-sky-500 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="flex justify-center mb-4 text-orange-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-poppins mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 h-6 w-6 text-muted-foreground transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50 dark:from-pink-950 dark:via-purple-950 dark:to-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              Loved by Millions
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our community of happy users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Content Creator", message: "Best video downloader I've ever used! Super fast and reliable.", rating: 5 },
              { name: "Mike R.", role: "Social Media Manager", message: "Perfect for downloading client videos. Works every time!", rating: 5 },
              { name: "Lisa K.", role: "Student", message: "Love that it's free and works on all platforms. Highly recommend!", rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="social-card p-6 hover-scale">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.message}"</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <Share2 className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="social-card p-12 hover-scale pulse-glow">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who trust VideoGet for their video downloading needs
            </p>
            <Link to="/download">
              <Button className="h-14 px-12 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 hover:from-pink-600 hover:via-purple-600 hover:to-sky-600 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Start Downloading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-6 flex justify-center">
              <Smile className="h-8 w-8 text-yellow-500 bounce-slow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
