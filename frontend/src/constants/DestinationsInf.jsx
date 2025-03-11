import santorini from '../assets/santorini.jpg';
import bali from '../assets/bali.jpg';
import swiss from '../assets/swiss.jpg';
import dubai from '../assets/dubai.jpg';

export const destinations = [
    {
      id: 1,
      name: "Santorini Dreams",
      location: "Greece",
      rating: 4.9,
      image: santorini,
      price: "€2,299",
      description: "Luxurious cliffside villas with infinity pools",
      category: "Summer",
      weather: "24°C",
      activities: ["Sailing", "Wine Tasting", "Sunset Tours"],
      slug: "santorini-dreams"
    },
    {
      id: 2,
      name: "Bali Serenity",
      location: "Indonesia",
      rating: 4.8,
      image: bali,
      price: "€1,899",
      description: "Spiritual journey in tropical paradise",
      category: "Tropical",
      weather: "29°C",
      activities: ["Yoga", "Surfing", "Temple Visits"],
      slug: "bali-serenity"
    },
    {
      id: 3,
      name: "Swiss Alps",
      location: "Switzerland",
      rating: 4.9,
      image: swiss,
      price: "€3,499",
      description: "Exclusive mountain retreat with panoramic views",
      category: "Mountains",
      weather: "12°C",
      activities: ["Skiing", "Hiking", "Spa"]
    },
    {
      id: 4,
      name: "Dubai Opulence",
      location: "UAE",
      rating: 4.8,
      image: dubai,
      price: "€4,299",
      description: "Ultimate luxury in the heart of Dubai",
      category: "Cities",
      weather: "32°C",
      activities: ["Shopping", "Desert Safari", "Fine Dining"]
    }
  ];


import paris from "../assets/paris.jpg";
import tokyo from "../assets/tokyo.jpg";
import barcelona from "../assets/barcelona.jpg";
import maldive from "../assets/maldive.jpg";


export const topDestinations = [
    {
      city: "Santorini",
      country: "Greece",
      price: 399,
      rating: 4.9,
      image: santorini,
    },
    { city: "Dubai", country: "UAE", price: 499, rating: 4.7, image: dubai },
    { city: "Tokyo", country: "Japan", price: 699, rating: 4.9, image: tokyo },
  ];
