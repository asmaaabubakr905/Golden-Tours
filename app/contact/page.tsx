'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, MessageCircle, Sparkles, ArrowRight, Globe, Shield, Heart } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `Hi! I'm ${formData.name}. 
    
Email: ${formData.email}
Phone: ${formData.phone}

Message: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`http://wa.me/201507000720?text=${encodedMessage}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      {/* Enhanced Header */}
      <section className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white py-20 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Let's Plan Your Adventure</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Ready to embark on your Egyptian adventure? Get in touch with us and let's plan 
              your perfect journey through the wonders of ancient Egypt.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>
              
              <div className="space-y-8">
                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                    <p className="text-lg text-gray-700 font-semibold">+20 150 700 0720</p>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse inline-block"></span>
                      Available 24/7 for your convenience
                    </div>
                  </div>
                </div>

                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-lg text-gray-700 font-semibold">info@goldentourstravel.com</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                    <p className="text-lg text-gray-700 font-semibold">Aswan, Egypt</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Globe className="w-4 h-4 mr-2" />
                      Serving all of Egypt
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                    <p className="text-lg text-gray-700 font-semibold">Monday - Sunday: 8:00 AM - 10:00 PM</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Shield className="w-4 h-4 mr-2" />
                      Emergency support available 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Social Media */}
              <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Heart className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-800">Follow Us</h3>
                </div>
                <div className="flex space-x-4">
                {/* <a
  href="https://www.facebook.com/share/1BqnbCHoTA/?mibextid=wwXIfr"
  target="_blank"
  rel="noopener noreferrer"
  className="group w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
>
  <Facebook className="w-7 h-7 text-white" />
</a> */}
<a
  href="https://www.instagram.com/goldentours.eg?igsh=MW52aHFqNGliMmh6Mg=="
  target="_blank"
  rel="noopener noreferrer"
  className="group w-14 h-14 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
>
  <Instagram className="w-7 h-7 text-white" />
</a>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-transparent rounded-full blur-2xl opacity-60"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-orange-600">Quick Response</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto"></div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-orange-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-orange-300"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-orange-300"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:border-orange-300 resize-none"
                        placeholder="Tell us about your travel plans, preferred dates, number of travelers, or any special requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-2xl text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-700 font-medium">
                        Your message will be sent directly to our WhatsApp for faster response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Phone className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium text-white">Instant Support</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            For urgent inquiries or last-minute bookings, contact us directly on WhatsApp for 
            immediate assistance from our travel experts.
          </p>
          
          <a
            href="http://wa.me/201507000720"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-3 bg-white text-orange-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
            <span>WhatsApp Us Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </section>
    </div>
  );
}
