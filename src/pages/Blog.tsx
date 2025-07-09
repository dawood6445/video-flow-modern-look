
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      slug: "how-to-download-youtube-videos-2024",
      title: "How to Download YouTube Videos in 2024: Complete Guide",
      excerpt: "Learn the best methods to download YouTube videos legally and safely in 2024. Step-by-step guide with tips and tricks.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop",
      category: "Tutorial",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      slug: "best-video-formats-for-downloading",
      title: "Best Video Formats for Downloading: MP4 vs WebM vs AVI",
      excerpt: "Compare different video formats and learn which one is best for your needs. Quality vs file size comparison.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop",
      category: "Guide",
      author: "Mike Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 3,
      slug: "tiktok-video-download-trends",
      title: "TikTok Video Download Trends: What's Popular in 2024",
      excerpt: "Discover the latest trends in TikTok video downloading and what content creators are sharing most.",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&h=300&fit=crop",
      category: "Trends",
      author: "Emma Davis",
      date: "2024-01-08",
      readTime: "4 min read",
      featured: false
    },
    {
      id: 4,
      slug: "legal-aspects-video-downloading",
      title: "Legal Aspects of Video Downloading: What You Need to Know",
      excerpt: "Understanding copyright laws and fair use when downloading videos from social media platforms.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
      category: "Legal",
      author: "David Wilson",
      date: "2024-01-05",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 5,
      slug: "instagram-reels-download-guide",
      title: "Instagram Reels Download Guide: Save Your Favorite Content",
      excerpt: "Complete guide to downloading Instagram Reels, Stories, and IGTV videos with our tools.",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=300&fit=crop",
      category: "Tutorial",
      author: "Lisa Martinez",
      date: "2024-01-03",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 6,
      slug: "video-quality-comparison-hd-4k",
      title: "Video Quality Comparison: HD vs 4K vs 8K Downloads",
      excerpt: "Understanding different video qualities and choosing the right resolution for your downloads.",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=300&fit=crop",
      category: "Technical",
      author: "Alex Thompson",
      date: "2024-01-01",
      readTime: "5 min read",
      featured: false
    }
  ];

  const categories = ["All", "Tutorial", "Guide", "Trends", "Legal", "Technical"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            Video Download Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights about video downloading, social media trends, and digital content
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-primary text-black" : 
                  "border-border hover:bg-muted"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Article</span>
            </div>
            <Card className="glass-effect border-border overflow-hidden hover:bg-card/40 transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="glass-effect border-border overflow-hidden hover:bg-card/40 transition-all duration-300 hover-scale">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 bg-primary/10 text-primary backdrop-blur-sm"
                >
                  {post.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold font-poppins line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
