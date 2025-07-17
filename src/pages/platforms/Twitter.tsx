
import { useEffect } from "react";
import { useContentData } from "@/hooks/useContentData";
import { Skeleton } from "@/components/ui/skeleton";
import { Twitter, CheckCircle, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentSection from "@/components/ContentSection";
import FAQSection from "@/components/FAQSection";
import AdSection from "@/components/AdSection";

const TwitterDownloader = () => {
  const { data, loading } = useContentData('twitter');
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.meta) {
      document.title = data.meta.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.meta.description);
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', data.meta.keywords);
      }
    }
  }, [data]);

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

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-20 w-full max-w-2xl mx-auto" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-blue-400/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-blue-400/10 border border-blue-400/20">
                <Twitter className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins mb-6 animate-fade-in">
              {data.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
              {data.hero.subtitle}
            </p>
            
            <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row gap-4 glass-effect p-2 rounded-lg">
                <Input
                  type="url"
                  placeholder="Paste Twitter video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                />
                <Button 
                  onClick={handleDownload}
                  className="h-12 px-8 bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-black font-medium w-full sm:w-auto"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="h-12 border-blue-400/30 hover:bg-blue-400/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline" 
                className="h-12 border-blue-400/30 hover:bg-blue-400/10"
              >
                <Music className="mr-2 h-4 w-4" />
                Extract Audio (MP3)
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> Free Download</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> All Formats</span>
              <span className="flex items-center"><CheckCircle className="mr-1 h-4 w-4 text-primary" /> HD Quality</span>
            </div>
          </div>
        </div>
      </section>

      <AdSection />

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Twitter Video Download Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional tools for downloading Twitter video content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.slice(0, 8).map((feature, index) => (
              <Card key={index} className="glass-effect hover:bg-card/40 transition-all duration-300 hover-scale border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium">
                    {feature}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContentSection 
            title={data.content.title}
            description={data.content.description}
            image={data.content.image}
            points={data.content.points}
          />
        </div>
      </section>

      {/* Usage Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              {data.usage.title}
            </h2>
            {data.usage.intro && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {data.usage.intro}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {data.usage.steps.map((step, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg border-border">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary to-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>

          {data.usage.tips && (
            <div className="glass-effect p-6 rounded-lg border-l-4 border-l-blue-400">
              <h3 className="font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-blue-400" />
                Pro Tips
              </h3>
              <ul className="space-y-2">
                {data.usage.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <AdSection />

      {/* Demo Section */}
      {data.demo && (
        <section className="py-20 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                {data.demo.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {data.demo.description}
              </p>
              <div className="relative max-w-4xl mx-auto">
                <img 
                  src={data.demo.image} 
                  alt={data.demo.title}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.demo.features_demo.map((feature, index) => (
                <Card key={index} className="glass-effect hover:bg-card/40 transition-all duration-300 hover-scale border-border">
                  <CardContent className="p-6">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
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
      )}

      {/* Detailed Content */}
      {data.detailed_content && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {data.detailed_content.sections.map((section, index) => (
                <div key={index} className="glass-effect p-8 rounded-2xl border-border">
                  <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={data.faq} />
        </div>
      </section>
    </div>
  );
};

export default TwitterDownloader;
