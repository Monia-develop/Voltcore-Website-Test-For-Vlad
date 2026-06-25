import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = () => {
  // Récupère le thème initial sauvegardé ou choisit "light" par défaut
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Accès à l'élément racine <html>
  const element = document.documentElement;

  // Gère l'application de la classe dark sur la balise HTML dès que le thème change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]); // Le [theme] ici est crucial pour que React écoute le clic sur le bouton !

  return (
    <div className="flex items-center justify-center">
      {theme === "dark" ? (
        <BiSolidSun
          className="text-2xl cursor-pointer text-yellow-400 hover:scale-110 transition-transform duration-200"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BiSolidMoon
          className="text-2xl cursor-pointer text-slate-700 hover:scale-110 transition-transform duration-200"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default DarkMode;