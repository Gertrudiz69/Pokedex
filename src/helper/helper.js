import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const primeraMayuscula = (word) => {
  return word[0].toUpperCase() + word.substring(1)
}

export const scrollToTop = () => {
  useEffect(() => {
  
  })
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}