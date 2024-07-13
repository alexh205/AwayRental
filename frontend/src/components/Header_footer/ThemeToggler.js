import React from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

function ThemeToggler() {
  const { theme, setTheme, systemTheme } =
    useTheme();
  const currentTheme =
    theme === "system" ? systemTheme : theme;
  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const togglerRef = React.useRef(null);

  React.useEffect(() => {
    const currentTheme =
      theme === "system" ? systemTheme : theme;
    if (togglerRef.current && currentTheme) {
      togglerRef.current.checked =
        currentTheme === "dark";
      setTheme(currentTheme);
    }
  }, [theme, systemTheme, setTheme, togglerRef]);
  return (
    <label
      htmlFor="large-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        ref={togglerRef}
        type="checkbox"
        value=""
        id="large-toggle"
        className="sr-only peer"
        onChange={toggleTheme}
      />
      <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-site-black dark:border-site-black peer-checked:bg-gray-600"></div>

      <div className="peer-checked:translate-x-full peer-checked:border-white absolute top-0.4 left-[4px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all flex justify-center items-center">
        {(theme === "system"
          ? systemTheme
          : theme) === "dark" ? (
          <HiSun className="text-black dark:text-site-black" />
        ) : (
          <HiMoon className="text-black dark:text-site-black" />
        )}
      </div>
    </label>
  );
}

export default ThemeToggler;
