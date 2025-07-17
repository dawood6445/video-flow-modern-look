
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ContentPoint {
  title: string;
  description: string;
}

interface ContentSectionProps {
  title: string;
  description: string;
  image: string;
  points: ContentPoint[];
}

const ContentSection = ({ title, description, image, points }: ContentSectionProps) => {
  return (
    <Card className="glass-effect border-border">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
            
            <div className="space-y-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-green-400/20 rounded-2xl p-8">
              <img 
                src={image} 
                alt={title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSection;
