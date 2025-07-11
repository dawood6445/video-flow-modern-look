
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Instagram as InstagramIcon, CheckCircle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const Instagram = () => {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);
  const { toast } = useToast();

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
        title: "Please enter an Instagram URL",
        description: "You need to provide an Instagram URL to download",
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
        description: "Instagram content data fetched successfully"
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

  const features = [
    "Download Instagram Reels in HD",
    "Save Instagram Stories",
    "Download IGTV videos",
    "Save Instagram photos",
    "Bulk download from profiles",
    "No login required"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 p-4 rounded-full">
              <InstagramIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Instagram Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download Instagram Reels, Stories, IGTV, and photos in high quality. Save your favorite Instagram content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Download Instagram Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://instagram.com/p/... or https://instagram.com/stories/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90 text-white font-medium"
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
                                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90 text-white text-sm py-2"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <Camera className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Reels</h3>
                    <p className="text-xs text-muted-foreground">Download Instagram Reels</p>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <InstagramIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Stories</h3>
                    <p className="text-xs text-muted-foreground">Save Stories content</p>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <Camera className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">IGTV</h3>
                    <p className="text-xs text-muted-foreground">Download IGTV videos</p>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How to download Instagram content:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Open Instagram and find the content</li>
                    <li>Tap the three dots menu and "Copy Link"</li>
                    <li>Paste the link in the field above</li>
                    <li>Click Download to save the content</li>
                    <li>Choose your preferred format and quality</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-border mt-6">
              <CardHeader>
                <CardTitle>Instagram Download Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
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
            {/* Content Types */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Supported Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Instagram Reels", format: "MP4", popular: true },
                  { type: "Instagram Stories", format: "MP4/JPG", popular: true },
                  { type: "IGTV Videos", format: "MP4", popular: false },
                  { type: "Instagram Photos", format: "JPG", popular: true },
                  { type: "Instagram Highlights", format: "MP4/JPG", popular: false }
                ].map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{option.type}</span>
                        {option.popular && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{option.format}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quality Options */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quality Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>• Full HD (1080p)</span>
                  <span className="text-primary">Recommended</span>
                </div>
                <p>• HD (720p)</p>
                <p>• Standard (480p)</p>
                <p>• Original resolution</p>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="glass-effect border-border border-blue-500/20">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">
                  <strong className="text-blue-400">Privacy:</strong> We only download public content. Private accounts and content require appropriate permissions.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
