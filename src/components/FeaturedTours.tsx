import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Users, ArrowRight, Share2, Calendar, Award, Check } from 'lucide-react';
import { getToursByCity, Tour, getTourSlug } from '../data/tours';
import { Link } from 'react-router-dom';

// اختر رحلة واحدة من كل مدينة رئيسية
const featuredTours: Tour[] = [
  getToursByCity('New Valley')[0],
  getToursByCity('Aswan')[0], // Will be newest tour since Aswan tours are reversed
  getToursByCity('Cairo')[0],
  getToursByCity('Luxor')[0],
  getToursByCity('Alexandria')[0],
].filter(Boolean) as Tour[];

const TourCard = ({ tour }: { tour: Tour }) => {
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const tourUrl = `${window.location.origin}/tour/${getTourSlug(tour)}`;
    const shareData = {
      title: tour.title,
      text: tour.description,
      url: tourUrl,
    };

    try {
      // Try Web Share API first (mobile)
      if (navigator.share) {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(tourUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        // Fallback: Copy to clipboard if share failed
        try {
          await navigator.clipboard.writeText(tourUrl);
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 2000);
        } catch (clipboardError) {
          console.error('Failed to copy to clipboard:', clipboardError);
        }
      }
    }
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {tour.featured && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold z-20 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Featured
        </div>
      )}

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center z-20 hover:bg-opacity-100 transition-all duration-300"
        aria-label="Share tour"
      >
        {shareSuccess ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
        )}
      </button>

      {/* Image Section */}
      <div className="relative overflow-hidden h-64">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        {tour.city && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {tour.city}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 text-orange-500" />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-800">{tour.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-orange-500" />
              <span>Max {tour.maxGuests}</span>
            </div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-500">
            {tour.special ? `${tour.price.toLocaleString()} EGP` : `$${tour.price}`}
            <span className="text-sm font-normal text-gray-500"> /person</span>
          </div>
          <Link
            to={`/tour/${getTourSlug(tour)}`}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${isHovered
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTours = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleTours, setVisibleTours] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleTours(1);
      } else if (window.innerWidth < 1024) {
        setVisibleTours(2);
      } else {
        setVisibleTours(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation logic
  const triggerSlide = (next: number) => {
    setIsTransitioning(true);
    setPendingSlide(next);
  };

  const maxSlide = visibleTours === 1 ? featuredTours.length : featuredTours.length - visibleTours + 1;
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlide);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlide) % maxSlide);
  };

  useEffect(() => {
    if (currentSlide > featuredTours.length - 1) {
      setCurrentSlide(0);
    }
  }, [visibleTours, currentSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [visibleTours, currentSlide]);

  // Handle end of transition
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        if (pendingSlide !== null) {
          setCurrentSlide(pendingSlide);
          setPendingSlide(null);
        }
        setIsTransitioning(false);
      }, 400); // duration matches CSS
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning, pendingSlide]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"></div>
            <span className="text-orange-600 font-semibold uppercase tracking-wide">Tours</span>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Featured Tours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular experiences, carefully crafted to showcase the best of Egypt's
            ancient wonders and cultural heritage.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="relative mb-12">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleTours)}%)`
              }}
            >
              {featuredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="flex-shrink-0"
                  style={{
                    width: visibleTours === 1
                      ? '100%'
                      : visibleTours === 2
                        ? '50%'
                        : '33.3333%'
                  }}
                >
                  <div className="p-3 h-full flex flex-col">
                    <TourCard tour={tour} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white transition-all duration-300"
              aria-label="Previous"
              disabled={isTransitioning}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-orange-500 hover:text-white transition-all duration-300"
              aria-label="Next"
              disabled={isTransitioning}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: visibleTours === 1 ? featuredTours.length : featuredTours.length - visibleTours + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="/tours"
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Calendar className="mr-3 w-5 h-5" />
            View All Tours
            <ArrowRight className="ml-3 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours; 