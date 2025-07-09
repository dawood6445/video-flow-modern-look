
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Twitter as TwitterIcon, CheckCircle, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Twitter = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const features = [
    "Download Twitter videos in original quality",
    "Save Twitter GIFs as MP4",
    "Download Twitter Spaces recordings",
    "Support for tweet threads with videos",
    "Extract Twitter video thumbnails",
    "No rate limits or restrictions"
  ];

  const handleDownload = () => {
    if (!url) {
      toast({
        title: "Please enter a Twitter URL",
        description: "You need to provide a Twitter post URL to download",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processing Twitter content...",
      description: "Your Twitter video is being processed for download"
    });
  };

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
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

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
