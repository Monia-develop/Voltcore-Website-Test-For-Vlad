import React from "react";
import Logo from "../../assets/logo.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Voltcore", link: "/about" },
  { id: 3, name: "Technology", link: "/technology" },
  { id: 4, name: "Industries", link: "/industries" },
  { id: 5, name: "Products", link: "/products" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="sticky top-0 left-0 w-full z-[9999] bg-white dark:bg-black text-black dark:text-white shadow-md duration-300">
      <div className="container mx-auto px-6 py-4 md:py-3">
        <div className="flex justify-between items-center">

          {/* section logo */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Voltcore Logo" className="h-8 dark:invert transition-all duration-300" />
          </div>

          {/* Section Menu PC */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link }) => (
                <li key={id}>
                  <Link
                    to={link}
                    /* UPDATE : Remplacement du orange par ton bleu/violet officiel */
                    className="text-lg font-semibold hover:text-[#3b82f6] py-2 hover:border-b-2 hover:border-[#bc13fe] transition-all duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <DarkMode />
            </ul>
          </nav>

          {/* Section Mobile (Boutons d'action) */}
          <div className="md:hidden block">
            <div className="flex items-center gap-4">
              <DarkMode />
              {showMenu ? (
                <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer text-[#3b82f6]" size={30} />
              ) : (
                <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer" size={30} />
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ================= AJOUT : LE MENU DÉROULANT MOBILE ================= */}
      <div 
        className={`md:hidden absolute left-0 w-full bg-zinc-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-900 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          showMenu ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-5 px-8">
          {NavLinks.map(({ id, name, link }) => (
            <li key={id}>
              <Link
                to={link}
                onClick={() => setShowMenu(false)} /* Ferme le menu automatiquement quand on clique sur un lien */
                className="block text-xl font-bold tracking-wide py-2 border-l-4 border-transparent hover:border-[#3b82f6] hover:pl-3 hover:text-[#3b82f6] transition-all duration-200"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Navbar;