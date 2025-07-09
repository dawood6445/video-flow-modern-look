
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Download, Play, FileVideo, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadPage = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "You need to provide a video URL to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setVideoInfo({
        title: "Amazing Video Tutorial - Learn React in 30 Minutes",
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
        duration: "30:45",
        views: "1.2M views",
        channel: "TechTutorials Pro",
        formats: [
          { quality: "1080p", size: "250 MB", format: "MP4" },
          { quality: "720p", size: "150 MB", format: "MP4" },
          { quality: "480p", size: "80 MB", format: "MP4" },
          { quality: "Audio Only", size: "15 MB", format: "MP3" }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDownload = (format) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast({
            title: "Download Complete!",
            description: `Video downloaded in ${format.quality} quality`
          });
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Video Downloader
          </h1>
          <p className="text-xl text-white/80">
            Paste your video URL below and download in your preferred quality
          </p>
        </div>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
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
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Video"}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-white/80">Analyzing video...</p>
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
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {videoInfo.title}
                    </h3>
                    <div className="space-y-1 text-white/70">
                      <p>Channel: {videoInfo.channel}</p>
                      <p>Duration: {videoInfo.duration}</p>
                      <p>{videoInfo.views}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoInfo.formats.map((format, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center text-white font-medium">
                              {format.format === 'MP3' ? (
                                <Image className="mr-2 h-4 w-4" />
                              ) : (
                                <FileVideo className="mr-2 h-4 w-4" />
                              )}
                              {format.quality}
                            </div>
                            <div className="text-sm text-white/60">
                              {format.size} • {format.format}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownload(format)}
                            disabled={isDownloading}
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {isDownloading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/80">
                      <span>Downloading...</span>
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
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Play className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Multiple Formats</h3>
              <p className="text-white/70 text-sm">Download in MP4, MP3, and more formats</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">High Quality</h3>
              <p className="text-white/70 text-sm">Up to 4K resolution available</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <FileVideo className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Fast Downloads</h3>
              <p className="text-white/70 text-sm">Lightning-fast download speeds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
