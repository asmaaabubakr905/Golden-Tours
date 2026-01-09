import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';


const reviews = [
  {
    name: 'Hassnaa',
    text: 'Thanks for your efforts ya gama3a basatona & you made my first solo trip much more friendly, thanksss ❤️❤️🙏',
    subtitle: 'Friendly Solo Trip',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Nirvana Gouda',
    text: 'Thank you Amr and Mostafa for this beautiful trip💖✨ to many more and good luck golden tours! So glad I got to meet all of you🤍🤍',
    subtitle: 'Beautiful Trip',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Rita',
    text: 'Mostafa & Amr thank you so much guys for the wonderful tour and wonderful time! Your warmth, fun and knowledge made the experience truly special. We really enjoyed every moment 🎇',
    subtitle: 'Wonderful Time',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Hana Nour',
    text: 'شكرا اوي اوي اوي عمرو و مصطفى على التريب دي بكل حاجه فيها بجد عملتوا كل حاجه و زياده عشان تبقى حلوه كده! ❤️ اتبسطنا اوي بكل حاجه و مبسوطه اكتر اني عرفتكم كلكم و ان شاء الله نتقابل في سفريات تانيه كتير ❤️😘 Mostafa Kamel & amr abozad much much love❤️❤️❤️',
    subtitle: 'Exceptional Experience',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Gee',
    text: 'Thank guys for the awesome trip and getting to know you all.. this group has truly made this trip 10 times better and the memories unforgettable ❤️',
    subtitle: 'Unforgettable Memories',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Walaa Kamal',
    text: "Thank you so much Amr and Moustafa for your endless efforts to full fill our requests 🌷🌷🌷🌷 taking us for such amazing places and experiences. Embrace the beauty of life like this nile voyage under the full moon , I don't think I would ever forget such a magical moment. Hawa hiking and the spot up there worth all the time and sweat 😃😃\nI enjoyed all the activities the hype 🎉🎉 and the peaceful ones 🕊️\nThanks for being part of unforgettable chapter of my diary.\nBest of luck and many more adventures to come isa ❤️❤️🌷🌷🙏🙏",
    subtitle: 'Magical Moments',
    rating: 5,
    location: 'Happy Traveler',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];



const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied adventurers who've experienced the journey of a lifetime
          </p>
        </div>

        {/* Review Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 min-h-[300px] flex flex-col justify-center text-center relative">
            {/* Top Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Review Content */}
            <div className={`transition-all duration-500 mt-6 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-xl md:text-3xl text-gray-800 leading-relaxed mb-8 font-medium italic">
                "{currentReview.text}"
              </p>

              {/* Author Info */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">{currentReview.name}</h4>
                <p className="text-orange-600 font-medium">{currentReview.subtitle}</p>
                {/* <p className="text-gray-500 text-sm mt-1">{currentReview.location}</p> */}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:bg-orange-50 flex items-center justify-center transition-all duration-200 group border border-gray-100"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
              </button>
            </div>

            <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2">
              <button
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:bg-orange-50 flex items-center justify-center transition-all duration-200 group border border-gray-100"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
            <p className="text-gray-600 font-medium">Countries Visited</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div className="text-3xl font-bold text-amber-600 mb-2">15k+</div>
            <p className="text-gray-600 font-medium">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <p className="text-gray-600 font-medium">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;