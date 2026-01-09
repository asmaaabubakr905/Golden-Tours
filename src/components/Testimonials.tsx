import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

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
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null);

  // Split reviews into two groups
  const firstRow = reviews.slice(0, 3);
  const secondRow = reviews.slice(3, 6);

  // Function to render a review card
  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div
      onClick={() => setSelectedReview(review)}
      className="w-[280px] h-[220px] bg-[#FFF8F0] rounded-[24px] p-5 flex flex-col justify-between shrink-0 mx-3 border border-orange-100 hover:shadow-lg transition-all duration-300 relative group cursor-pointer hover:-translate-y-1 whitespace-normal"
    >
      {/* Quote Icon */}
      <div className="absolute top-5 right-5 text-gray-200 group-hover:text-orange-200 transition-colors">
        <Quote className="w-8 h-8 fill-current" />
      </div>

      <div>
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Text */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 font-medium">
          "{review.text}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mt-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-800 shadow-sm border border-orange-100">
          {review.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
          <p className="text-gray-500 text-xs">Verified Traveler</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-[#FDFAF5] overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-xl text-gray-600">
          Real stories from real adventurers who've experienced our journeys
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* First Row - Scroll Right */}
        <div className="flex overflow-hidden relative w-full">
          <div className="flex animate-scroll-right hover:pause whitespace-nowrap">
            {/* Duplicated content for seamless loop */}
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((review, idx) => (
              <ReviewCard key={`row1-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Second Row - Scroll Left */}
        <div className="flex overflow-hidden relative w-full">
          <div className="flex animate-scroll-left hover:pause whitespace-nowrap">
            {/* Duplicated content for seamless loop */}
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((review, idx) => (
              <ReviewCard key={`row2-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for full review */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReview(null)}>
          <div
            className="bg-white rounded-[32px] p-8 md:p-12 max-w-2xl w-full relative shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                <p className="text-gray-800 text-xl leading-relaxed font-medium whitespace-pre-wrap">
                  "{selectedReview.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-gray-100">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-2xl font-bold text-orange-600 shadow-sm">
                  {selectedReview.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedReview.name}</h4>
                  <p className="text-orange-600 font-medium">{selectedReview.subtitle}</p>
                  <p className="text-gray-500 text-sm">Verified Traveler • {selectedReview.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;