
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Facebook as FacebookIcon, CheckCircle, Video } from "lucide-react";
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

const Facebook = () => {
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
        title: "Please enter a Facebook URL",
        description: "You need to provide a Facebook video URL to download",
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
        description: "Facebook video data fetched successfully"
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
    "Download Facebook videos in HD",
    "Save Facebook Watch content",
    "Download private videos (with permission)",
    "Support for Facebook Live recordings",
    "Extract audio from videos",
    "Mobile and desktop compatible"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <FacebookIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Facebook Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download Facebook videos, Watch content, and Live recordings in high quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Download Facebook Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://facebook.com/watch?v=... or https://fb.watch/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
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
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <Video className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Regular Videos</h3>
                    <p className="text-xs text-muted-foreground">Personal and page videos</p>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <FacebookIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Facebook Watch</h3>
                    <p className="text-xs text-muted-foreground">Professional content</p>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How to download Facebook videos:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Find the Facebook video you want to download</li>
                    <li>Click on the video to open it</li>
                    <li>Copy the URL from your browser</li>
                    <li>Paste the URL in the field above</li>
                    <li>Click Download and choose your quality</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-border mt-6">
              <CardHeader>
                <CardTitle>Facebook Download Features</CardTitle>
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
            {/* Video Types */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Supported Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Facebook Videos", format: "MP4", description: "Regular posts" },
                  { type: "Facebook Watch", format: "MP4", description: "Professional content" },
                  { type: "Live Recordings", format: "MP4", description: "Saved live streams" },
                  { type: "Story Videos", format: "MP4", description: "24-hour stories" }
                ].map((option, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="font-medium text-sm">{option.type}</div>
                    <div className="text-xs text-muted-foreground">{option.format} • {option.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quality Options */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Available Qualities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• HD (720p) - Recommended</p>
                <p>• SD (480p) - Smaller file size</p>
                <p>• Audio Only (MP3)</p>
                <p>• Original quality (when available)</p>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="glass-effect border-border border-yellow-500/20">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">
                  <strong className="text-yellow-500">Important:</strong> Only download videos you have permission to use. Respect privacy settings and copyright laws.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facebook;
