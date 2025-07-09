
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "User-Centric",
      description: "Everything we do is focused on providing the best user experience"
    },
    {
      icon: <Target className="h-8 w-8 text-green-400" />,
      title: "Reliability",
      description: "Consistent, fast downloads you can depend on every time"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      title: "Quality",
      description: "High-quality downloads with multiple format options"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      title: "Innovation",
      description: "Constantly improving with the latest technology"
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "10+ years in tech, passionate about making video downloading simple and accessible."
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in video processing and streaming technologies with 8 years of experience."
    },
    {
      name: "Mike Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer specializing in high-performance web applications."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About VideoGet
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We're on a mission to make video downloading simple, fast, and accessible to everyone. 
            Since 2020, we've helped millions of users download their favorite videos safely and efficiently.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                  <div className="space-y-4 text-white/80">
                    <p>
                      VideoGet was born out of frustration with existing video downloaders that were 
                      slow, unreliable, or filled with ads and malware. We believed there had to be 
                      a better way.
                    </p>
                    <p>
                      Founded in 2020 by a team of passionate developers, we set out to create the 
                      fastest, safest, and most user-friendly video downloader on the web. Today, 
                      we serve over 500,000 users worldwide.
                    </p>
                    <p>
                      Our commitment to excellence drives us to continuously improve our service, 
                      add support for new platforms, and maintain the highest standards of security 
                      and performance.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                    alt="Team working together"
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">10M+</div>
                      <div className="text-white/80 text-sm">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-white/80">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/70">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/80">
              The people behind VideoGet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover-scale">
                <CardContent className="p-6 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-300 mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8">
                VideoGet by the Numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
                  <div className="text-white/70">Videos Downloaded</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
                  <div className="text-white/70">Happy Users</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/70">Supported Platforms</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-white/70">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
