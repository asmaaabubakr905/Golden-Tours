import img1 from '../assets/abusimble aswan main image.jpg';
import img2 from '../assets/falouka aswan.jpg';
import img3 from '../assets/nubian-village.jpg';
import img4 from '../assets/philae-temple,-philae-island.jpg';
import img5 from '../assets/high-dam-aswan-webp.webp';
import img6 from '../assets/Temple-of-Queen-Hatshepsut-1024x683.png';
import img7 from '../assets/273ae4b9-62f0-4fa2-a7a5-9b32d249b74a_karnak-temple-entry-tickets.png';
import img8 from '../assets/alex.jpeg';
import img9 from '../assets/Egyptian-Museum-and-Old-Cairo-TOur-1.webp';
import img10 from '../assets/pyramids.jpg';
import img11 from '../assets/fluca luxor.jpg';
import nubaImg from '../assets/Nuba.jpg';
import nubaNewYearsImg from '../assets/31DEC.png';
import nubaLuxuryEscapeImg from '../assets/nuba luxury escape.jpg';
import galleryImg1 from '../assets/1.jpg';
import galleryImg2 from '../assets/2.jpg';
import galleryImg3 from '../assets/3.jpg';
import galleryImg4 from '../assets/4.jpg';
import galleryImg5 from '../assets/5.jpg';
import galleryImg6 from '../assets/6.jpg';
import galleryImg7 from '../assets/7.jpg';
import galleryImg8 from '../assets/8.jpg';
import galleryImg9 from '../assets/9.jpg';
import galleryImg10 from '../assets/10.jpg';
import galleryImg11 from '../assets/11.jpg';
import galleryImg12 from '../assets/12.jpg';
import galleryImg13 from '../assets/13.jpg';
import galleryImg14 from '../assets/14.jpg';
export interface Tour {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  city: string;
  rating: number;
  maxGuests: number;
  featured?: boolean;
  special?: boolean;
  isNewYear?: boolean;
  tourDate?: string;
  itinerary: string[];
  includes: string[];
  excludes: string[];
  fullDescription: string;
  galleryImages?: string[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getTourSlug = (tour: Tour) => tour.slug ?? slugify(tour.title);

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Pyramids of Giza & Sphinx Tour',
    description: 'Explore the last remaining Wonder of the Ancient World and the mysterious Sphinx in this half-day adventure.',
    image: img10,
    price: 85,
    duration: '6 hours',
    location: 'Giza',
    city: 'Cairo',
    rating: 4.9,
    maxGuests: 15,
    featured: true,
    itinerary: [
      'Pick up from hotel at 8:00 AM',
      'Visit the Great Pyramid of Khufu',
      'Explore the Pyramid of Khafre',
      'Discover the Pyramid of Menkaure',
      'Visit the Great Sphinx',
      'Photo stop at the panoramic view',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional tour guide',
      'Entrance fees to Giza complex',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Entrance inside the Great Pyramid (optional)',
      'Lunch',
      'Personal expenses',
      'Gratuities'
    ],
    fullDescription: 'Embark on an unforgettable journey to the Pyramids of Giza, one of the Seven Wonders of the Ancient World. This comprehensive tour takes you through 4,500 years of history as you explore the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure. Stand in awe before the enigmatic Sphinx and learn about the fascinating theories surrounding its creation. Your expert guide will share captivating stories about the pharaohs and the incredible engineering feats that created these monuments.'
  },
  {
    id: '2',
    title: 'Egyptian Museum & Old Cairo Tour',
    description: 'Discover the treasures of ancient Egypt and explore the historic Islamic and Coptic quarters of Old Cairo.',
    image:img9,
    price: 75,
    duration: '8 hours',
    location: 'Central Cairo',
    city: 'Cairo',
    rating: 4.8,
    maxGuests: 20,
    featured: true,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Egyptian Museum',
      'Explore Tutankhamun treasures',
      'Lunch at local restaurant',
      'Tour Coptic Cairo',
      'Visit Hanging Church',
      'Explore Ben Ezra Synagogue',
      'Walk through Khan el-Khalili Bazaar'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional Egyptologist guide',
      'Entrance fees to all sites',
      'Lunch at local restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Entrance to Royal Mummy Room (optional)',
      'Personal shopping',
      'Gratuities',
      'Drinks during lunch'
    ],
    fullDescription: 'Immerse yourself in the rich history of ancient and medieval Egypt with this comprehensive full-day tour. Begin at the world-renowned Egyptian Museum, home to the largest collection of ancient Egyptian artifacts, including the golden treasures of Tutankhamun. After lunch, journey through Old Cairo to discover the religious heritage of the city, visiting the Hanging Church, one of the oldest Christian churches in Egypt, and the historic Ben Ezra Synagogue. End your day browsing the vibrant Khan el-Khalili bazaar, where you can shop for authentic Egyptian crafts and souvenirs.'
  },
  {
    id: '3',
    title: 'Alexandria Day Trip',
    description: 'Visit the Pearl of the Mediterranean with its ancient library, citadel, and Roman amphitheater.',
    image: img8,
    price: 120,
    duration: '12 hours',
    location: 'Alexandria',
    city: 'Alexandria',
    rating: 4.7,
    maxGuests: 12,
    itinerary: [
      'Early morning departure from Cairo',
      'Visit Pompey\'s Pillar',
      'Explore the Catacombs of Kom el Shoqafa',
      'Lunch with sea view',
      'Tour the new Library of Alexandria',
      'Visit Qaitbay Citadel',
      'Walk along the Corniche',
      'Return to Cairo'
    ],
    includes: [
      'Air-conditioned transportation',
      'Professional tour guide',
      'Entrance fees to all sites',
      'Seafood lunch',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Hotel pickup (meeting point in Cairo)',
      'Personal expenses',
      'Gratuities',
      'Optional activities'
    ],
    fullDescription: 'Escape to Alexandria, the legendary city founded by Alexander the Great and once home to the famous ancient library. This full-day excursion takes you along the Mediterranean coast to explore the city\'s rich Greco-Roman heritage. Visit the impressive Pompey\'s Pillar, descend into the mysterious Catacombs of Kom el Shoqafa, and explore the modern Library of Alexandria. The tour includes a visit to the medieval Qaitbay Citadel, built on the site of the ancient Lighthouse of Alexandria, one of the Seven Wonders of the Ancient World.'
  },
  {
    id: '4',
    title: 'Luxor Temple & Karnak Complex',
    description: 'Explore the magnificent temples of ancient Thebes in the world\'s greatest open-air museum.',
    image: img7,
    price: 95,
    duration: '8 hours',
    location: 'Luxor East Bank',
    city: 'Luxor',
    rating: 4.9,
    maxGuests: 16,
    featured: true,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Karnak Temple Complex',
      'Explore the Great Hypostyle Hall',
      'Lunch at local restaurant',
      'Tour Luxor Temple',
      'Walk the Avenue of Sphinxes',
      'Sunset viewing opportunity',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional Egyptologist guide',
      'Entrance fees to both temples',
      'Lunch at local restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Sound and Light show (optional)',
      'Personal expenses',
      'Gratuities',
      'Drinks during lunch'
    ],
    fullDescription: 'Discover the religious capital of ancient Egypt with this comprehensive tour of Luxor\'s East Bank temples. Begin at the magnificent Karnak Temple Complex, the largest religious building ever constructed, featuring the awe-inspiring Great Hypostyle Hall with its 134 massive columns. After lunch, explore the beautiful Luxor Temple, connected to Karnak by the ancient Avenue of Sphinxes. Learn about the religious ceremonies and festivals that took place here over 3,000 years ago, and witness the sunset casting golden light on these ancient monuments.'
  },
  {
    id: '5',
    title: 'Valley of the Kings & Hatshepsut Temple',
    description: 'Journey to the royal burial ground and visit the magnificent mortuary temple of Egypt\'s female pharaoh.',
    image: img6,
    price: 110,
    duration: '8 hours',
    location: 'Luxor West Bank',
    city: 'Luxor',
    rating: 4.8,
    maxGuests: 14,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Valley of the Kings',
      'Explore three royal tombs',
      'Visit Hatshepsut Temple',
      'Lunch with Nile view',
      'Stop at Colossi of Memnon',
      'Optional alabaster factory visit',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional Egyptologist guide',
      'Entrance fees to all sites',
      'Lunch at local restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Entrance to Tutankhamun\'s tomb (optional)',
      'Personal expenses',
      'Gratuities',
      'Additional tomb visits'
    ],
    fullDescription: 'Explore the legendary Valley of the Kings, where pharaohs were buried for over 500 years. Visit three beautifully decorated royal tombs and learn about ancient Egyptian burial practices and beliefs about the afterlife. Continue to the stunning Hatshepsut Temple, the mortuary temple of Egypt\'s most successful female pharaoh, renowned for its unique architectural design carved into the cliff face. The tour concludes with a stop at the Colossi of Memnon, two massive stone statues that have stood guard over the Theban necropolis for over 3,400 years.'
  },
  {
    id: '6',
    title: 'Aswan High Dam ',
    description: 'Discover modern engineering marvels and ancient temples relocated to save them from rising waters.',
    image: img5,
    price: 40,
    duration: '6 hours',
    location: 'Aswan',
    city: 'Aswan',
    rating: 4.7,
    maxGuests: 18,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Aswan High Dam',
      'Boat ride to Philae Temple',
      'Explore Temple of Isis',
      'Lunch at Nubian restaurant',
      'Visit Nubian Village',
      'Felucca sailing on the Nile',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional tour guide',
      'Entrance fees to all sites',
      'Boat transfers',
      'Lunch at Nubian restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Sound and Light show at Philae (optional)',
      'Personal expenses',
      'Gratuities',
      'Shopping at Nubian village'
    ],
    fullDescription: 'Experience the perfect blend of ancient history and modern engineering in beautiful Aswan. Start with a visit to the impressive Aswan High Dam, one of the world\'s largest embankment dams, which created Lake Nasser and revolutionized agriculture in Egypt. Take a boat ride to Philae Temple, dedicated to the goddess Isis, which was carefully relocated stone by stone to save it from the rising waters of the Nile. The tour includes a visit to a traditional Nubian village where you can experience local culture and enjoy a peaceful felucca sailing experience on the Nile River.'
  },
  {
    id: '7',
    title: 'Abu Simbel Temples Day Trip',
    description: 'Marvel at Ramses II\'s colossal temples, one of Egypt\'s most spectacular archaeological sites.',
    image: img1,
    price: 180,
    duration: '10 hours',
    location: 'Abu Simbel',
    city: 'Aswan',
    rating: 4.9,
    maxGuests: 10,
    featured: true,
    itinerary: [
      'Very early morning departure (4:00 AM)',
      'Drive through the desert to Abu Simbel',
      'Visit the Great Temple of Ramses II',
      'Explore the Small Temple of Nefertari',
      'Learn about the temple relocation project',
      'Lunch at local restaurant',
      'Return journey to Aswan',
      'Evening arrival at hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Air-conditioned transportation',
      'Professional Egyptologist guide',
      'Entrance fees to both temples',
      'Lunch at local restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Early morning breakfast',
      'Personal expenses',
      'Gratuities',
      'Optional activities'
    ],
    fullDescription: 'Embark on an extraordinary journey to Abu Simbel, one of Egypt\'s most magnificent and remote archaeological sites. The Great Temple of Ramses II features four colossal statues of the pharaoh carved into the rock face, each standing 20 meters tall. The smaller temple is dedicated to Queen Nefertari, Ramses II\'s beloved wife. Learn about the incredible UNESCO project that moved these temples stone by stone to save them from the rising waters of Lake Nasser. This is truly one of Egypt\'s most spectacular sights and a testament to both ancient and modern engineering prowess.'
  },
  {
    id: '8',
    title: 'Nile Felucca Sunset Cruise',
    description: 'Enjoy a peaceful sailing experience on the Nile River aboard a traditional Egyptian sailboat.',
    image: img2,
    price: 30,
    duration: '1 hours',
    location: 'Aswan',
    city: 'Aswan',
    rating: 4.6,
    maxGuests: 8,
    itinerary: [
      'Afternoon pickup from hotel',
      'Board traditional felucca',
      'Sail around Elephantine Island',
      'Enjoy refreshments on board',
      'Watch the sunset over the Nile',
      'Return to dock',
      'Transfer back to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional boat captain',
      'Felucca sailing experience',
      'Refreshments (tea, coffee, soft drinks)',
      'Entrance to Botanical Garden',
      'All taxes and service charges'
    ],
    excludes: [
      'Lunch or dinner',
      'Personal expenses',
      'Gratuities',
      'Additional drinks'
    ],
    fullDescription: 'Experience the timeless beauty of the Nile River with a peaceful felucca sailing adventure. These traditional wooden sailboats have been used on the Nile for thousands of years and offer the perfect way to enjoy the river\'s serenity. Sail around the beautiful Elephantine Island, visit the lush Botanical Garden with its exotic plants and trees, and enjoy refreshments while taking in the stunning scenery. As the sun sets over the Nile, you\'ll understand why this river has been the lifeblood of Egypt for millennia. This relaxing experience is perfect for all ages and provides unforgettable photo opportunities.'
  },
  {
    id: '9',
    title: 'Philae Temple',
    description: 'Discover the ancient temple of Isis, dedicated to the goddess of fertility and motherhood.',
    image: img4,
    price: 45,
    duration: '4 hours',
    location: 'Aswan',
    city: 'Aswan',
    rating: 4.7,
    maxGuests: 18,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Philae Temple',
      'Explore Temple of Isis',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional tour guide',
      'Entrance fees to all sites',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Personal expenses',
      'Gratuities',
    ],
    fullDescription: 'Experience the perfect blend of ancient history and modern engineering in beautiful Aswan. Start with a visit to the impressive Aswan High Dam, one of the world\'s largest embankment dams, which created Lake Nasser and revolutionized agriculture in Egypt. Take a boat ride to Philae Temple, dedicated to the goddess Isis, which was carefully relocated stone by stone to save it from the rising waters of the Nile. The tour includes a visit to a traditional Nubian village where you can experience local culture and enjoy a peaceful felucca sailing experience on the Nile River.'
  },
  {
    id: '10',
    title: 'Nubian Village',
    description: 'Discover the traditional Nubian village of Aswan, known for its unique culture and traditional way of life.',
    image:  img3,
    price: 45,
    duration: '4 hours',
    location: 'Aswan',
    city: 'Aswan',
    rating: 4.7,
    maxGuests: 18,
    itinerary: [
      'Morning pickup from hotel',
      'Visit Nubian Village',
      'Explore traditional Nubian culture',
      'Lunch at Nubian restaurant',
      'Return to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional tour guide',
      'Entrance fees to all sites',
      'Lunch at Nubian restaurant',
      'Bottled water',
      'All taxes and service charges'
    ],
    excludes: [
      'Personal expenses',
      'Gratuities',
    ],
    fullDescription: 'Experience the perfect blend of ancient history and modern engineering in beautiful Aswan. Start with a visit to the impressive Aswan High Dam, one of the world\'s largest embankment dams, which created Lake Nasser and revolutionized agriculture in Egypt. Take a boat ride to Philae Temple, dedicated to the goddess Isis, which was carefully relocated stone by stone to save it from the rising waters of the Nile. The tour includes a visit to a traditional Nubian village where you can experience local culture and enjoy a peaceful felucca sailing experience on the Nile River.'
  },
  {
    id: '11',
    title: 'Nile Felucca Sunset Cruise',
    description: 'Enjoy a peaceful sailing experience on the Nile River aboard a traditional Egyptian sailboat.',
    image: img11,
    price: 30,
    duration: '1 hours',
    location: 'Luxor',
    city: 'Luxor',
    rating: 4.9,
    maxGuests: 8,
    featured: true,
    itinerary: [
      'Afternoon pickup from hotel',
      'Board traditional felucca',
      'Sail around Elephantine Island',
      'Enjoy refreshments on board',
      'Watch the sunset over the Nile',
      'Return to dock',
      'Transfer back to hotel'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Professional boat captain',
      'Felucca sailing experience',
      'Refreshments (tea, coffee, soft drinks)',
      'Entrance to Botanical Garden',
      'All taxes and service charges'
    ],
    excludes: [
      'Lunch or dinner',
      'Personal expenses',
      'Gratuities',
      'Additional drinks'
    ],
    fullDescription: 'Experience the timeless beauty of the Nile River with a peaceful felucca sailing adventure. These traditional wooden sailboats have been used on the Nile for thousands of years and offer the perfect way to enjoy the river\'s serenity. Sail around the beautiful Elephantine Island, visit the lush Botanical Garden with its exotic plants and trees, and enjoy refreshments while taking in the stunning scenery. As the sun sets over the Nile, you\'ll understand why this river has been the lifeblood of Egypt for millennia. This relaxing experience is perfect for all ages and provides unforgettable photo opportunities.'
  },
  {
    id: '12',
    title: 'Nuba Experience',
    description: 'A unique Nubian experience on a traditional Dahabya - Discover authentic Nubian culture in an exceptional 4-day journey',
    image: nubaImg,
    price: 8500,
    duration: '4 days',
    location: 'Aswan',
    city: 'Aswan',
    rating: 5.0,
    maxGuests: 16,
    featured: true,
    special: false,
    itinerary: [
      'Day 1',
      'Train station pickup',
      'Transfer to Dahabya',
      'Snacks time on Dahabya',
      'A visit to:',
      '• The Nubian village',
      '• Nubian souq',
      '• Nubian school',
      '• Learn about the culture of Nuba',
      'Dinner on the Dahabya',
      '',
      'Day 2',
      'Breakfast on the Dahabya',
      'A visit to:',
      '• The Temple of Isis, Hathor',
      '• The Hi-Dam',
      '• The Soviet Egyptian Friendship Symbol',
      'Dinner on the Dahabya',
      '',
      'Day 3',
      'Breakfast on the Dahabya',
      'A visit to:',
      '• The Botanical Garden',
      '• Mafia Island',
      '• Abu-Al Hawa Mountain',
      '• Noble Tombs',
      '• Kayak + Sandboarding (optional)',
      'Dinner on the Dahabya',
      '',
      'Day 4',
      'Abu-Simble Temple (optional)',
      'Breakfast on the Dahabya',
      'Free tour at Aswan Old Souq for shopping',
      'Transfer to the train station'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Accommodation on Dahabya',
      'All meals (breakfast, dinner)',
      'Professional tour guide',
      'All entrance fees',
      'Internal transfers',
      'All taxes and service charges'
    ],
    excludes: [
      'Abu Simbel Temple (optional)',
      'Kayak + Sandboarding (optional)',
      'Personal expenses',
      'Shopping at souqs',
      'Gratuities',
      'Train tickets'
    ],
    fullDescription: 'A unique Nubian experience on a traditional Dahabya - Discover authentic Nubian culture in an exceptional 4-day journey. Enjoy accommodation on the traditional Dahabya and explore Nubian villages and stunning archaeological sites in Aswan. This unique journey combines authentic Nubian culture with remarkable historical sites in an unforgettable trip.',
    galleryImages: [
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      galleryImg5,
      galleryImg6,
      galleryImg7,
      galleryImg8,
      galleryImg9,
      galleryImg10,
      galleryImg11,
      galleryImg12,
      galleryImg13,
      galleryImg14
    ]
  },
  {
    id: '13',
    title: 'Nuba - New Years',
    description: "Celebrate New Year's Eve on a Dahabya in Nubia — culture, nature, and parties along the Nile.",
    image: nubaNewYearsImg,
    price: 11500,
    duration: '4 days',
    location: 'Aswan',
    city: 'Aswan',
    rating: 5.0,
    maxGuests: 20,
    featured: true,
    special: false,
    isNewYear: true,
    itinerary: [
      'Day 1',
      'Arrival to Aswan & pick-up from train station',
      'Check-in on the Dahabya & rest',
      'Visit Nubian houses and see crocodiles (tea & pie provided)',
      'Buy Nubian galabeya and customs for the party',
      'Premium dinner on the Kendaka Nubain House',
      "New Year's Party ",
      '',
      'Day 2',
      'Breakfast on the Dahabya',
      'Boat trip to Philae Temple',
      'Visit Philae Temple',
      'Exploring hidden gems at Nubian Hesa Island',
      'Kayaking (optional)',
      'Premium dinner at Hesa Island',
      'back to Dahabiya for  the Nubian Party on deck',
      '',
      'Day 3',
      'Breakfast at the Dahabya ',
      'Felluca Ride to:',
      ' Abu Hawa Mountain (Hiking) ',
      ' Photos from the highest point in Aswan',
      ' Sailing boat on the Nile River',
      ' Visit to mafia island',
      ' Sand boarding',
      'premium Dinner on the Dahabya',
      'Free time & shopping in Nubian markets',
      '',
      'Day 4',
      'Breakfast',
      'Luxor Hot Air Balloon (optional)',
      'Abu Simbel visit (optional)',
      'Check-out',
      'Drop-off at train station'
    ],
    includes: [
      'Accommodation',
      'Private transportation in Nuba (cars & boats)',
      'Tour guide from Golden Egypt Team',
      'All activities mentioned',
      'All meals and drinks mentioned (all dinners on the Dahabya)',
      'Nubian Party "Galabeya"',
      "New Year's Party",
      'All tickets and permits required for the activities'
    ],
    excludes: [
      'Train / Flight tickets from/to Cairo-Aswan',
      'Extra meals and drinks',
      'Nubian party custom',
      'Personal expenses',
      'Medical services',
      'Kayaking',
      'Tips'
    ],
    fullDescription: "Nuba, located in Upper Egypt, is an enchanting destination for its rich cultural heritage and stunning natural landscapes. Discover the magic of Nubia and the grandeur of Abu Simbel — a journey through ancient temples, vibrant culture, and timeless landscapes along the Nile. Highlights include Philae Temple, visiting Nubian houses to watch crocodiles, Heissa Island, sunset from a secret spot, exploring local markets, Nubian Galabeya party, hidden gems, Abu Hawa Mountain hike, and shopping. The trip runs on 31/12 with New Year's celebrations on board the Dahabya.",
    galleryImages: [
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      galleryImg5,
      galleryImg6,
      galleryImg7,
      galleryImg8,
      galleryImg9,
      galleryImg10,
      galleryImg11,
      galleryImg12,
      galleryImg13,
      galleryImg14
    ]
  },
  {
    id: '14',
    title: 'ASWAN – NUBA LUXURY ESCAPE',
    description: 'Dahabya Experience - A unique Nubian luxury escape on a traditional Dahabya. Discover authentic Nubian culture in an exceptional 4-day journey.',
    image: nubaLuxuryEscapeImg,
    price: 9800,
    duration: '4 days',
    location: 'Aswan',
    city: 'Aswan',
    rating: 5.0,
    maxGuests: 20,
    featured: true,
    special: true,
    tourDate: '28th-31th January',
    itinerary: [
      'DAY 1 – ARRIVAL & NUBIAN VIBES',
      'Arrival in Aswan and private pick-up from the train station',
      'Check-in on the Dahabya and time to rest',
      'Special camel ride around the Nubian village',
      'Visit traditional Nubian houses and see crocodiles (tea and pie included)',
      'Shopping for Nubian Galabeya and accessories for the party',
      'Private Nubian Galabeya party on the Dahabya deck',
      'Premium dinner at Kendaka Nubian House',
      '',
      'DAY 2 – TEMPLES & ISLAND MOOD',
      'Breakfast on the Dahabya',
      'Private boat trip to Philae Temple',
      'Guided visit to Philae Temple',
      'Exploring hidden gems of Hesa Nubian Island',
      'Premium dinner with a panoramic view of Philae Temple',
      'Board games and relaxing evening on the Dahabya',
      '',
      'DAY 3 – ADVENTURE MODE',
      'Breakfast on the Dahabya',
      'Felucca ride to Abu Hawa Mountain',
      'Hiking and photos from the highest point in Aswan',
      'Sailing boat on the Nile River',
      'Kayaking on the Nile (optional)',
      'Visit to Mafia Island',
      'Sandboarding experience',
      'Premium dinner on the Dahabya',
      'Free time and shopping in old souq',
      '',
      'DAY 4 – DEPARTURE',
      'Breakfast',
      'Luxor Hot Air Balloon (optional)',
      'Abu Simbel visit (optional)',
      'Check-out',
      'Drop-off at the train station',
      'Foreigners extra supplement 110 Usd',
      'single room extra supplement 3.5k egp'
    ],
    includes: [
      'Golden tours team [Local]',
      'Accommodation on a fixed Dahabya',
      'Half Board meals',
      'Internal transportation in Nuba (cars & boats)',
      'All meals mentioned ',
      'Nubian Party "Galabeya"',
      'All tickets and permits required for the activities'
    ],
    excludes: [
      'Talgo train tickets',
      'Tips',
      'Drinks',
      'Luxor hot-air ballon overday ',
      'Abu Simbel',
      'Kayak ',
      'Personal expenses',
      'Nubian party custom'
    ],
    fullDescription: 'Nuba, located in Upper Egypt, is an enchanting destination for its rich cultural heritage and stunning natural landscapes. Discover the magic of Nubia and the grandeur of Abu Simbel — a journey through ancient temples, vibrant culture, and timeless landscapes along the Nile. Highlights include Philae Temple, visiting Nubian houses to watch crocodiles, Hesa Island, sunset from a secret spot, exploring local markets, Nubian Galabeya party, hidden gems, Abu Hawa Mountain hike, and shopping. Experience luxury on a traditional Dahabya with premium accommodations and authentic Nubian experiences.',
    galleryImages: [
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      galleryImg5,
      galleryImg6,
      galleryImg7,
      galleryImg8,
      galleryImg9,
      galleryImg10,
      galleryImg11,
      galleryImg12,
      galleryImg13,
      galleryImg14
    ]
  },
];

export const cities = ['All', 'Cairo', 'Alexandria', 'Luxor', 'Aswan'];

export const getFeaturedTours = () => tours.filter(tour => tour.featured);
export const getToursByCity = (city: string) => {
  let result = city === 'All' ? tours : tours.filter(tour => tour.city === city);
  // Reverse order for Aswan tours so newest appear first
  if (city === 'Aswan') {
    result = [...result].reverse();
  }
  return result;
};
export const getTourBySlug = (slug: string) =>
  tours.find(tour => getTourSlug(tour) === slug || tour.id === slug);

export const getSpecialTrip = () => tours.find(tour => tour.special);