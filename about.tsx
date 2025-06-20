import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, MessageCircle, Star } from "lucide-react";

export default function About() {
  const founders = [
    {
      name: "Hunter Willier",
      title: "Chief Executive Officer",
      initials: "HW",
      photo: "/attached_assets/Hunter-W-headshot.jpg",
      bio: "Hunter leads SubConnect's strategic vision and oversees the company's growth initiatives. With extensive experience in construction management and technology, he drives innovation in contractor-subcontractor relationships."
    },
    {
      name: "Jackson Pretli",
      title: "Chief Operating Officer", 
      initials: "JP",
      photo: "/attached_assets/Jackson Pretli Headshot _1750194034713.jpg",
      bio: "Jackson manages day-to-day operations and ensures seamless platform functionality. His background in project management and process optimization keeps SubConnect running efficiently at scale."
    },
    {
      name: "Alex Snivley",
      title: "Chief Information Officer",
      initials: "AS",
      photo: "/attached_assets/snively2_1750194048423.JPEG",
      bio: "Alex leads technology development and platform architecture. With deep expertise in software engineering and data systems, he ensures SubConnect delivers cutting-edge matching technology."
    },
    {
      name: "Nana Oduro",
      title: "Chief Financial Officer",
      initials: "NO",
      photo: "/attached_assets/IMG_5927 (3)_1750193391546.JPG",
      bio: "Nana oversees financial strategy and business development. His expertise in finance and market analysis ensures SubConnect's sustainable growth and strategic partnerships."
    },
    {
      name: "Austin Smith",
      title: "Chief Marketing Officer",
      initials: "AS",
      photo: "/attached_assets/Austin S_1750261675914.jpg",
      bio: "Austin drives brand awareness and user acquisition strategies. His expertise in digital marketing and industry relations helps SubConnect connect with contractors and subcontractors nationwide."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About SubConnect</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Meet the leadership team driving innovation in contractor-subcontractor connections
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {founders.map((founder) => (
          <Card key={founder.name} className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              {founder.photo ? (
                <img 
                  src={founder.photo} 
                  alt={`${founder.name} headshot`}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-6"
                />
              ) : (
                <div className="bg-brand-blue text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {founder.initials}
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{founder.name}</h3>
              <p className="text-brand-blue font-medium mb-4">{founder.title}</p>
              <p className="text-slate-600 leading-relaxed">{founder.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Choose SubConnect Section */}
      <div className="mb-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SubConnect?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-brand-amber mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Comprehensive Vetting</h3>
            <p className="text-slate-300 text-sm">
              We thoroughly vet all subcontractors, verifying licenses, insurance, and work history before recommendations.
            </p>
          </div>
          <div className="text-center">
            <Search className="h-12 w-12 text-brand-amber mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-slate-300 text-sm">
              Our advanced algorithm analyzes skills, location, and experience to find the perfect subcontractor matches.
            </p>
          </div>
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-brand-amber mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
            <p className="text-slate-300 text-sm">
              Built-in messaging system for seamless project communication.
            </p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-brand-amber mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Rating System</h3>
            <p className="text-slate-300 text-sm">
              Build your reputation through our comprehensive rating and review system.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
