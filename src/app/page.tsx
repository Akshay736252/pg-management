"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function LandingPage() {
  // All hooks at the top
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [statsStarted, setStatsStarted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [typedText, setTypedText] = useState('');
  const fullText = "Your Home Away From Home";
  const typewriterTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle scroll for back-to-top button
  // Typewriter effect - FIXED VERSION
useEffect(() => {
  let i = 0;
  const typeWriter = () => {
    if (i < fullText.length) {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      typewriterTimeout.current = setTimeout(typeWriter, 100);
    }
  };
  typeWriter();

  return () => {
    if (typewriterTimeout.current) {
      clearTimeout(typewriterTimeout.current);
    }
  };
}, []);

  // Dark mode persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        typewriterTimeout.current = setTimeout(typeWriter, 100);
      }
    };
    typeWriter();

    return () => {
      if (typewriterTimeout.current) {
        clearTimeout(typewriterTimeout.current);
      }
    };
  }, []);

  // Cursor follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Stats with counters
  const stats = [
    { icon: "fa-building", value: 25, label: "Total Rooms", suffix: "", color: "from-blue-500 to-blue-600" },
    { icon: "fa-users", value: 18, label: "Happy Residents", suffix: "", color: "from-green-500 to-green-600" },
    { icon: "fa-bed", value: 7, label: "Available Beds", suffix: "", color: "from-purple-500 to-purple-600" },
    { icon: "fa-shield-alt", value: 24, label: "Security", suffix: "/7", color: "from-orange-500 to-orange-600" },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    if (statsInView && !statsStarted) {
      setStatsStarted(true);
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = end;
              return newCounters;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.floor(start);
              return newCounters;
            });
          }
        }, 16);
      });
    }
  }, [statsInView, statsStarted, stats]);

  // Features data
  const features = [
    {
      icon: "fa-home",
      title: "Premium Rooms",
      description: "Fully furnished rooms with modern amenities and comfortable beds",
      color: "blue"
    },
    {
      icon: "fa-utensils",
      title: "Healthy Meals",
      description: "Nutritious breakfast, lunch, and dinner with Sunday specials",
      color: "green"
    },
    {
      icon: "fa-shield-alt",
      title: "24/7 Security",
      description: "CCTV surveillance and security guards for your safety",
      color: "purple"
    },
    {
      icon: "fa-clock",
      title: "Flexible Timing",
      description: "No curfew, flexible entry/exit with digital access",
      color: "pink"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Akshay Kanojia",
      role: "Student, Room 15",
      content: "Best PG I've ever stayed in! Clean rooms, great food, and very cooperative staff.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Aryan Singh",
      role: "Student, Room 18",
      content: "The digital management system is amazing. Easy to raise complaints and track everything.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Ankit Kumar",
      role: "Student, Room 21",
      content: "Sunday special meals are the best! Feels like home away from home.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('login-dropdown');
      const button = document.getElementById('login-button');
      if (dropdown && button && 
          !dropdown.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        setShowLoginDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth scroll with offset
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      {/* Custom Cursor Follower */}
      <motion.div
        className="fixed w-8 h-8 bg-blue-500 rounded-full mix-blend-multiply filter blur-md opacity-50 pointer-events-none z-50"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 100, damping: 30 },
          y: { type: "spring", stiffness: 100, damping: 30 },
          scale: { duration: 2, repeat: Infinity }
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Custom CSS */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        }

        /* Navigation */
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          animation: slideDown 0.5s ease-out;
        }

        .dark .navbar {
          background: rgba(17, 24, 39, 0.95);
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo i {
          font-size: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .dark .nav-links a {
          color: #e5e7eb;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }

        .nav-links a:hover {
          color: #667eea;
        }

        .dark .nav-links a:hover {
          color: #93c5fd;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .theme-toggle {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #4a5568;
          transition: transform 0.3s ease;
        }

        .dark .theme-toggle {
          color: #e5e7eb;
        }

        .theme-toggle:hover {
          transform: rotate(180deg);
        }

        .login-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white !important;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          animation: pulse 2s infinite;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .login-btn::after {
          display: none;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 4px 25px rgba(102, 126, 234, 0.8);
          }
          100% {
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 6rem 2rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(102, 126, 234, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          margin-bottom: 2rem;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .trust-badge i {
          color: #667eea;
        }

        .trust-badge span {
          font-weight: 600;
          color: #667eea;
        }

        .dark .trust-badge {
          background: rgba(59, 130, 246, 0.2);
        }

        .hero h1 {
          font-size: 4rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero p {
          font-size: 1.2rem;
          color: #718096;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .dark .hero p {
          color: #9ca3af;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-primary i {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover i {
          transform: translateX(5px);
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dark .btn-secondary {
          color: #93c5fd;
          border-color: #93c5fd;
        }

        .btn-secondary:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .hero-image {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .hero-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .floating-card {
          position: absolute;
          bottom: -30px;
          left: -30px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: pulse 3s infinite;
        }

        .dark .floating-card {
          background: rgba(31, 41, 55, 0.95);
          color: white;
        }

        .floating-card i {
          font-size: 2rem;
          color: #667eea;
        }

        .floating-card h4 {
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }

        .floating-card p {
          margin: 0;
          color: #718096;
        }

        .dark .floating-card p {
          color: #9ca3af;
        }

        /* Stats Section */
        .stats {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          animation: fadeInScale 0.5s ease-out forwards;
          opacity: 0;
          transform: scale(0.5);
        }

        .stat-item:nth-child(1) { animation-delay: 0.1s; }
        .stat-item:nth-child(2) { animation-delay: 0.3s; }
        .stat-item:nth-child(3) { animation-delay: 0.5s; }
        .stat-item:nth-child(4) { animation-delay: 0.7s; }

        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stat-item i {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .stat-item h3 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .stat-item p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* Features Section */
        .features {
          padding: 6rem 2rem;
          background: white;
        }

        .dark .features {
          background: #1f2937;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .dark .section-header h2 {
          color: white;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
        }

        .dark .section-header p {
          color: #9ca3af;
        }

        .features-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .dark .feature-card {
          background: #374151;
          color: white;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-card:hover::before {
          transform: translateX(0);
        }

        .feature-card i {
          font-size: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: #718096;
          line-height: 1.6;
        }

        .dark .feature-card p {
          color: #9ca3af;
        }

        /* Testimonials Section */
        .testimonials {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }

        .dark .testimonials {
          background: #111827;
        }

        .testimonials-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .dark .testimonial-card {
          background: #1f2937;
          color: white;
        }

        .testimonial-card:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 20px;
          font-size: 6rem;
          color: rgba(102, 126, 234, 0.1);
          font-family: serif;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-header img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #667eea;
        }

        .testimonial-header h4 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .dark .testimonial-header h4 {
          color: white;
        }

        .testimonial-header p {
          color: #718096;
          font-size: 0.9rem;
        }

        .dark .testimonial-header p {
          color: #9ca3af;
        }

        .testimonial-card p {
          color: #4a5568;
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .dark .testimonial-card p {
          color: #d1d5db;
        }

        .rating {
          color: #ffd700;
        }

        .rating i {
          margin-right: 0.25rem;
        }

        /* CTA Section */
        .cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" fill="white" fill-opacity="0.1"/></svg>');
          opacity: 0.1;
          animation: slide 20s linear infinite;
        }

        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(60px);
          }
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta h2 {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: fadeInDown 1s ease-out;
        }

        .cta p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .cta .btn-primary {
          background: white;
          color: #667eea;
        }

        .cta .btn-secondary {
          border-color: white;
          color: white;
        }

        .cta .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Newsletter Section */
        .newsletter {
          padding: 4rem 2rem;
          background: white;
        }

        .dark .newsletter {
          background: #1f2937;
        }

        .newsletter-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .newsletter h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .dark .newsletter h3 {
          color: white;
        }

        .newsletter p {
          color: #718096;
          margin-bottom: 2rem;
        }

        .dark .newsletter p {
          color: #9ca3af;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .dark .newsletter-input {
          background: #374151;
          border-color: #4b5563;
          color: white;
        }

        .newsletter-input:focus {
          border-color: #667eea;
        }

        .newsletter-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .newsletter-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .newsletter-status {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 10px;
          animation: slideUp 0.3s ease;
        }

        .newsletter-status.success {
          background: #d4edda;
          color: #155724;
        }

        .newsletter-status.error {
          background: #fee;
          color: #e53e3e;
        }

        /* Footer */
        footer {
          background: #1a202c;
          color: white;
          padding: 4rem 2rem 2rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
        }

        .footer-section h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .footer-section p {
          color: #a0aec0;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateY(-3px);
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.75rem;
        }

        .footer-section ul li a {
          color: #a0aec0;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: white;
          padding-left: 5px;
        }

        .footer-section ul li i {
          width: 20px;
          margin-right: 0.5rem;
          color: #667eea;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid #2d3748;
          text-align: center;
          color: #a0aec0;
        }

        /* Back to Top Button */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 99;
        }

        .back-to-top.show {
          opacity: 1;
          visibility: visible;
        }

        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.6);
        }

        /* Live Chat Widget */
        .chat-widget {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 99;
        }

        .chat-button {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          animation: pulse 2s infinite;
          transition: all 0.3s;
        }

        .chat-button:hover {
          transform: scale(1.1);
        }

        .chat-button i {
          color: white;
          font-size: 1.5rem;
        }

        .chat-box {
          position: absolute;
          bottom: 80px;
          left: 0;
          width: 300px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        .dark .chat-box {
          background: #1f2937;
          color: white;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          font-weight: 600;
        }

        .chat-body {
          padding: 1rem;
          max-height: 200px;
          overflow-y: auto;
        }

        .chat-message {
          background: #f0f0f0;
          padding: 0.5rem;
          border-radius: 10px;
          margin-bottom: 0.5rem;
        }

        .dark .chat-message {
          background: #374151;
          color: white;
        }

        .chat-input {
          display: flex;
          padding: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        .dark .chat-input {
          border-color: #4b5563;
        }

        .chat-input input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          outline: none;
        }

        .dark .chat-input input {
          background: #374151;
          border-color: #4b5563;
          color: white;
        }

        .chat-input button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          margin-left: 0.5rem;
          cursor: pointer;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero h1 {
            font-size: 3rem;
          }
          .features-grid,
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            justify-content: center;
          }
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .features-grid,
          .testimonials-grid,
          .footer-container {
            grid-template-columns: 1fr;
          }
          .floating-card {
            display: none;
          }
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <i className="fas fa-home"></i>
            <span>Ek Onker Boys PG</span>
          </Link>
          <div className="nav-links">
            <a href="/#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
            <a href="/#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
            <a href="/#rooms" onClick={(e) => handleSmoothScroll(e, '#rooms')}>Rooms</a>
            <a href="/#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
            
            <button onClick={toggleDarkMode} className="theme-toggle">
              <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
            </button>
            
            {/* Login Dropdown */}
            <div className="relative">
              <button
                id="login-button"
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="login-btn flex items-center gap-2"
              >
                Login
                <i className={`fas fa-chevron-${showLoginDropdown ? 'up' : 'down'}`}></i>
              </button>
              
              <AnimatePresence>
                {showLoginDropdown && (
                  <motion.div
                    id="login-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link
                      href="/login/student-login.html"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => setShowLoginDropdown(false)}
                    >
                      <i className="fas fa-user-graduate mr-2"></i>
                      Student Login
                    </Link>
                    <Link
                      href="/login/manager-login.html"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400"
                      onClick={() => setShowLoginDropdown(false)}
                    >
                      <i className="fas fa-user-tie mr-2"></i>
                      Manager Login
                    </Link>
                    <Link
                      href="/login/owner-login.html"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900 hover:text-purple-600 dark:hover:text-purple-400"
                      onClick={() => setShowLoginDropdown(false)}
                    >
                      <i className="fas fa-crown mr-2"></i>
                      Owner Login
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="hero-content"
          >
            <div className="trust-badge">
              <i className="fas fa-star"></i>
              <span>Trusted by 1000+ Students</span>
            </div>
            <h1>
              <span className="gradient-text">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
            <p>Experience luxury living with our premium PG accommodations. Fully furnished rooms, healthy meals, and a vibrant community.</p>
            <div className="hero-buttons">
              <Link href="/login/student-login.html" className="btn-primary">
                Get Started
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image"
          >
            <img 
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="PG Interior" 
              loading="lazy"
            />
            <motion.div 
              className="floating-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <i className="fas fa-users"></i>
              <div>
                <h4>18 Active Residents</h4>
                <p>Join our community</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={statsRef}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={fadeInScale}
              className="stat-item"
            >
              <i className={`fas ${stat.icon}`}></i>
              <h3>{counters[index]}{stat.suffix}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2><span className="gradient-text">Why Choose PG Life?</span></h2>
          <p>We provide the best facilities and services to make your stay comfortable and memorable.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              ref={featuresRef}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="feature-card"
            >
              <i className={`fas ${feature.icon}`}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2><span className="gradient-text">What Our Residents Say</span></h2>
          <p>Hear from students who made PG Life their home</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="testimonial-card"
            >
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <p>"{testimonial.content}"</p>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Experience Premium Living?</h2>
          <p>Join our community of happy residents. Limited rooms available!</p>
          <div className="cta-buttons">
            <Link href="/login/student-login.html" className="btn-primary">
              Book Your Room Now
              <i className="fas fa-arrow-right"></i>
            </Link>
            <button className="btn-secondary">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-container">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for latest updates and offers</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="newsletter-btn"
              disabled={newsletterStatus === 'loading'}
            >
              {newsletterStatus === 'loading' ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="newsletter-status success"
            >
              <i className="fas fa-check-circle mr-2"></i>
              Successfully subscribed!
            </motion.div>
          )}
          {newsletterStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="newsletter-status error"
            >
              <i className="fas fa-exclamation-circle mr-2"></i>
              Something went wrong. Please try again.
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <h3>PG Life</h3>
            <p>Premium PG accommodations for students and working professionals.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/akshaykanojia957gmail.com7" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/KanojiaAks58597" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/_wish_master_0207/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/akshay-kanojia-b84687289/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Rooms</a></li>
              <li><a href="#">Amenities</a></li>
              <li><a href="#">Gallery</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> B-1563 Indira Nagar Lucknow</li>
              <li><i className="fas fa-phone"></i> +91 7800722429</li>
              <li><i className="fas fa-envelope"></i> akshaykanojia957@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PG Life. All rights reserved.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.button>

      {/* Live Chat Widget */}
      <div className="chat-widget">
        <motion.div 
          className="chat-button"
          onClick={() => setShowChat(!showChat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-comment"></i>
        </motion.div>
        
        <AnimatePresence>
          {showChat && (
            <motion.div
              className="chat-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="chat-header">
                <i className="fas fa-headset mr-2"></i>
                Live Support
              </div>
              <div className="chat-body">
                <div className="chat-message">
                  <strong>Support:</strong> Hello! How can I help you today?
                </div>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}