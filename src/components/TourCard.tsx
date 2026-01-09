import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Share2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { getTourSlug, Tour } from '../data/tours';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const [shareSuccess, setShareSuccess] = useState(false);

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
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2">
      {/* Gradient Overlay Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Featured Badge */}
      {tour.featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button
          onClick={handleShare}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 relative"
          aria-label="Share tour"
        >
          {shareSuccess ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Share2 className="w-4 h-4 text-gray-600 hover:text-blue-500 transition-colors" />
          )}
        </button>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg z-20">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-800">{tour.rating}</span>
            <span className="text-xs text-gray-500">/ 5</span>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl px-4 py-2 shadow-lg z-20">
          <div className="text-lg font-bold">
            {tour.special ? `${tour.price.toLocaleString()} EGP` : `$${tour.price}`}
            <span className="text-xs font-normal opacity-90 ml-1">/person</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 z-10">
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <div className="bg-orange-100 p-1 rounded-full mr-2">
            <MapPin className="w-3 h-3 text-orange-500" />
          </div>
          <span className="font-medium">{tour.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{tour.duration}</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 text-orange-500" />
              <span className="font-medium">Max {tour.maxGuests}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={`/tour/${getTourSlug(tour)}`}
          className="group/btn relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-2xl font-bold text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 no-underline"
        >
          <span>View Details</span>
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />

          {/* Button Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl blur opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300 -z-10"></div>
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default TourCard;