import maldive from '../assets/maldive.jpg';
import safari from '../assets/safari.jpg';
import cruise from '../assets/cruise.jpg';
import swiss from '../assets/swiss.jpg';
import canion from '../assets/canion.jpg'

import paris from "../assets/paris.jpg";
import santorini from "../assets/santorini.jpg";
import dubai from "../assets/dubai.jpg";

export const offers = [
    {
      title: "Maldives Paradise",
      country: "Maldives",
      description: "Last minute deal including luxury hotel stay",
      price: "€4599",
      oldPrice: "€3299",
      departure: "2025-11-15",
      rating: 4.8,
      image: maldive,
    },
    {
      title: "African Safari",
      country: "Tanzania",
      description: "Special weekend package with guided tours",
      price: "€3799",
      oldPrice: "€2699",
      departure: "2025-01-05",
      rating: 4.9,
      image: safari,
    },
    {
      title: "Grand Canyon",
      country: "USA",
      description: "First-class flights with 5-star hotel accommodation",
      price: "€2199",
      oldPrice: "€1699",
      departure: "2025-03-05",
      rating: 4.7,
      image: canion,
    },
  ];


export const specialOffers = [
    {
      id: 1,
      name: "Maldives Paradise",
      location: "Indian Ocean",
      rating: 4.9,
      image: maldive,
      originalPrice: "€4,599",
      discountedPrice: "€3,299",
      discountPercentage: 28,
      description: "Exclusive overwater villa experience",
      category: "Luxury",
      validUntil: "31 Dec 2024",
      highlights: ["Private Beach", "Unlimited Spa", "Gourmet Dining"]
    },
    {
      id: 2,
      name: "African Safari Expedition",
      location: "Tanzania",
      rating: 4.8,
      image: safari,
      originalPrice: "€3,799",
      discountedPrice: "€2,699",
      discountPercentage: 29,
      description: "Immersive wildlife adventure",
      category: "Adventure",
      validUntil: "15 Jan 2025",
      highlights: ["Game Drives", "Luxury Camps", "Expert Guides"]
    },
    {
      id: 3,
      name: "Mediterranean Cruise",
      location: "Greece & Italy",
      rating: 4.7,
      image: cruise,
      originalPrice: "€2,999",
      discountedPrice: "€1,999",
      discountPercentage: 33,
      description: "All-inclusive luxury cruise experience with extended multi-destination itinerary",
      category: "Premium",
      validUntil: "28 Feb 2025",
      highlights: ["Multiple Destinations", "Onboard Entertainment", "Gourmet Cuisine"]
    },
    {
      id: 4,
      name: "Swiss Alps Ski Retreat",
      location: "Switzerland",
      rating: 4.9,
      image: swiss,
      originalPrice: "€3,299",
      discountedPrice: "€2,399",
      discountPercentage: 27,
      description: "Exclusive ski resort with panoramic views",
      category: "Luxury",
      validUntil: "30 Mar 2025",
      highlights: ["Ski-in/Ski-out", "Luxury Chalet", "Spa & Wellness"]
    }
  ];