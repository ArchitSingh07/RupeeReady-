interface FooterProps {
  onFeatures?: () => void;
  onPricing?: () => void;
  onAbout?: () => void;
  onHowItWorks?: () => void;
  onGetStarted?: () => void;
}

export function Footer({ onFeatures, onPricing, onAbout, onHowItWorks, onGetStarted }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                <span className="text-white">₹</span>
              </div>
              <span className="text-white">RupeeReady AI</span>
            </div>
            <p className="text-sm text-gray-400">Your proactive financial companion for India's gig economy.</p>
          </div>
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onFeatures} className="hover:text-teal-400 transition-colors">Features</button></li>
              <li><button onClick={onPricing} className="hover:text-teal-400 transition-colors">Pricing</button></li>
              <li><button onClick={onHowItWorks} className="hover:text-teal-400 transition-colors">How It Works</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onAbout} className="hover:text-teal-400 transition-colors">About Us</button></li>
              <li><button onClick={() => window.location.href = 'mailto:support@rupeeready.ai'} className="hover:text-teal-400 transition-colors">Contact</button></li>
              <li><button onClick={onGetStarted} className="hover:text-teal-400 transition-colors">Join Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 RupeeReady AI. Made with ❤️ for India's gig workers.</p>
        </div>
      </div>
    </footer>
  );
}
