
// function Mobile() {
//     return (
//         <>



//             <div className="lg:hidden  block  h-12 w-full flex  items-center justify-between sticky top-0 z-[1000] rounded-b-2xl ">


//                 <div className=" h-10 w-60 "><img className="w-full h-full " src="images/Logo/dynamicLeo.png" alt="" /></div>





//                 <div className="flex  ">

//                     <div className="relative group/1  flex items-center justify-center    p-4 lg:invisible">

//                         <i className="fa-solid fa-bars scale-[1.5] text-blue-700  "></i>

//                         <div className=" absolute invisible group-hover/1:visible mt-[245px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-20">
//                             <a className="block  px-6 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="/Home">Home</a>


//                             <div className="  group  flex items-center justify-center ">

//                                 <a className="   block  py-2 hover:bg-gray-100 transition-colors pr-24
//                             text-gray-600 " href="/WaterTransport"><i className="fa-solid fa-arrow-left pt-1 pr-2"></i>Services</a>

//                                 <div className="absolute invisible  group-hover:visible mt-[220px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-40">
//                                     <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="/Material">Construction Material</a>
//                                     <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="/WaterTransport">Water Transport</a>
//                                     <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="Construction">Construction & Demolish Water</a>
//                                     <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="CargoTransport">Cargo By Light & Heavy Trucks</a>
//                                 </div>     </div>







//                             <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="Ourfleet">Our Fleet</a>
//                             <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="About">About Us</a>
//                             <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="Contact">Contact Us</a>
//                         </div>

//                     </div>  </div>  </div>






//         </>
//     )
// }

// export default Mobile







import { useState, useEffect } from "react";

function Mobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  
  // Set active page based on current URL
  useEffect(() => {
    const path = window.location.pathname;
    const page = path.split("/")[1] || "Home";
    setActivePage(page);
  }, []);
  
  // Toggle main menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setServicesOpen(false);
    }
  };
  
  // Toggle services submenu
  const toggleServices = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesOpen(!servicesOpen);
  };
  
  // Check if a link is active
  const isActive = (page) => {
    return activePage === page ? "bg-blue-50 font-medium text-blue-700" : "";
  };

  return (
    <>
      <div className="lg:hidden block h-12 w-full flex items-center justify-between sticky top-0 z-[1000] bg-white shadow-md rounded-b-2xl">
        {/* Logo */}
        <div className="h-10 w-60">
          <img className="w-full h-full pl-4" src="images/Logo/dynamicLeo.png" alt="" />
        </div>

        {/* Menu Button */}
        <button 
          onClick={toggleMenu}
          className="relative flex items-center justify-center p-4"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'} scale-[1.5] text-blue-700`}></i>
        </button>
      </div>

      {/* Main Menu - Shown/Hidden based on state */}
      {menuOpen && (
        <div className="lg:hidden absolute right-0 top-12 w-60 bg-white shadow-lg rounded-md z-50">
          <a 
            className={`block px-6 py-3 hover:bg-gray-100 transition-colors text-gray-600 border-b ${isActive("Home")}`} 
            href="/Home"
          >
            Home
          </a>

          {/* Services with dropdown */}
          <div className="border-b">
            <button 
              onClick={toggleServices}
              className={`w-full text-left flex items-center justify-between px-6 py-3 hover:bg-gray-100 transition-colors text-gray-600 ${activePage.includes("Transport") || activePage === "Material" || activePage === "Construction" || activePage === "CargoTransport" ? "bg-blue-50 font-medium text-blue-700" : ""}`}
            >
              Services
              <i className={`fa-solid ${servicesOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
            </button>

            {/* Dropdown menu for Services */}
            {servicesOpen && (
              <div className="bg-gray-50 py-1">
                <a 
                  className={`block pl-10 pr-6 py-2 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("Material")}`} 
                  href="/Material"
                >
                  Construction Material
                </a>
                <a 
                  className={`block pl-10 pr-6 py-2 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("WaterTransport")}`} 
                  href="/WaterTransport"
                >
                  Water Transport
                </a>
                <a 
                  className={`block pl-10 pr-6 py-2 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("Construction")}`} 
                  href="/Construction"
                >
                  Construction & Demolish Water
                </a>
                <a 
                  className={`block pl-10 pr-6 py-2 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("CargoTransport")}`} 
                  href="/CargoTransport"
                >
                  Cargo By Light & Heavy Trucks
                </a>
              </div>
            )}
          </div>

          <a 
            className={`block px-6 py-3 hover:bg-gray-100 transition-colors text-gray-600 border-b ${isActive("Ourfleet")}`} 
            href="/Ourfleet"
          >
            Our Fleet
          </a>
          <a 
            className={`block px-6 py-3 hover:bg-gray-100 transition-colors text-gray-600 border-b ${isActive("About")}`} 
            href="/About"
          >
            About Us
          </a>
          <a 
            className={`block px-6 py-3 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("Contact")}`} 
            href="/Contact"
          >
            Contact Us
          </a>
        </div>
      )}
    </>
  );
}

export default Mobile;