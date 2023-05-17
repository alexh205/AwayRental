const Footer = () => {
  return (
    <footer className="z-40 w-full bottom-0 py-20 bg-site-light dark:bg-site-black">
      <div className="flex items-center justify-center">
        <p className="pb-4 text-xs text-site-textlight text-center dark:text-site-textdark">
          Discover your perfect stay. <br />
          Find and book accommodations worldwide
          with ease on our comprehensive online
          platform.
        </p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-xs font-medium text-site-textlight text-semibold px-4 py-1 border rounded-md hover:bg-site-ablue hover:text-gray-200 hover:scale-105 transition-all duration-300 ease-in-out dark:text-site-textdark dark:border-site-ablue">
          <a href="https://github.com/alexh205">
            About
          </a>
        </div>
        <div className="text-xs font-medium text-site-textlight text-semibold px-4 py-1 border rounded-md hover:bg-site-ablue hover:text-gray-200 hover:scale-105 transition-all duration-300 ease-in-out dark:text-site-textdark dark:border-site-ablue">
          <a href="https://github.com/alexh205/AwayRental">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
