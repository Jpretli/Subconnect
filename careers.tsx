import { Briefcase, MapPin, Clock, DollarSign, Users, Heart, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Careers() {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / Columbus, OH",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      description: "Join our engineering team to build the next generation of our contractor-subcontractor platform. You'll work on both frontend React applications and backend Node.js services.",
      requirements: [
        "5+ years of experience with React and Node.js",
        "Experience with PostgreSQL and cloud platforms",
        "Strong understanding of API design and microservices",
        "Experience with construction or trades industry is a plus"
      ],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Columbus, OH",
      type: "Full-time",
      salary: "$90,000 - $130,000",
      description: "Lead product strategy and development for our marketplace platform. Work closely with engineering, design, and business teams to deliver features that contractors and subcontractors love.",
      requirements: [
        "3+ years of product management experience",
        "Experience with B2B marketplace platforms",
        "Strong analytical and data-driven decision making",
        "Excellent communication and stakeholder management skills"
      ],
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Columbus, OH",
      type: "Full-time",
      salary: "$65,000 - $85,000",
      description: "Help our contractors and subcontractors succeed on the platform. Provide onboarding, support, and ensure high customer satisfaction and retention.",
      requirements: [
        "2+ years in customer success or account management",
        "Experience in construction, trades, or B2B services",
        "Strong problem-solving and communication skills",
        "Ability to work with diverse stakeholders"
      ],
      posted: "3 days ago"
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote / Columbus, OH",
      type: "Full-time",
      salary: "$55,000 - $75,000",
      description: "Drive growth through digital marketing campaigns, content creation, and community engagement. Help us reach contractors and subcontractors across Ohio and beyond.",
      requirements: [
        "2+ years in digital marketing",
        "Experience with SEO, SEM, and social media marketing",
        "Content creation and copywriting skills",
        "Analytics and performance tracking experience"
      ],
      posted: "5 days ago"
    },
    {
      id: 5,
      title: "Business Development Representative",
      department: "Sales",
      location: "Columbus, OH",
      type: "Full-time",
      salary: "$45,000 - $65,000 + Commission",
      description: "Generate new business opportunities by connecting with contractors and subcontractors. Build relationships and help grow our marketplace community.",
      requirements: [
        "1+ years in sales or business development",
        "Interest in construction and trades industry",
        "Strong communication and relationship building skills",
        "Self-motivated and goal-oriented"
      ],
      posted: "1 week ago"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness programs"
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and unlimited PTO policy"
    },
    {
      icon: Zap,
      title: "Growth & Development",
      description: "Learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: Target,
      title: "Equity & Ownership",
      description: "Stock options and profit sharing to align with company success"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly seek better ways to connect skilled professionals and create value in the trades industry."
    },
    {
      title: "Integrity",
      description: "We build trust through transparent practices, honest communication, and reliable service."
    },
    {
      title: "Community",
      description: "We believe in supporting the skilled trades community and helping professionals thrive."
    },
    {
      title: "Excellence",
      description: "We strive for quality in everything we do, from our platform to our customer relationships."
    }
  ];

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Engineering: "bg-blue-100 text-blue-800",
      Product: "bg-purple-100 text-purple-800",
      "Customer Success": "bg-green-100 text-green-800",
      Marketing: "bg-orange-100 text-orange-800",
      Sales: "bg-red-100 text-red-800",
    };
    return colors[department] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Briefcase className="h-12 w-12 text-brand-blue mr-4" />
          <h1 className="text-4xl font-bold text-slate-900">Join Our Team</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Help us revolutionize how contractors and subcontractors connect and collaborate. 
          We're building the future of the skilled trades industry.
        </p>
        <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>50+ Team Members</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Columbus, OH + Remote</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span>Fast Growing Startup</span>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Benefits & Perks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <benefit.icon className="h-10 w-10 text-brand-blue mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Open Positions</h2>
        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <Badge className={getDepartmentColor(job.department)} variant="secondary">
                        {job.department}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-2">Posted {job.posted}</p>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{job.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-brand-blue to-blue-600 text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Perfect Role?</h2>
            <p className="text-xl mb-6 opacity-90">
              We're always looking for talented people to join our mission. 
              Send us your resume and let's talk about opportunities.
            </p>
            <Button variant="secondary" size="lg">
              Send Resume
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}