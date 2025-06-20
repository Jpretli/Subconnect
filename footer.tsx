import { Link } from "wouter";
import logoPath from "@assets/SubConnect_1750191046422.png";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={logoPath} 
                alt="SubConnect Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-2xl font-bold">SubConnect</span>
            </div>
            <p className="text-slate-400">
              Professional matchmaking platform connecting contractors with skilled subcontractors.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/applications">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">Applications</span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                    Pricing
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/about">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/about/careers">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                    Careers
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/support">
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">Help Center</span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="mailto:support@subconnect.com" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 SubConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
