
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
  Star,
  Play,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [url, setUrl] = useState("");

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Download videos in seconds with our optimized servers"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "100% Safe",
      description: "No malware, no ads, completely secure downloads"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-400" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and platforms"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-400" />,
      title: "Multiple Platforms",
      description: "Support for YouTube, TikTok, Instagram, and more"
    }
  ];

  const stats = [
    { number: "10M+", label: "Videos Downloaded" },
    { number: "500K+", label: "Happy Users" },
    { number: "50+", label: "Supported Sites" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Download Videos
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Instantly
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in">
              The fastest and most reliable video downloader. Download from YouTube, TikTok, 
              Instagram, and 50+ other platforms in HD quality.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Paste video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
                />
                <Link to="/download">
                  <Button className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none w-full sm:w-auto">
                    <Download className="mr-2 h-5 w-5" />
                    Download
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-green-400" /> Free Forever</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-green-400" /> No Registration</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-green-400" /> HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose VideoGet?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We provide the best video downloading experience with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/80">
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
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70">
                  {item.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-white/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join millions of users who trust VideoGet for their video downloading needs
            </p>
            <Link to="/download">
              <Button className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none text-lg">
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
