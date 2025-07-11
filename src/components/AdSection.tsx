
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, TrendingUp, Heart, Star } from "lucide-react";

const AdSection = () => {
  const ads = [
    {
      title: "Premium Video Editor",
      description: "Edit your downloaded videos with professional tools and amazing effects",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop",
      badge: "Sponsored",
      ctaText: "Try Free",
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
      icon: <Zap className="h-4 w-4" />
    },
    {
      title: "Cloud Storage Solution",
      description: "Store your videos safely in the cloud with 100GB free storage space",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
      badge: "Featured",
      ctaText: "Get Started",
      color: "bg-gradient-to-r from-sky-500 to-orange-500",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/50 dark:to-pink-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <h3 className="text-lg font-semibold gradient-text">Recommended for You</h3>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Star className="h-3 w-3" />
            <span>Advertisement</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad, index) => (
            <Card key={index} className="social-card hover-scale overflow-hidden group">
              <div className="relative">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <span className={`absolute top-3 right-3 ${ad.color} text-white px-3 py-1 text-xs rounded-full font-medium flex items-center space-x-1 shadow-lg`}>
                  {ad.icon}
                  <span>{ad.badge}</span>
                </span>
              </div>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {ad.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {ad.description}
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {ad.ctaText}
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdSection;
