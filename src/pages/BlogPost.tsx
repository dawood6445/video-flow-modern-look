
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share, Bookmark } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from an API
  const post = {
    id: 1,
    slug: "how-to-download-youtube-videos-2024",
    title: "How to Download YouTube Videos in 2024: Complete Guide",
    content: `
      <p>Downloading YouTube videos has become increasingly important for content creators, educators, and everyday users who want to save their favorite videos for offline viewing. In this comprehensive guide, we'll walk you through the best methods to download YouTube videos safely and legally in 2024.</p>

      <h2>Why Download YouTube Videos?</h2>
      <p>There are several legitimate reasons why you might want to download YouTube videos:</p>
      <ul>
        <li>Offline viewing when you don't have internet access</li>
        <li>Creating educational content or presentations</li>
        <li>Backing up your own videos</li>
        <li>Research and analysis purposes</li>
      </ul>

      <h2>Legal Considerations</h2>
      <p>Before downloading any video, it's important to understand the legal implications. YouTube's Terms of Service generally prohibit downloading videos unless explicitly permitted by the content creator or YouTube itself. However, there are some exceptions:</p>
      <ul>
        <li>Videos you've uploaded yourself</li>
        <li>Videos with Creative Commons licenses</li>
        <li>Videos where the creator has explicitly allowed downloads</li>
      </ul>

      <h2>Best Methods to Download YouTube Videos</h2>
      
      <h3>1. Using VideoGet (Recommended)</h3>
      <p>VideoGet offers the easiest and most reliable way to download YouTube videos. Simply paste the video URL, select your preferred quality, and download instantly.</p>

      <h3>2. YouTube Premium Download Feature</h3>
      <p>YouTube Premium subscribers can download videos directly through the YouTube app for offline viewing within the app.</p>

      <h3>3. Browser Extensions</h3>
      <p>Several browser extensions are available, though their reliability can vary and they may violate YouTube's terms of service.</p>

      <h2>Choosing the Right Video Quality</h2>
      <p>When downloading videos, you'll typically have several quality options:</p>
      <ul>
        <li><strong>4K (2160p):</strong> Highest quality, largest file size</li>
        <li><strong>1080p HD:</strong> High quality, balanced file size</li>
        <li><strong>720p HD:</strong> Good quality, smaller file size</li>
        <li><strong>480p:</strong> Standard quality, very small file size</li>
      </ul>

      <h2>Tips for Safe Downloading</h2>
      <p>To ensure safe and legal downloading:</p>
      <ul>
        <li>Only download videos you have permission to use</li>
        <li>Use reputable download services like VideoGet</li>
        <li>Avoid suspicious websites that may contain malware</li>
        <li>Check the video's license before downloading</li>
        <li>Respect copyright laws in your jurisdiction</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Downloading YouTube videos can be a useful tool when done legally and responsibly. VideoGet provides a safe, fast, and reliable way to download videos from YouTube and many other platforms. Always remember to respect content creators' rights and follow applicable laws when downloading videos.</p>
    `,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    category: "Tutorial",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read"
  };

  const relatedPosts = [
    {
      title: "Best Video Formats for Downloading",
      slug: "best-video-formats-for-downloading",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop"
    },
    {
      title: "TikTok Video Download Trends",
      slug: "tiktok-video-download-trends",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="mb-12">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        <section className="border-t border-border pt-12">
          <h2 className="text-2xl font-bold font-poppins mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Card key={index} className="glass-effect border-border overflow-hidden hover:bg-card/40 transition-all duration-300 hover-scale">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 p-0">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
