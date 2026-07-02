import Product from "../models/Product.js";
import Testimonial from "../models/Testimonial.js";

const products = [
  {
    name: "Idli Batter",
    description: "Soft, fluffy idlis every time with our stone-ground batter.",
    tagline: "Soft, Fluffy & Perfect Idlis",
    price: 140,
    imageUrl:
      "https://images.unsplash.com/photo-1589301760012-d265a3720a8?w=600&h=400&fit=crop",
    category: "batters" as const,
    features: [
      "Less Water, More Batter",
      "Naturally Fermented",
      "Store in Fridge (2-4 Days)",
    ],
    isVeg: true,
    banner: "EASY STORAGE IN CONTAINER",
  },
  {
    name: "Rice Batter",
    description: "Perfect for crispy dosas and soft uttapams.",
    tagline: "Crispy Dosa, Every Time",
    price: 140,
    imageUrl:
      "https://images.unsplash.com/photo-1630384060421-cb20d6617650?w=600&h=400&fit=crop",
    category: "batters" as const,
    features: [
      "No Preservatives",
      "Stone Ground",
      "Ready to Use",
    ],
    isVeg: true,
    banner: "EASY STORAGE IN CONTAINER",
  },
  {
    name: "Millet & Moong",
    description: "Healthy millet batter blended with moong dal goodness.",
    tagline: "Nutritious & Wholesome",
    price: 160,
    imageUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880f84?w=600&h=400&fit=crop",
    category: "batters" as const,
    features: [
      "High Protein",
      "Naturally Fermented",
      "Gluten Free",
    ],
    isVeg: true,
    banner: "EASY STORAGE IN CONTAINER",
  },
  {
    name: "Classic Chole Bhature",
    description: "Rich, spiced chole with fluffy bhature — a comfort classic.",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1626074353762-517a5e7e1a49?w=600&h=400&fit=crop",
    category: "combos" as const,
    features: ["Freshly Made", "No Preservatives", "Serves 2"],
    isVeg: true,
    isNew: true,
  },
  {
    name: "Classic Dal Makhani",
    description: "Slow-cooked black lentils in a creamy, buttery gravy.",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
    category: "combos" as const,
    features: ["Homemade", "Rich & Creamy", "Serves 2"],
    isVeg: true,
  },
  {
    name: "Veg Keema",
    description: "Minced vegetable keema with aromatic spices.",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    category: "combos" as const,
    features: ["Protein Rich", "Fresh Spices", "Serves 2"],
    isVeg: true,
  },
  {
    name: "Festive Thali",
    description: "The ultimate festive spread with rice, dal, sabzi, roti & dessert.",
    price: 349,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    category: "combos" as const,
    features: ["Complete Meal", "Fresh Daily", "Serves 2-3"],
    isVeg: true,
  },
  {
    name: "Royal Chicken Thali",
    description: "Tender chicken curry with rice, roti, raita and salad.",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1603894584375-5e2e15b1e6d7?w=600&h=400&fit=crop",
    category: "combos" as const,
    features: ["Premium Quality", "Complete Meal", "Serves 2"],
    isVeg: false,
  },
  {
    name: "Dry Cake Vanilla",
    description: "Soft, moist vanilla cake baked with pure ingredients.",
    price: 239,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    category: "cakes" as const,
    features: ["No Preservatives", "Freshly Baked", "500g"],
    isVeg: true,
  },
  {
    name: "Chocolate Dry Cake",
    description: "Soft, moist, decadent chocolate cake for every occasion.",
    price: 259,
    imageUrl:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop",
    category: "cakes" as const,
    features: ["Rich Cocoa", "Freshly Baked", "500g"],
    isVeg: true,
  },
  {
    name: "Jaggery & Jowar",
    description: "Wholesome cake sweetened with jaggery and jowar flour.",
    price: 249,
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5a3?w=600&h=400&fit=crop",
    category: "cakes" as const,
    features: ["No Refined Sugar", "Gluten Friendly", "500g"],
    isVeg: true,
  },
  {
    name: "Atta Biscuits",
    description: "Crunchy whole wheat biscuits with a hint of cardamom.",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop",
    category: "biscuits" as const,
    features: ["Whole Wheat", "No Preservatives", "250g"],
    isVeg: true,
  },
  {
    name: "Nankhatai",
    description: "Traditional melt-in-mouth nankhatai biscuits.",
    price: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-d6f846ee9153?w=600&h=400&fit=crop",
    category: "biscuits" as const,
    features: ["Homemade", "Pure Ghee", "300g"],
    isVeg: true,
  },
  {
    name: "Atta Maida Mix",
    description: "A perfect blend of atta and maida for light, crispy biscuits.",
    price: 170,
    imageUrl:
      "https://images.unsplash.com/photo-1590080875515-8a3e8a4521f3?w=600&h=400&fit=crop",
    category: "biscuits" as const,
    features: ["Light & Crispy", "Freshly Baked", "250g"],
    isVeg: true,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    quote:
      "The idli batter is absolutely perfect! My family can't tell the difference from homemade. Fresh, fluffy idlis every morning.",
    bgColor: "#FDF8F1",
  },
  {
    name: "Rahul Mehta",
    quote:
      "Best dosa batter in Gurugram. Crispy on the outside, soft inside — exactly how we like it at home.",
    imageUrl:
      "https://images.unsplash.com/photo-1630384060421-cb20d6617650?w=400&h=300&fit=crop",
    bgColor: "#E8F5E9",
  },
  {
    name: "Anita Verma",
    quote:
      "The combo meals are a lifesaver on busy weekdays. Tastes just like home-cooked food. Highly recommend!",
    bgColor: "#5D4037",
  },
  {
    name: "Deepak Singh",
    quote:
      "Ordered the festive thali for Diwali — everyone loved it. Generous portions and authentic flavors.",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    bgColor: "#FDF8F1",
  },
  {
    name: "Meera Kapoor",
    quote:
      "Their vanilla dry cake is my go-to gift for friends. Moist, delicious, and made with pure ingredients.",
    bgColor: "#E8F5E9",
  },
  {
    name: "Vikram Joshi",
    quote:
      "Hygiene and quality you can trust. We've been ordering batters weekly for 3 months now.",
    bgColor: "#FDF8F1",
  },
];

export const seedDatabase = async () => {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(products);
    console.log("✅ Products seeded");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(testimonials);
    console.log("✅ Testimonials seeded");
  }
};
