import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Support() {
  const handleOpenChat = () => {
    // Dispatch a custom event to open the chat widget
    window.dispatchEvent(new CustomEvent('openChatWidget'));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Support Center</h1>
        <p className="text-xl text-slate-600">Get help and find answers to your questions</p>
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Smart Support System</h2>
          <p className="text-slate-600">
            Our AI assistant handles common questions instantly, filtering out routine inquiries so our email and phone support 
            can focus on complex issues that need personal attention. Start with the AI assistant for the fastest response!
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 text-center">
            <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Email Support</h3>
            <p className="text-slate-600 mb-4">Get detailed help via email</p>
            <a 
              href="mailto:support@subconnect.com" 
              className="text-brand-blue hover:text-brand-deep font-medium"
            >
              support@subconnect.com
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 text-center">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Phone Support</h3>
            <p className="text-slate-600 mb-4">Speak with our support team</p>
            <a 
              href="tel:1-800-SUBCONNECT" 
              className="text-brand-blue hover:text-brand-deep font-medium"
            >
              1-800-SUBCONNECT
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 text-center">
            <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">AI Assistant</h3>
            <p className="text-slate-600 mb-4">Get instant answers to common questions</p>
            <Button 
              onClick={handleOpenChat}
              variant="link" 
              className="text-brand-blue hover:text-brand-deep font-medium p-0"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                How do I get started as a contractor?
              </h3>
              <p className="text-slate-600">
                Simply navigate to the Applications tab, select "I'm a Contractor," and start posting your first job. 
                Make sure to provide detailed project information to attract qualified subcontractors.
              </p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What information should I include in my subcontractor profile?
              </h3>
              <p className="text-slate-600">
                Include your company name, primary trade, years of experience, service area, and any relevant certifications or licenses. 
                The more complete your profile, the better your chances of being selected for projects.
              </p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What are SubConnect's fees?
              </h3>
              <p className="text-slate-600">
                <strong>Contractors:</strong> 5% commission on project earnings + $25/month ($250/year)<br/>
                <strong>Subcontractors:</strong> $50/month ($500/year) with no commission<br/>
                <strong>Student Subcontractors:</strong> $25/month ($250/year) with no commission<br/>
                All users pay a one-time onboarding fee when joining the platform.
              </p>
            </div>
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                How does the matching system work?
              </h3>
              <p className="text-slate-600">
                Our intelligent matching system considers factors like trade specialization, location, experience level, 
                availability, and past project success rates to connect contractors with the most suitable subcontractors.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What if I have issues with a project or user?
              </h3>
              <p className="text-slate-600">
                Contact our support team immediately through any of the methods above. We have dedicated staff to help resolve disputes 
                and ensure all users maintain professional standards on our platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
