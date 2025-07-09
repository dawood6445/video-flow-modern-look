
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Facebook as FacebookIcon, CheckCircle, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Facebook = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const features = [
    "Download Facebook videos in HD",
    "Save Facebook Watch content",
    "Download private videos (with permission)",
    "Support for Facebook Live recordings",
    "Extract audio from videos",
    "Mobile and desktop compatible"
  ];

  const handleDownload = () => {
    if (!url) {
      toast({
        title: "Please enter a Facebook URL",
        description: "You need to provide a Facebook video URL to download",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processing Facebook video...",
      description: "Your Facebook video is being processed for download"
    });
  };

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
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

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
