
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Youtube, Play, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YouTube = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const features = [
    "Download videos in 4K, 1080p, 720p, 480p",
    "Extract audio in MP3 format",
    "Download entire playlists",
    "Supports YouTube Shorts",
    "No registration required",
    "Fast download speeds"
  ];

  const handleDownload = () => {
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "You need to provide a YouTube URL to download",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processing video...",
      description: "Your YouTube video is being processed for download"
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 p-4 rounded-full">
              <Youtube className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            YouTube Video Downloader
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download YouTube videos in HD quality for free. Support for 4K, playlists, and audio extraction.
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
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">How to download YouTube videos:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Copy the YouTube video URL</li>
                    <li>Paste it in the input field above</li>
                    <li>Click the Download button</li>
                    <li>Choose your preferred quality</li>
                    <li>Save the video to your device</li>
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
      </div>
    </div>
  );
};

export default YouTube;
