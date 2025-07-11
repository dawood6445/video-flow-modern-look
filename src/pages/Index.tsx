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
  Heart,
  Share2,
  MessageCircle,
  Star,
  Users,
  TrendingUp,
  Play,
  Monitor,
  Sparkles
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
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Download videos in seconds with our optimized servers",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe",
      description: "No malware, no ads, completely secure downloads",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and platforms",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multiple Platforms",
      description: "Support for YouTube, TikTok, Instagram, and more",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const platforms = [
    { name: "YouTube", icon: <Youtube className="h-8 w-8" />, color: "text-red-500", users: "2B+", bgColor: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" },
    { name: "Instagram", icon: <Instagram className="h-8 w-8" />, color: "text-pink-500", users: "1B+", bgColor: "from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20" },
    { name: "Facebook", icon: <Facebook className="h-8 w-8" />, color: "text-blue-500", users: "2.8B+", bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" },
  ];

  const stats = [
    { number: "15M+", label: "Videos Downloaded", icon: <Download className="h-5 w-5" />, color: "from-pink-500 to-purple-500" },
    { number: "750K+", label: "Happy Users", icon: <Users className="h-5 w-5" />, color: "from-purple-500 to-blue-500" },
    { number: "100+", label: "Supported Sites", icon: <Globe className="h-5 w-5" />, color: "from-blue-500 to-cyan-500" },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="h-5 w-5" />, color: "from-orange-500 to-red-500" }
  ];

  const howItWorks = [
    { 
      step: "1", 
      title: "Paste URL", 
      description: "Copy and paste the video URL from any supported platform",
      icon: <Share2 className="h-5 w-5" />,
      color: "from-pink-500 to-purple-500"
    },
    { 
      step: "2", 
      title: "Choose Quality", 
      description: "Select your preferred video quality and format",
      icon: <Star className="h-5 w-5" />,
      color: "from-purple-500 to-blue-500"
    },
    { 
      step: "3", 
      title: "Download", 
      description: "Click download and get your video instantly",
      icon: <Download className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 rounded-full blur-3xl float-animation"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-orange-400/30 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl pulse-glow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="slide-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Download Videos
                <span className="gradient-text block mt-2">
                  Instantly & Free
                </span>
              </h1>
            </div>
            
            <div className="slide-in-up" style={{animationDelay: '0.2s'}}>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                The fastest and most reliable video downloader. Download from YouTube, TikTok, 
                Instagram, and 100+ other platforms in HD quality.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-12 slide-in-up" style={{animationDelay: '0.4s'}}>
              <div className="modern-card p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="Paste video URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 h-12 text-base"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="h-12 px-8 btn-gradient"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {[
                { icon: <CheckCircle className="mr-2 h-4 w-4" />, text: "Free Forever", color: "text-green-500" },
                { icon: <CheckCircle className="mr-2 h-4 w-4" />, text: "No Registration", color: "text-blue-500" },
                { icon: <CheckCircle className="mr-2 h-4 w-4" />, text: "HD Quality", color: "text-purple-500" },
                { icon: <CheckCircle className="mr-2 h-4 w-4" />, text: "Fast Download", color: "text-orange-500" }
              ].map((item, index) => (
                <div key={index} className="modern-card px-4 py-2 flex items-center slide-in-up" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                  <span className={item.color}>{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Device Preview */}
            <div className="flex justify-center items-center gap-8 mt-20">
              <div className="slide-in-left">
                <div className="relative">
                  <div className="w-64 h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full gradient-primary rounded-2xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <Smartphone className="h-16 w-16 mx-auto mb-4 float-animation" />
                        <p className="font-semibold text-lg">Mobile Ready</p>
                        <p className="text-sm opacity-90">Download anywhere</p>
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
                    <div className="w-full h-full gradient-secondary rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <Monitor className="h-12 w-12 mx-auto mb-2 float-animation" style={{animationDelay: '1s'}} />
                        <p className="font-semibold">Desktop Power</p>
                        <p className="text-sm opacity-90">Full features</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center pulse-glow">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="modern-card p-6 hover-lift">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
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
                className="modern-card p-8 text-center hover-lift group"
              >
                <div className={`bg-gradient-to-br ${platform.bgColor} p-6 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <div className={`flex justify-center ${platform.color}`}>
                    {platform.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-4">{platform.users} active users</p>
                <div className="flex justify-center space-x-1">
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
      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Choose VideoGet?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best video downloading experience with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="modern-card p-6 text-center hover-lift group">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Three simple steps to download any video
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="modern-card p-8 hover-lift">
                  <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <div className="flex justify-center mb-4 text-muted-foreground">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Loved by Millions
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our community of happy users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Content Creator", message: "Best video downloader I've ever used! Super fast and reliable.", rating: 5, avatar: "S", color: "from-pink-500 to-purple-500" },
              { name: "Mike R.", role: "Social Media Manager", message: "Perfect for downloading client videos. Works every time!", rating: 5, avatar: "M", color: "from-purple-500 to-blue-500" },
              { name: "Lisa K.", role: "Student", message: "Love that it's free and works on all platforms. Highly recommend!", rating: 5, avatar: "L", color: "from-blue-500 to-cyan-500" }
            ].map((testimonial, index) => (
              <div key={index} className="modern-card p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {testimonial.avatar}
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
                <p className="text-muted-foreground italic leading-relaxed">"{testimonial.message}"</p>
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
          <div className="modern-card p-12 hover-lift pulse-glow">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join millions of users who trust VideoGet for their video downloading needs
            </p>
            <Link to="/download">
              <Button className="h-14 px-12 btn-gradient text-lg">
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
