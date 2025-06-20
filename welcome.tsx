import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Briefcase, Users, ServerCog, Headphones, Handshake, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Welcome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Construction action shots showcasing workers in real construction environments
  const constructionWorkerImages = [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=900&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=900&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=900&h=900&fit=crop",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=900&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % constructionWorkerImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [constructionWorkerImages.length]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-blue to-brand-deep text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="relative w-[900px] h-[900px] mx-auto mb-4 rounded-xl overflow-hidden border-4 border-white shadow-2xl">
              {constructionWorkerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Construction Worker ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {constructionWorkerImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-3 text-white">SubConnect</h1>
            <p className="text-3xl font-light mb-3 text-white">Welcome</p>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Professional matchmaking platform connecting contractors with skilled subcontractors for seamless project collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Explore Our Platform</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Applications Card */}
          <Link href="/applications">
            <Card className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Applications</h3>
                <p className="text-slate-600 mb-4">Post jobs as a contractor or browse opportunities as a subcontractor</p>
                <div className="text-brand-blue font-medium">
                  Get Started <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* About Card */}
          <Link href="/about">
            <Card className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="bg-brand-amber text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">About</h3>
                <p className="text-slate-600 mb-4">Meet our leadership team and learn about our mission</p>
                <div className="text-brand-blue font-medium">
                  Learn More <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* How It Works Card */}
          <Link href="/how-it-works">
            <Card className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <ServerCog className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">How It Works</h3>
                <p className="text-slate-600 mb-4">Understand our simple process for connecting professionals</p>
                <div className="text-brand-blue font-medium">
                  Discover <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Support Card */}
          <Link href="/support">
            <Card className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Headphones className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Support</h3>
                <p className="text-slate-600 mb-4">Get help and find answers to your questions</p>
                <div className="text-brand-blue font-medium">
                  Get Help <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Choose SubConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Trusted Connections</h3>
              <p className="text-slate-600">Build reliable professional relationships with verified contractors and subcontractors</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-brand-amber" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Fast Matching</h3>
              <p className="text-slate-600">Our intelligent platform quickly connects the right professionals for each project</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Secure Platform</h3>
              <p className="text-slate-600">Professional-grade security ensures your business information stays protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
