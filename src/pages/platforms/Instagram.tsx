
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Instagram as InstagramIcon, CheckCircle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Instagram = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const features = [
    "Download Instagram Reels in HD",
    "Save Instagram Stories",
    "Download IGTV videos",
    "Save Instagram photos",
    "Bulk download from profiles",
    "No login required"
  ];

  const handleDownload = () => {
    if (!url) {
      toast({
        title: "Please enter an Instagram URL",
        description: "You need to provide an Instagram URL to download",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processing Instagram content...",
      description: "Your Instagram content is being processed for download"
    });
  };

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
                    className="flex-1 bg-background/50 border-border"
                  />
                  <Button 
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90 text-white font-medium"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

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
