
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const handleDownload = (mediaUrl: string) => {
    window.open(mediaUrl, '_blank');
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

        {/* Main Container matching WordPress style */}
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 mb-8">
          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="url"
              placeholder="Paste your video link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1 h-12 border-2 border-primary bg-background text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
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

          {/* Video Info Section - matching WordPress layout */}
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

              {/* Media Cards Container - matching WordPress styling */}
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
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-2"
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
        </div>

        {/* Feature Cards */}
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
