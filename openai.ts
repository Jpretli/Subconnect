// Intelligent response system for SubConnect platform

export async function getChatResponse(userMessage: string): Promise<string> {
  // Smart response system for SubConnect platform
  console.log("Received message:", JSON.stringify(userMessage));
  const message = userMessage.toLowerCase();
  console.log("Lowercased message:", JSON.stringify(message));
  
  // Platform overview questions
  if (message.includes('how') && (message.includes('work') || message.includes('subconnect'))) {
    return "SubConnect is a matchmaking platform that connects contractors with qualified subcontractors. We handle the entire vetting process - from background checks to license verification - so contractors get pre-screened professionals for their projects. Simply post your job requirements, and we'll recommend the best matches from our vetted network.";
  }
  
  // Contractor-specific questions
  if (message.includes('contractor') || message.includes('post') && message.includes('job')) {
    return "As a contractor, you can post detailed job requirements including location, timeline, budget, and required certifications. Our team will review your posting and recommend pre-vetted subcontractors who match your criteria. All recommended professionals have passed our comprehensive screening process including background checks and skill verification.";
  }
  
  // Subcontractor questions
  if (message.includes('subcontractor') || message.includes('apply') || message.includes('profile')) {
    return "Subcontractors can create detailed profiles showcasing their experience, certifications, and service areas. Our vetting team conducts thorough background checks, license verification, and skill assessments. Once approved, you'll receive job opportunities that match your expertise and location preferences.";
  }
  
  // Vetting process questions
  if (message.includes('vet') || message.includes('screen') || message.includes('background')) {
    return "Our comprehensive vetting process includes background checks, license verification, insurance validation, and skill assessments. We verify all certifications and conduct reference checks to ensure only qualified professionals join our network. This thorough screening saves contractors time and reduces project risks.";
  }
  
  // Pricing or cost questions - check for exact word matches too
  if (message.includes('cost') || message.includes('price') || message.includes('pricing') || 
      message.includes('fee') || message.includes('how much') || message.includes('subscription') || 
      message.includes('plan') || message.includes('rate') || message === 'pricing' ||
      message.trim() === 'pricing' || message.includes('what about pricing')) {
    return "Our pricing is transparent: Contractors pay a 5% commission on completed projects plus $25/month. Subcontractors pay $50/month with no commission fees. Students get a special rate of $25/month with no commission. You can see more details on our website. For custom enterprise pricing or specific billing questions, please contact us at support@subconnect.com or call 1-800-SUBCONNECT.";
  }
  
  // Location/service area questions
  if (message.includes('location') || message.includes('area') || message.includes('columbus') || message.includes('ohio')) {
    return "We primarily serve the Columbus, Ohio metropolitan area and surrounding regions. Our network includes professionals across all major trades: electrical, plumbing, HVAC, carpentry, roofing, and general construction. We're actively expanding to serve additional markets.";
  }
  
  // About the company/founders
  if (message.includes('founder') || message.includes('team') || message.includes('company') || message.includes('about')) {
    return "SubConnect was founded by a team of construction and technology experts: Hunter Willier (CEO), Jackson Pretli (COO), Alex Snivley (CIO), Nana Oduro (CFO), and Austin Smith (CMO). You can learn more about our team and mission on our About page. For partnership inquiries or detailed company information, contact us at support@subconnect.com.";
  }
  
  // Complex support escalation triggers
  if (message.includes('billing') || message.includes('payment') || message.includes('invoice') || 
      message.includes('dispute') || message.includes('legal') || message.includes('contract') ||
      (message.includes('technical') && message.includes('issue')) || message.includes('bug') || message.includes('error') ||
      (message.includes('account') && (message.includes('locked') || message.includes('suspended'))) ||
      message.includes('urgent') || message.includes('emergency') || message.includes('refund') ||
      message.includes('charge') || message.includes('unauthorized')) {
    return "This appears to be a complex issue that requires personal attention from our support team. Please contact us directly: Email: support@subconnect.com or Phone: 1-800-SUBCONNECT. For urgent matters, calling is the fastest way to reach our specialists who can provide detailed assistance.";
  }
  
  // General support questions
  if (message.includes('help') || message.includes('support') || message.includes('contact')) {
    return "I'm here to help with questions about SubConnect's platform features, getting started, and general information. For complex account issues, billing questions, or technical problems, our human support team at support@subconnect.com or 1-800-SUBCONNECT can provide specialized assistance.";
  }
  
  // Getting started questions
  if (message.includes('start') || message.includes('begin') || message.includes('sign up')) {
    return "Getting started is easy! Visit our Applications page to begin the process. Contractors can post their first job requirements, while subcontractors can create their professional profiles. Our team will guide you through the verification process and help you get the most out of the platform.";
  }
  
  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm here to help you learn about SubConnect's contractor-subcontractor matching platform. I can answer questions about how our vetting process works, getting started, or any other aspect of our service. What would you like to know?";
  }
  
  // Default response for unmatched questions - direct to contact for info not on website
  return "I can help with information available on our website like pricing, how our platform works, our team, and service areas. For questions not covered on the site, or for personalized assistance, please contact us directly: Email: support@subconnect.com or Phone: 1-800-SUBCONNECT. What would you like to know about SubConnect?";
}