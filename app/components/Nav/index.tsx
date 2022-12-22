import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { a, config, useSpring } from "@react-spring/web";

const useNavbarVisibility = () => {
  const [showNav, setShowNav] = useState(false);
  const springProps = useSpring({
    config: config.wobbly,
    from: { transform: "translateY(100%)" },
    to: { transform: showNav ? "translateY(0)" : "translateY(100%)" },
  });

  return {
    springProps,
    toggleVisibility: (bool: boolean) => setShowNav(bool || !showNav),
  };
};

export const Nav = () => {
  const { springProps, toggleVisibility } = useNavbarVisibility();

  useEffect(() => {
    toggleVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a.nav
      className={`[grid-area:nav] bg-slate-700 relative w-full flex items-center px-4 justify-evenly md:flex-col md:py-10 md:h-full`}
      style={springProps}
      role="navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          Home
        </Link>
        <Link
          to="/explore"
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          onClick={() => toggleVisibility(false)}
        >
          Explore
        </Link>
      </div>
    </a.nav>
  );
};
