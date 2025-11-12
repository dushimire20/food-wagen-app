import React from "react";
import { Facebook, Heart, Instagram, Mail, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className=" bottom-0 w-full bg-[#1c1c1c] text-gray-300 px-6 py-12 md:px-16 lg:px-24 food-footer ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">

        {/* Left Section — 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About us</a></li>
              <li><a href="#" className="hover:text-white transition">Team</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help & Support</a></li>
              <li><a href="#" className="hover:text-white transition">Partner with us</a></li>
              <li><a href="#" className="hover:text-white transition">Ride with us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Refund & Cancellation</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section — Follow & Subscribe */}
        <div className="lg:w-2/5">
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" aria-label="Instagram" className="hover:text-white transition">
              <Instagram />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition">
             <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition">
              <Twitter />
            </a>
          </div>

          <p className="text-sm mb-3">Receive exclusive offers in your mailbox</p>

          <form className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="food-input w-full bg-[#2b2b2b] text-sm pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="food-btn bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>All rights reserved © Your Company, 2021</p>
        <p className="mt-3 md:mt-0 flex gap-2 text-xl">
          Made with <span className="text-accent-400"> <Heart />  </span> by{" "}
          <a href="https://themewagon.com" className="hover:text-white font-medium">
            Themewagon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
