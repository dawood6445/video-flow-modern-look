import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Play, FileVideo, Image, ExternalLink } from "lucide-react";
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

const DownloadPage = () => {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
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
        title: "Please enter a URL",
        description: "You need to provide a video URL to analyze",
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
        description: "Video data fetched successfully"
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

  const handleDownload = (media: VideoMedia) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast({
            title: "Download Started!",
            description: `Video download initiated in ${media.quality} quality`
          });
          // Open the download URL in a new tab
          window.open(media.url, '_blank');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground">
            Paste your video URL below and download in your preferred quality
          </p>
        </div>

        <Card className="glass-effect border-border mb-8">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Download Video
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
                className="flex-1 bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black border-none"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Video"}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing video...</p>
              </div>
            )}

            {videoInfo && !isAnalyzing && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={videoInfo.thumbnail} 
                    alt="Video thumbnail"
                    className="w-full md:w-64 h-36 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {videoInfo.title}
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Status: {videoInfo.status}</p>
                      <p>Available formats: {videoInfo.medias.length}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoInfo.medias.map((media, index) => (
                    <Card key={index} className="glass-effect border-border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center text-foreground font-medium">
                              {media.extension === 'mp3' ? (
                                <Image className="mr-2 h-4 w-4" />
                              ) : (
                                <FileVideo className="mr-2 h-4 w-4" />
                              )}
                              {media.quality}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {media.formattedSize} • {media.extension.toUpperCase()}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {media.videoAvailable ? "Video" : ""} 
                              {media.videoAvailable && media.audioAvailable ? " + " : ""}
                              {media.audioAvailable ? "Audio" : ""}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownload(media)}
                            disabled={isDownloading}
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {isDownloading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Preparing download...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <Progress value={downloadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-effect border-border">
            <CardContent className="p-6 text-center">
              <Play className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Multiple Formats</h3>
              <p className="text-muted-foreground text-sm">Download in MP4, MP3, and more formats</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">High Quality</h3>
              <p className="text-muted-foreground text-sm">Up to 4K resolution available</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardContent className="p-6 text-center">
              <FileVideo className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast Downloads</h3>
              <p className="text-muted-foreground text-sm">Lightning-fast download speeds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
