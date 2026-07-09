'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BannerHomePpal from './BannerHomePpal';

const SLIDE_HEIGHT = { xs: 'auto', md: '500px' };
const AUTOPLAY_MS = 6000;

const imageSlides = [
  { src: '/carouselasegal1.jpeg', alt: 'Asegal B&F' },
  { src: '/carouselasegal2.jpeg', alt: 'Asegal B&F' },
];

const TOTAL_SLIDES = 1 + imageSlides.length;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => {
    setIndex(((i % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  const handlePrev = () => goTo(index - 1);
  const handleNext = useCallback(() => goTo(index + 1), [index, goTo]);

  useEffect(() => {
    const timer = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          width: `${TOTAL_SLIDES * 100}%`,
          transform: `translateX(-${(index * 100) / TOTAL_SLIDES}%)`,
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        <Box sx={{ width: `${100 / TOTAL_SLIDES}%`, flexShrink: 0 }}>
          <BannerHomePpal />
        </Box>

        {imageSlides.map((slide) => (
          <Box
            key={slide.src}
            sx={{
              width: `${100 / TOTAL_SLIDES}%`,
              flexShrink: 0,
              position: 'relative',
              minHeight: { xs: '300px', md: SLIDE_HEIGHT.md },
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(24, 20, 140, 0.15)',
              backgroundColor: '#f5f5f5',
              padding: '0.5rem',
              boxSizing: 'border-box',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              quality={90}
              sizes="100vw"
            />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        aria-label="Anterior"
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          background: '#fff',
          boxShadow: 3,
          '&:hover': { background: '#f4f6fa' },
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: '#18148C' }} />
      </IconButton>

      <IconButton
        onClick={handleNext}
        aria-label="Siguiente"
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          background: '#fff',
          boxShadow: 3,
          '&:hover': { background: '#f4f6fa' },
        }}
      >
        <ArrowForwardIosIcon sx={{ color: '#18148C' }} />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              cursor: 'pointer',
              backgroundColor: i === index ? '#18148C' : 'rgba(255,255,255,0.7)',
              border: '1px solid #18148C',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroCarousel;
