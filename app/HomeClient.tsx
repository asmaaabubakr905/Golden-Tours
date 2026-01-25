'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Users, Award, MapPin, Sparkles, Calendar, Clock } from 'lucide-react';
import { getSpecialTrip, getTourSlug } from '@/data/tours';
import Testimonials from '@/components/Testimonials';
import FeaturedTours from '@/components/FeaturedTours';
import { getImageUrl } from '@/utils/imageUtils';
import nubaLuxuryEscapeImg2 from '@/src/assets/nuba luxury escape2.jpeg';
import nubaLuxuryEscapeImg3 from '@/src/assets/nuba luxury escape3.jfif';
import nubaLuxuryEscapeImg4 from '@/src/assets/nuba luxury escape4.jfif';

export default function HomeClient() {
  const specialTrip = getSpecialTrip();
  const [currentImage, setCurrentImage] = useState(specialTrip ? getImageUrl(specialTrip.image) : '');

  useEffect(() => {
    if (!specialTrip) return;
    const images = [specialTrip.image, nubaLuxuryEscapeImg2, nubaLuxuryEscapeImg3, nubaLuxuryEscapeImg4];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(getImageUrl(images[index]));
    }, 5000);
    // Set initial image
    setCurrentImage(getImageUrl(images[0]));
    return () => clearInterval(interval);
  }, [specialTrip]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-orange-500 to-orange-600 flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover the Magic of
              <span className="block text-orange-300">Ancient Egypt</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Embark on unforgettable journeys through Cairo, Alexandria, Luxor, and Aswan.
              Experience the wonders of pharaohs, temples, and timeless treasures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tours"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
              >
                Explore Tours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/tours"
                rel="noopener noreferrer"
                className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Trip Section - Nuba Experience */}
      {specialTrip && (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-lg">Special Trip</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Nuba Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A unique Nubian experience on a traditional Dahabya - Discover authentic Nubian culture
              </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:scale-[1.01]">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0 lg:items-center">
                {/* Image Section */}
                <div className="relative h-96 lg:h-full min-h-[400px] lg:min-h-[480px] overflow-hidden">
                  <img
                    src={currentImage}
                    alt={specialTrip.title}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{specialTrip.rating} Rating</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Special Experience</span>
                    </div>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl shadow-xl backdrop-blur-sm">
                    <div className="text-sm md:text-xl font-bold tracking-tight">
                      {specialTrip.price.toLocaleString()} <span className="text-xs md:text-sm font-semibold">EGP</span>
                      <span className="text-xs md:text-sm font-normal opacity-90 block mt-0.5">/person</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:px-14 lg:py-10 flex flex-col gap-8 lg:gap-10 lg:max-w-xl lg:mx-auto">
                  <div className="space-y-4 lg:space-y-5">
                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                      {specialTrip.title}
                    </h3>
                  </div>

                  {/* Tour Details */}
                  <div className="grid grid-cols-2 gap-4 lg:gap-5">
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-bold text-gray-800">{specialTrip.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Max Guests</div>
                        <div className="font-bold text-gray-800">{specialTrip.maxGuests} people</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="font-bold text-gray-800">{specialTrip.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-xl">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Star className="w-5 h-5 text-white fill-current" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Rating</div>
                        <div className="font-bold text-gray-800">{specialTrip.rating}/5</div>
                      </div>
                    </div>
                  </div>
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-5">
                    <Link
                      href={`/tour/${getTourSlug(specialTrip)}`}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                      href={`https://wa.me/201507000720?text=I'm interested in booking the ${specialTrip.title} tour. Can you provide more details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Tours Section */}
      <FeaturedTours />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Golden  Tours?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional travel experiences that combine comfort,
              authenticity, and expert knowledge of Egypt's rich heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Guides</h3>
              <p className="text-gray-600">
                Our certified Egyptologists bring ancient history to life with their deep knowledge
                and passion for Egypt's incredible heritage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Premium Experience</h3>
              <p className="text-gray-600">
                We ensure comfort and quality in every aspect of your journey, from transportation
                to accommodation and dining experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Trusted Service</h3>
              <p className="text-gray-600">
                With over 15 years of experience and thousands of satisfied customers,
                we have built a reputation for reliability and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Egyptian Adventure?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of Egypt with Golden tours Tours.
            Your unforgettable journey awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-100 transition-colors inline-flex items-center justify-center shadow"
            >
              Browse Tours
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="http://wa.me/201507000720"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-colors inline-flex items-center justify-center shadow"
            >
              Contact Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
