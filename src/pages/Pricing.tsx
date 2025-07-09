
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      features: [
        "5 downloads per day",
        "720p max quality",
        "Basic formats (MP4, MP3)",
        "Standard download speed",
        "Ad-supported",
      ],
      limitations: [
        "Daily download limit",
        "Quality restrictions",
        "Ads between downloads"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      features: [
        "Unlimited downloads",
        "Up to 4K quality",
        "All formats available",
        "Fast download speeds",
        "No ads",
        "Batch downloads",
        "Download history",
        "Priority support"
      ],
      limitations: [],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "per month",
      icon: <Crown className="h-6 w-6 text-gold-400" />,
      features: [
        "Everything in Pro",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Team management",
        "Usage analytics",
        "White-label options"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
    },
    {
      question: "Is there a free trial for Pro plan?",
      answer: "Yes, we offer a 7-day free trial for the Pro plan. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various other payment methods depending on your region."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Start with our free plan or upgrade to Pro for unlimited downloads 
            and premium features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-white/10 border-white/20 backdrop-blur-sm hover-scale ${
                plan.popular ? 'border-purple-500/50 ring-2 ring-purple-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-white text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  } text-white`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Feature Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-4 text-white font-medium">Feature</th>
                      <th className="text-center py-4 px-4 text-white font-medium">Free</th>
                      <th className="text-center py-4 px-4 text-white font-medium">Pro</th>
                      <th className="text-center py-4 px-4 text-white font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Daily Downloads</td>
                      <td className="text-center py-3 px-4">5</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Max Quality</td>
                      <td className="text-center py-3 px-4">720p</td>
                      <td className="text-center py-3 px-4">4K</td>
                      <td className="text-center py-3 px-4">4K</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">Batch Downloads</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4">API Access</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✗</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Support</td>
                      <td className="text-center py-3 px-4">Community</td>
                      <td className="text-center py-3 px-4">Priority</td>
                      <td className="text-center py-3 px-4">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/80">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/80">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
