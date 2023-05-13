const Footer = () => {
  return (
    <footer className="z-40 w-full bottom-0 py-20 mt-24 bg-[#fafafa]">
      <div className="flex items-center justify-center">
        <p className="pb-4 text-xs text-gray-400 text-center">
          Discover your perfect stay. <br />
          Find and book accommodations worldwide
          with ease on our comprehensive online
          platform.
        </p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-xs font-medium text-gray-800 text-semibold px-4 py-1 border rounded-md hover:bg-slate-800 hover:text-gray-200">
          <a href="https://github.com/alexh205">
            About
          </a>
        </div>
        <div className="text-xs font-medium text-gray-800 text-semibold px-4 py-1 border rounded-md hover:bg-slate-800 hover:text-gray-200">
          <a href="https://github.com/alexh205/AwayRental">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
