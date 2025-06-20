import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Welcome from "@/pages/welcome";
import Applications from "@/pages/applications";
import About from "@/pages/about";
import HowItWorks from "@/pages/how-it-works";
import Support from "@/pages/support";
import Reviews from "@/pages/reviews";
import Contractors from "@/pages/contractors";
import Subcontractors from "@/pages/subcontractors";
import ApplicationReviews from "@/pages/application-reviews";
import Careers from "@/pages/careers";
import Billing from "@/pages/billing";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Welcome} />
          <Route path="/applications/contractors" component={Contractors} />
          <Route path="/applications/subcontractors" component={Subcontractors} />
          <Route path="/applications/reviews" component={ApplicationReviews} />
          <Route path="/applications" component={Applications} />
          <Route path="/about/careers" component={Careers} />
          <Route path="/about" component={About} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/support" component={Support} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/billing" component={Billing} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
