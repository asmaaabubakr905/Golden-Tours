import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, CheckCircle, XCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTourBySlug, getTourSlug } from '../data/tours';
import { Helmet } from 'react-helmet';
import staticOgImage from '../assets/nuba luxury escape.jpeg';

const TourDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', guests: '1', date: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const tour = getTourBySlug(slug || '');

  // Stable review count per tour to avoid changing on re-render
  const reviewsCount = useMemo(() => Math.floor(Math.random() * 200) + 50, [tour?.id]);

  // Redirect legacy / numeric ids to canonical slug URL
  useEffect(() => {
    if (!tour) return;
    const canonical = getTourSlug(tour);
    if (slug !== canonical) {
      navigate(`/tour/${canonical}`, { replace: true });
    }
  }, [slug, tour?.id, navigate]);

  // Default tab: open itinerary first for special trips (e.g., New Year), otherwise overview
  useEffect(() => {
    if (!tour) return;
    setActiveTab(tour.special ? 'itinerary' : 'overview');
  }, [tour?.id]);

  // One-time New Year celebration overlay for New Year trips only
  useEffect(() => {
    if (!tour?.isNewYear) return;
    setShowCelebration(true);
    const timer = setTimeout(() => setShowCelebration(false), 4200);
    return () => clearTimeout(timer);
  }, [tour?.id, tour?.isNewYear]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const gallery = tour?.galleryImages;
    if (selectedImageIndex === null || !gallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : gallery.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) =>
          prev !== null && prev < gallery.length - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, tour?.galleryImages]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-8">The tour you're looking for doesn't exist.</p>
          <Link
            to="/tours"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const maxGuests = tour?.maxGuests ?? 10;

  const adjustGuests = (delta: number) => {
    setForm(prev => {
      const current = Number(prev.guests) || 1;
      const next = Math.min(maxGuests, Math.max(1, current + delta));
      return { ...prev, guests: String(next) };
    });
  };

  useEffect(() => {
    setForm(prev => {
      const current = Number(prev.guests) || 1;
      const clamped = Math.min(maxGuests, Math.max(1, current));
      return { ...prev, guests: String(clamped) };
    });
  }, [maxGuests]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.guests) {
      setFormError('Please fill in all fields.');
      return;
    }
    // Check if date is required for Nuba Experience
    if (tour?.id === '12' && !form.date) {
      setFormError('Please select a date.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    try {
      const dataToSend = {
        tour: tour.title,
        name: form.name,
        phone: form.phone,
        guests: form.guests,
        selectDate: tour?.id === '12' ? form.date : ''
      };

      // Log data being sent for debugging
      console.log('Sending booking data to Google Sheets:', dataToSend);

      // Replace with your Google Apps Script Web App URL
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxauqea6-954TQEewDYlN4XNLXCI0rkTeKW__PJcgSKr_r3u9NAHgU6YKwWPo3o2PilCg/exec';

      // Send POST request using FormData to avoid CORS preflight issues
      // FormData doesn't trigger preflight requests, making it work seamlessly with Google Apps Script
      const formData = new FormData();
      formData.append('tour', dataToSend.tour);
      formData.append('name', dataToSend.name);
      formData.append('phone', dataToSend.phone);
      formData.append('guests', dataToSend.guests);
      formData.append('selectDate', dataToSend.selectDate);

      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: formData
        // Don't set Content-Type header - browser will set it automatically with boundary for FormData
      });

      // Parse response
      const result = await response.json();

      // Check if request was successful
      if (result.success) {
        console.log('Booking submitted successfully:', result);
        setSubmitSuccess(true);
        setIsSubmitting(false);

        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          setShowModal(false);
          setSubmitSuccess(false);
          setForm({ name: '', phone: '', guests: '1', date: '' });
        }, 2000);
      } else {
        // Server returned error
        console.error('Server error:', result.error);
        setFormError(result.message || 'Failed to submit booking. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Failed to submit booking. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {tour && (
        <Helmet>
          <title>{tour.title} | Golden Tours</title>
          <meta name="description" content={tour.description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={tour.title} />
          <meta property="og:description" content={tour.description} />
          <meta property="og:image" content={window.location.origin + staticOgImage} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={tour.title} />
          <meta property="twitter:description" content={tour.description} />
          <meta property="twitter:image" content={window.location.origin + staticOgImage} />
        </Helmet>
      )}

      {/* New Year Celebration Overlay (shows once on load for New Year trips only) */}
      {showCelebration && tour?.isNewYear && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/15 via-amber-200/15 to-transparent animate-pulse"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          {/* Fireworks */}
          {Array.from({ length: 10 }).map((_, idx) => {
            const palette = ['#ffb347', '#ffd166', '#ff6b6b', '#ffa500', '#ffe29f'];
            const color = palette[idx % palette.length];
            const top = 12 + (idx % 5) * 15;
            const left = ((idx * 19) % 90) + 5;
            const delay = idx * 0.18;
            const size = 140 + (idx % 4) * 35;
            return (
              <div
                key={idx}
                className="absolute"
                style={{ top: `${top}%`, left: `${left}%`, animation: `firework-burst 1.8s ease-out ${delay}s forwards` }}
              >
                <div
                  className="relative"
                  style={{
                    width: size,
                    height: size,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {Array.from({ length: 14 }).map((__, sparkIdx) => (
                    <span
                      key={sparkIdx}
                      className="absolute block rounded-full"
                      style={{
                        width: '6px',
                        height: '24px',
                        background: `linear-gradient(180deg, ${color}, rgba(255,255,255,0))`,
                        boxShadow: `0 0 12px ${color}`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'center 95%',
                        transform: `translate(-50%, -50%) rotate(${sparkIdx * (360 / 14)}deg) scaleY(0)`,
                        animation: `spark 1.8s ease-out ${delay}s forwards`,
                      }}
                    />
                  ))}
                  <span
                    className="absolute block rounded-full"
                    style={{
                      width: '18px',
                      height: '18px',
                      background: color,
                      boxShadow: `0 0 18px ${color}, 0 0 36px ${color}`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) scale(0)',
                      animation: `core 1s ease-out ${delay}s forwards`,
                    }}
                  />
                </div>
              </div>
            );
          })}
          {/* Confetti Ribbons */}
          {Array.from({ length: 24 }).map((_, idx) => {
            const palette = ['#ff9f1c', '#ffe66d', '#ff6b6b', '#f6c343', '#ffd166', '#ffa500'];
            const color = palette[idx % palette.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.8;
            const duration = 2.8 + Math.random() * 1.2;
            const rotate = Math.random() * 360;
            return (
              <span
                key={`confetti-${idx}`}
                className="absolute block rounded-sm"
                style={{
                  width: '8px',
                  height: '22px',
                  background: color,
                  boxShadow: `0 0 10px ${color}`,
                  top: '-10%',
                  left: `${left}%`,
                  transform: `rotate(${rotate}deg)`,
                  animation: `confetti-fall ${duration}s ease-in ${delay}s forwards`,
                }}
              />
            );
          })}
          <style>{`
            @keyframes firework-burst {
              0% { opacity: 0; transform: scale(0.7); }
              25% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.2); }
            }
            @keyframes spark {
              0% { transform: translate(-50%, -50%) rotate(0deg) scaleY(0); opacity: 1; }
              30% { transform: translate(-50%, -50%) rotate(0deg) scaleY(1); opacity: 1; }
              100% { transform: translate(-50%, -50%) rotate(0deg) scaleY(0.15); opacity: 0; }
            }
            @keyframes core {
              0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
              50% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
              100% { transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
            }
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(120vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}
      {/* Image Lightbox Modal */}
      {selectedImageIndex !== null && tour.galleryImages && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {tour.galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : (tour.galleryImages?.length || 1) - 1
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    prev !== null && prev < (tour.galleryImages?.length || 1) - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedImageIndex !== null && (
              <>
                <img
                  src={tour.galleryImages[selectedImageIndex]}
                  alt={`${tour.title} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImageIndex + 1} / {tour.galleryImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => {
            setShowModal(false);
            setSubmitSuccess(false);
            setFormError('');
            setForm({ name: '', phone: '', guests: '1', date: '' });
          }}
        >
          <div
            className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col relative animate-fadeIn border border-orange-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 p-6 pb-4">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors z-10 bg-white rounded-full p-1 shadow-sm"
                onClick={() => {
                  setShowModal(false);
                  setSubmitSuccess(false);
                  setFormError('');
                  setForm({ name: '', phone: '', guests: '1', date: '' });
                }}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-orange-500 mb-2 text-center pr-8">Book This Tour</h2>
              <p className="text-gray-600 text-center mb-4">Fill in your details and we will contact you soon.</p>
            </div>
            {submitSuccess ? (
              <div className="flex-1 flex items-center justify-center px-6 pb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Submitted!</h3>
                  <p className="text-gray-600">We've received your booking request and will contact you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 min-h-0">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Tour</label>
                  <input
                    type="text"
                    value={tour.title}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Guests</label>
                  <div className="flex items-center justify-between space-x-3">
                    <button
                      type="button"
                      onClick={() => adjustGuests(-1)}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xl font-bold hover:bg-gray-50 transition"
                    >
                      –
                    </button>
                    <div className="flex-1 text-center py-3 px-4 rounded-full border border-gray-300 bg-white text-gray-800 text-lg font-semibold">
                      {form.guests}
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustGuests(1)}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xl font-bold hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                {tour?.id === '12' && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Select Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${form.date === '18 December'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50'
                        }`}>
                        <input
                          type="radio"
                          name="date"
                          value="18 December"
                          checked={form.date === '18 December'}
                          onChange={handleFormChange}
                          className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2"
                          required
                        />
                        <span className={`ml-3 font-medium ${form.date === '18 December'
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-700 group-hover:text-orange-600'
                          }`}>18 December</span>
                      </label>
                      <label className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${form.date === '28 January'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50'
                        }`}>
                        <input
                          type="radio"
                          name="date"
                          value="28 January"
                          checked={form.date === '28 January'}
                          onChange={handleFormChange}
                          className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2"
                          required
                        />
                        <span className={`ml-3 font-medium ${form.date === '28 January'
                          ? 'text-orange-600 font-semibold'
                          : 'text-gray-700 group-hover:text-orange-600'
                          }`}>28 January</span>
                      </label>
                    </div>
                  </div>
                )}
                {formError && <div className="text-red-500 text-sm text-center">{formError}</div>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Booking'
                  )}
                </button>
                <a
                  href="https://ipn.eg/S/amrabouzied7/instapay/6QCON8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-white text-orange-600 border border-orange-200 py-3 rounded-lg font-semibold text-lg shadow-sm hover:bg-orange-50 transition-all"
                >
                  Pay via InstaPay
                </a>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 rounded-b-3xl overflow-hidden shadow-xl">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to={`/tours?city=${encodeURIComponent(tour.city)}`}
              className="inline-flex items-center text-white hover:text-orange-300 transition-colors mb-4 drop-shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tours
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{tour.title}</h1>
            <div className="flex flex-wrap items-center text-white space-x-6 drop-shadow-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{tour.duration}</span>
              </div>
              {/* {tour.tourDate && (
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">{tour.tourDate}</span>
                </div>
              )} */}
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{tour.rating} ({reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Max {tour.maxGuests}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-orange-200 mb-8 bg-orange-50 rounded-xl shadow-sm px-2">
                <nav className="flex space-x-4 sm:space-x-8 py-2">
                  {[
                    { id: 'overview', label: <><CheckCircle className='inline w-5 h-5 mr-1 text-orange-500' /> Overview</> },
                    { id: 'itinerary', label: <><Calendar className='inline w-5 h-5 mr-1 text-orange-500' /> Itinerary</> },
                    { id: 'includes', label: <><Star className='inline w-5 h-5 mr-1 text-orange-500' /> Includes/Excludes</> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm
                        ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md'
                          : 'bg-white text-orange-500 hover:bg-orange-100 border border-orange-100'}
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Gallery Section - Only for tours with galleryImages */}
              {activeTab === 'overview' && tour.galleryImages && tour.galleryImages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-orange-500 mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-orange-400" />
                    Photo Gallery
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {tour.galleryImages.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
                      >
                        <img
                          src={img}
                          alt={`${tour.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Click on any image to view in full size
                  </p>
                </div>
              )}

              {/* Tab Content */}
              <div className="prose prose-lg max-w-none">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-4 flex items-center"><CheckCircle className="w-6 h-6 mr-2 text-orange-400" />Tour Overview</h3>
                    <p className="text-gray-700 mb-6">{tour.fullDescription}</p>
                    <p className="text-gray-600">{tour.description}</p>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-4 flex items-center"><Calendar className="w-6 h-6 mr-2 text-orange-400" />Daily Itinerary</h3>
                    <div className="space-y-4">
                      {(() => {
                        let itemNumber = 0;
                        return tour.itinerary.map((item, index) => {
                          // Check if item is a day header (Day X or DAY X with optional text)
                          const dayHeaderMatch = item.trim().match(/^(DAY|Day)\s+(\d+)(?:\s*[–-]\s*(.+))?$/i);
                          const isEmpty = item.trim() === '';
                          const isSupplement = item.trim().startsWith('Foreigners extra supplement') || item.trim().startsWith('single room extra supplement');

                          if (isEmpty) {
                            return null;
                          }

                          if (isSupplement) {
                            return (
                              <div key={index} className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg shadow-sm">
                                <p className="text-yellow-800 font-medium text-sm">{item}</p>
                              </div>
                            );
                          }

                          if (dayHeaderMatch) {
                            const dayNumber = dayHeaderMatch[2];
                            const dayText = dayHeaderMatch[3] || '';
                            return (
                              <div key={index} className="mt-6 mb-4">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                                    Day {dayNumber}
                                  </div>
                                  {dayText && (
                                    <div className="text-sm font-semibold text-gray-700 mr-2">
                                      {dayText}
                                    </div>
                                  )}
                                  <div className="flex-1 h-0.5 bg-gradient-to-r from-orange-200 to-transparent"></div>
                                </div>
                              </div>
                            );
                          }

                          // Check if item is a sub-item (starts with bullet) or "A visit to:"
                          const isSubItem = item.trim().startsWith('•');
                          const isVisitHeader = item.trim() === 'A visit to:';

                          // Only increment item number for regular items (not sub-items, not visit header)
                          if (!isSubItem && !isVisitHeader) {
                            itemNumber++;
                          }

                          return (
                            <div key={index} className={`flex items-start space-x-3 ${isSubItem ? 'ml-8' : ''}`}>
                              {!isSubItem && !isVisitHeader && (
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow">
                                  {itemNumber}
                                </div>
                              )}
                              {isSubItem && (
                                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                              )}
                              {isVisitHeader && (
                                <div className="flex-shrink-0 w-8 h-8"></div>
                              )}
                              <p className={`text-gray-700 ${isSubItem ? 'pt-1' : 'pt-1'} ${isSubItem ? 'font-medium' : ''} ${isVisitHeader ? 'font-semibold text-orange-600' : ''}`}>
                                {item}
                              </p>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {activeTab === 'includes' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                          Includes
                        </h3>
                        <ul className="space-y-2">
                          {tour.includes.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
                          <XCircle className="w-6 h-6 text-red-500 mr-2" />
                          Excludes
                        </h3>
                        <ul className="space-y-2">
                          {tour.excludes.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-orange-200 rounded-2xl p-8 sticky top-24 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {tour.special ? `${tour.price.toLocaleString()} EGP` : `$${tour.price}`}
                    <span className="text-lg font-normal text-gray-500"> /person</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{tour.rating} ({reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {tour.tourDate && (
                    <div className="flex items-center justify-between py-2 border-b border-orange-100 bg-orange-50 px-4 py-3 rounded-lg">
                      <span className="text-gray-700 flex items-center font-semibold"><Calendar className="w-4 h-4 mr-1 text-orange-500" />Tour Date</span>
                      <span className="font-bold text-orange-600">{tour.tourDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-orange-100">
                    <span className="text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-1 text-orange-400" />Duration</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-orange-100">
                    <span className="text-gray-600 flex items-center"><Users className="w-4 h-4 mr-1 text-orange-400" />Max Guests</span>
                    <span className="font-medium">{tour.maxGuests} people</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-orange-100">
                    <span className="text-gray-600 flex items-center"><MapPin className="w-4 h-4 mr-1 text-orange-400" />Location</span>
                    <span className="font-medium">{tour.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Now</span>
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Questions?
                    <a
                      href="http://wa.me/201507000720"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 ml-1"
                    >
                      Contact us on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetails;