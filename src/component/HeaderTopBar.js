 
const HeaderTopBar = () => {
  return (
    <>
    <div className="bg-[#800000] text-white text-sm py-2 px-4 flex flex-col md:flex-row md:justify-between items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <span className="font-semibold">Opening Hours:</span> Mon - Sat: 9 AM - 7 PM
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-right">
          <div>
            <span className="font-semibold">Call:</span> +91 98765 43210
          </div>
          <div>
            <span className="font-semibold">Email:</span> contact@jyothidental.com
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeaderTopBar;
