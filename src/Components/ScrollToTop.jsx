import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ramène la page à la position (x: 0, y: 0) instantanément
    window.scrollTo(0, 0);
  }, [pathname]); // Se déclenche dès que le chemin change

  return null;
}