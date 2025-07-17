
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, TrendingUp } from "lucide-react";

const AdSection = () => {
  const ads = [
    {
      title: "Premium Video Editor",
      description: "Edit your downloaded videos with professional tools",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop",
      badge: "Sponsored",
      ctaText: "Try Free",
      color: "bg-blue-500"
    },
    {
      title: "Cloud Storage Solution",
      description: "Store your videos safely in the cloud with 100GB free",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
      badge: "Ad",
      ctaText: "Get Started",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-12 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold text-muted-foreground">Recommended for You</h3>
          <span className="text-xs text-muted-foreground">Advertisement</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad, index) => (
            <Card key={index} className="glass-effect hover:bg-card/40 transition-all duration-300 hover-scale overflow-hidden">
              <div className="relative">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                />
                <span className={`absolute top-2 right-2 ${ad.color} text-white px-2 py-1 text-xs rounded-full`}>
                  {ad.badge}
                </span>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">{ad.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{ad.description}</p>
                <Button size="sm" variant="outline" className="w-full">
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
