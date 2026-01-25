'use client';

import { useState, useMemo, useEffect } from 'react';
import { Filter, Search, MapPin, Heart, ArrowRight, Sparkles } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { cities, getToursByCity } from '@/data/tours';
import { useSearchParams } from 'next/navigation';

export default function Tours() {
  const searchParams = useSearchParams();
  const getInitialCity = () => {
    if (!searchParams) return 'All';
    const city = searchParams.get('city');
    return city && cities.includes(city) ? city : 'All';
  };
  const [selectedCity, setSelectedCity] = useState(getInitialCity());
  useEffect(() => {
    if (!searchParams) return;
    const city = searchParams.get('city');
    if (city && cities.includes(city)) {
      setSelectedCity(city);
    }
  }, [searchParams]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    let tours = getToursByCity(selectedCity);
    if (searchQuery) {
      tours = tours.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return tours;
  }, [selectedCity, searchQuery]);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      {/* Enhanced Header with Animation */}
      <section className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white py-20 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Discover Ancient Wonders</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Egypt Tours & Experiences
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Choose from our carefully curated selection of tours across Egypt's most iconic destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedCity === 'All' ? 'All Tours' : `Tours in ${selectedCity}`}
                </h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">
                      {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} available
                    </span>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4 sm:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full sm:w-64 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-white/90 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full justify-center"
                aria-label="Toggle city filter"
                aria-expanded={isFilterOpen}
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter by City</span>
              </button>
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className="text-gray-600 font-medium flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Filter by City:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${selectedCity === city
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300'
                      }`}
                    aria-pressed={selectedCity === city}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="lg:hidden mt-6 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 transition-all duration-300">
              <div className="grid grid-cols-2 gap-3">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${selectedCity === city
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300'
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Tours Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTours.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="text-gray-300 text-8xl mb-4">🏺</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-orange-100 rounded-full opacity-50 animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No tours found</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                Try selecting a different city or check back later for new adventures.
              </p>
              <button
                onClick={() => { setSelectedCity('All'); setSearchQuery(''); }}
                className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                View All Tours
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Heart className="w-5 h-5 text-red-300" />
            <span className="text-sm font-medium text-white">Custom Experience</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            We can create custom tours tailored to your interests and schedule. Let us craft your perfect Egyptian adventure.
          </p>

          <a
            href="http://wa.me/201507000720"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-3 bg-white text-orange-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <span>Contact Us for Custom Tours</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </section>
    </div>
  );
}
