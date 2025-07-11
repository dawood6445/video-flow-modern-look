
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Twitter as TwitterIcon, CheckCircle, MessageCircle } from "lucide-react";
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

const Twitter = () => {
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
        title: "Please enter a Twitter URL",
        description: "You need to provide a Twitter post URL to download",
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
        description: "Twitter content data fetched successfully"
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
    "Download Twitter videos in original quality",
    "Save Twitter GIFs as MP4",
    "Download Twitter Spaces recordings",
    "Support for tweet threads with videos",
    "Extract Twitter video thumbnails",
    "No rate limits or restrictions"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-400 p-4 rounded-full">
              <TwitterIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Twitter Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download Twitter videos, GIFs, and Spaces recordings in high quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Download Twitter Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://twitter.com/username/status/... or https://x.com/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-medium"
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
                                className="w-full bg-blue-400 hover:bg-blue-500 text-white text-sm py-2"
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
                    <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Tweet Videos</h3>
                    <p className="text-xs text-muted-foreground">Videos from tweets</p>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <TwitterIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-medium text-sm">Twitter Spaces</h3>
                    <p className="text-xs text-muted-foreground">Audio recordings</p>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How to download Twitter videos:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Find the tweet with the video you want</li>
                    <li>Click on the tweet to open it</li>
                    <li>Copy the URL from your browser</li>
                    <li>Paste the URL in the field above</li>
                    <li>Click Download to save the video</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-border mt-6">
              <CardHeader>
                <CardTitle>Twitter Download Features</CardTitle>
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
                  { type: "Twitter Videos", format: "MP4", size: "Up to 2.2GB" },
                  { type: "Twitter GIFs", format: "MP4", size: "Various" },
                  { type: "Twitter Spaces", format: "MP3", size: "Audio only" },
                  { type: "Video Thumbnails", format: "JPG", size: "High-res" }
                ].map((option, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <div className="font-medium text-sm">{option.type}</div>
                    <div className="text-xs text-muted-foreground">{option.format} • {option.size}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quality Info */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quality Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Original quality preserved</p>
                <p>• Up to 1080p for most videos</p>
                <p>• GIFs converted to MP4</p>
                <p>• Audio quality maintained</p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Twitter Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Works with both twitter.com and x.com URLs</p>
                <p>• Download GIFs as looping MP4 files</p>
                <p>• Save viral content before it gets deleted</p>
                <p>• Extract high-quality thumbnails</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Twitter;
