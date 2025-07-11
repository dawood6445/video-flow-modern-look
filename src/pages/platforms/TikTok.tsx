
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Music, CheckCircle, Sparkles } from "lucide-react";
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

const TikTok = () => {
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
        title: "Please enter a TikTok URL",
        description: "You need to provide a TikTok video URL to download",
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
        description: "TikTok video data fetched successfully"
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
    "Download TikTok videos without watermark",
    "Save TikTok audio/music tracks",
    "Support for all video qualities",
    "Bulk download from profiles",
    "Mobile-friendly interface",
    "No app installation required"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full">
              <Music className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            TikTok Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download TikTok videos without watermark in HD quality. Save your favorite TikTok content for offline viewing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Download Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5 text-primary" />
                  Download TikTok Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://tiktok.com/@username/video/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={() => handleAnalyze()}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium"
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
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm py-2"
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

                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/20">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2 text-pink-400">No Watermark Downloads</h3>
                      <p className="text-sm text-muted-foreground">
                        Our TikTok downloader removes watermarks automatically, giving you clean videos perfect for sharing or editing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How to download TikTok videos:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Open TikTok and find the video you want</li>
                    <li>Tap "Share" and copy the link</li>
                    <li>Paste the link in the field above</li>
                    <li>Click Download to get your video</li>
                    <li>Choose between video or audio-only download</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-border mt-6">
              <CardHeader>
                <CardTitle>TikTok Download Features</CardTitle>
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
            {/* Download Options */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Download Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Video (No Watermark)", format: "MP4", quality: "HD", icon: "🎥" },
                  { type: "Video (Original)", format: "MP4", quality: "HD", icon: "📱" },
                  { type: "Audio Only", format: "MP3", quality: "High", icon: "🎵" },
                  { type: "Cover Image", format: "JPG", quality: "High", icon: "🖼️" }
                ].map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{option.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{option.type}</div>
                        <div className="text-xs text-muted-foreground">{option.format} • {option.quality}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-pink-500" />
                  TikTok Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Dance challenges and viral moves</p>
                <p>• Comedy skits and memes</p>
                <p>• Educational content and tutorials</p>
                <p>• Music covers and original sounds</p>
                <p>• Food recipes and cooking tips</p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass-effect border-border">
              <CardHeader>
                <CardTitle className="text-lg">Download Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Use "No Watermark" option for clean videos</p>
                <p>• Download audio for trending sounds</p>
                <p>• Save cover images for thumbnails</p>
                <p>• Check video privacy settings before downloading</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TikTok;
