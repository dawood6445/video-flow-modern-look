
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Youtube, Play, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContentData } from "@/hooks/useContentData";
import ContentSection from "@/components/ContentSection";
import FAQSection from "@/components/FAQSection";

interface VideoMedia {
  url: string;
  quality: string;
  extension: string;
  size: number;
  formattedSize: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
  chunked: boolean;
  cached: boolean;
}

interface VideoData {
  status: string;
  message: string;
  url: string;
  title: string;
  thumbnail: string;
  medias: VideoMedia[];
}

const YouTube = () => {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);
  const { toast } = useToast();
  const { data: contentData, loading: contentLoading } = useContentData('youtube');

  // Move the document metadata useEffect before any conditional returns
  useEffect(() => {
    if (contentData) {
      document.title = contentData.meta.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', contentData.meta.description);
      }
      
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', contentData.meta.keywords);
      }
    }
  }, [contentData]);

  useEffect(() => {
    const videoUrl = searchParams.get('video_url');
    if (videoUrl) {
      setUrl(videoUrl);
      handleAnalyze(videoUrl);
    }
  }, [searchParams]);

  const fetchVideoData = async (videoUrl: string): Promise<VideoData> => {
    const apiUrl = `https://api.latestvideodownloader.com/Home/GetVideo/?url=${encodeURIComponent(videoUrl)}&AccessKey=wECqRVdJmEBbHT94bY4s4w==&SourceID=9&VersionNo=1.111`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video data');
    }

    const data = await response.json();
    return data;
  };

  const handleAnalyze = async (videoUrl?: string) => {
    const urlToAnalyze = videoUrl || url;
    
    if (!urlToAnalyze) {
      toast({
        title: "Please enter a YouTube URL",
        description: "You need to provide a YouTube video URL to download",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setVideoInfo(null);
    
    try {
      const data = await fetchVideoData(urlToAnalyze);
      
      if (data.status === "404" || !data.title || !data.thumbnail || !Array.isArray(data.medias) || data.medias.length === 0) {
        toast({
          title: "Error",
          description: data.message || "The video URL could not be processed. Please try again with a valid URL.",
          variant: "destructive"
        });
        return;
      }

      setVideoInfo(data);
      toast({
        title: "Success!",
        description: "YouTube video data fetched successfully"
      });
      
    } catch (error) {
      console.error('Error fetching video data:', error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = (mediaUrl: string) => {
    window.open(mediaUrl, '_blank');
  };

  // Now handle loading state after all hooks have been called
  if (contentLoading || !contentData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 p-4 rounded-full">
              <Youtube className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            {contentData.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {contentData.hero.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Download YouTube Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isAnalyzing ? "Loading..." : "Download"}
                  </Button>
                </div>

                {/* Loading State */}
                {isAnalyzing && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Fetching Video Data...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we fetch the video details.</p>
                  </div>
                )}

                {/* Video Info Section */}
                {videoInfo && !isAnalyzing && (
                  <div className="space-y-6">
                    {/* Thumbnail and Title Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                      <img 
                        src={videoInfo.thumbnail} 
                        alt="Video Thumbnail"
                        className="w-full md:w-72 h-48 md:h-40 object-cover rounded border flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-foreground leading-tight">
                          {videoInfo.title}
                        </h3>
                      </div>
                    </div>

                    {/* Media Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                      {videoInfo.medias.map((media, index) => {
                        const sizeDisplay = media.formattedSize === "0 B" ? "-" : media.formattedSize;
                        
                        return (
                          <div 
                            key={index} 
                            className="bg-card border border-border rounded-lg p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                          >
                            <div className="space-y-3">
                              <p className="text-sm">
                                <strong>Quality:</strong> {media.quality}
                              </p>
                              <p className="text-sm">
                                <strong>Format:</strong> {media.extension.toUpperCase()}
                              </p>
                              <p className="text-sm">
                                <strong>Size:</strong> {sizeDisplay}
                              </p>
                              <Button
                                onClick={() => handleDownload(media.url)}
                                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2"
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{contentData.usage.title}:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    {contentData.usage.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-border mt-6">
              <CardHeader>
                <CardTitle>YouTube Download Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contentData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quality Options */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Available Qualities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { quality: "4K", resolution: "2160p", size: "~500MB", popular: false },
                  { quality: "Full HD", resolution: "1080p", size: "~200MB", popular: true },
                  { quality: "HD", resolution: "720p", size: "~100MB", popular: true },
                  { quality: "SD", resolution: "480p", size: "~50MB", popular: false },
                  { quality: "Audio Only", resolution: "MP3", size: "~5MB", popular: false }
                ].map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{option.quality}</span>
                        {option.popular && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{option.resolution}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{option.size}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="mr-2 h-4 w-4 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• For best quality, choose 1080p or higher</p>
                <p>• Use audio-only for music and podcasts</p>
                <p>• Check video duration before downloading large files</p>
                <p>• Ensure stable internet for uninterrupted downloads</p>
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Card className="glass-effect border-border border-yellow-500/20">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">
                  <strong className="text-yellow-500">Legal Notice:</strong> Only download videos you have permission to use. Respect copyright laws and YouTube's Terms of Service.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Section */}
        <ContentSection
          title={contentData.content.title}
          description={contentData.content.description}
          image={contentData.content.image}
          points={contentData.content.points}
        />

        {/* FAQ Section */}
        <FAQSection faqs={contentData.faq} />
      </div>
    </div>
  );
};

export default YouTube;
