const phone = "";
const earbuds = "";
const watch = "";
const charger = "";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  colors: string[];
};

export const products: Product[] = [
  {
    id: "blue-apple-pro",
    name: "Blue Apple Pro",
    category: "Smartphones",
    price: 999,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 1284,
    image: phone,
    tagline: "Built for what's next.",
    description: "A breakthrough display, titanium frame, and the fastest chip ever in a Blue Apple phone.",
    specs: [
      { label: "Display", value: "6.7\" Super Retina XDR" },
      { label: "Chip", value: "BA-A18 Bionic" },
      { label: "Camera", value: "48MP Triple System" },
      { label: "Battery", value: "Up to 29h video" },
      { label: "Storage", value: "256GB" },
    ],
    colors: ["#0A84FF", "#1d1d1f", "#f5f5f7"],
  },
  {
    id: "buds-air",
    name: "Buds Air Pro",
    category: "Earbuds",
    price: 249,
    rating: 4.8,
    reviews: 942,
    image: earbuds,
    tagline: "Sound, distilled.",
    description: "Adaptive audio, active noise cancellation, and all-day comfort in a magnetic case.",
    specs: [
      { label: "Driver", value: "Custom 11mm Dynamic" },
      { label: "Battery", value: "30h with case" },
      { label: "ANC", value: "Adaptive Active" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
    ],
    colors: ["#1d1d1f", "#f5f5f7"],
  },
  {
    id: "watch-edge",
    name: "Watch Edge",
    category: "Smartwatches",
    price: 399,
    rating: 4.7,
    reviews: 612,
    image: watch,
    tagline: "Time, redesigned.",
    description: "Always-on Retina display, advanced health sensors and 36-hour battery life.",
    specs: [
      { label: "Display", value: "Always-On Retina" },
      { label: "Battery", value: "36 hours" },
      { label: "Health", value: "ECG • SpO₂ • Sleep" },
      { label: "Water Resist.", value: "50m" },
    ],
    colors: ["#0A84FF", "#1d1d1f"],
  },
  {
    id: "charge-mag",
    name: "ChargeMag 30W",
    category: "Chargers",
    price: 59,
    rating: 4.8,
    reviews: 388,
    image: charger,
    tagline: "Power, perfectly placed.",
    description: "Magnetic alignment, 30W fast wireless charging, premium aluminum body.",
    specs: [
      { label: "Output", value: "30W Fast Charge" },
      { label: "Compatibility", value: "Qi2 + MagSafe" },
      { label: "Material", value: "CNC Aluminum" },
    ],
    colors: ["#1d1d1f", "#f5f5f7"],
  },
];

export const categories = [
  { name: "Smartphones", icon: "📱", slug: "smartphones" },
  { name: "Earbuds", icon: "🎧", slug: "earbuds" },
  { name: "Smartwatches", icon: "⌚", slug: "smartwatches" },
  { name: "Chargers", icon: "🔋", slug: "chargers" },
  { name: "Cases", icon: "📦", slug: "cases" },
  { name: "Gaming", icon: "🎮", slug: "gaming" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
