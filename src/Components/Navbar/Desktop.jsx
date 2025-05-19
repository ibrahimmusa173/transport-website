


// function Desktop() {
//     return (
//         <>

//             <div className=" hidden lg:block  h-12 w-full lg:flex  items-center lg:justify-between sticky top-0 z-[1000] rounded-b-2xl bg-gradient-to-r from-white  backdrop-blur">


//                 <div className=" h-10 w-60 "><img className="w-full h-full " src="images/Logo/dynamicLeo.png" alt="" /></div>





//                 <div className="lg:flex lg:justify-start ">

//                     <div className="  lg:flex   lg:items-center hidden  lg:w-[700px]">
//                         <a className="cursor-pointer lg:ml-20   text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="/Home">Home</a>


//                         <div className="relative group   flex items-center justify-center ">

//                             <a className=" flex lg:ml-8 xl:ml-6 lg:text-xs text-zinc-1000 xl:text-base xl:text-zinc-700  " href="/Home">Services<i className="fa-solid fa-caret-down pt-1 pl-1"></i></a>

//                             <div className="absolute invisible group-hover:visible mt-[230px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white">
//                                 <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="/Material">Construction Material</a>
//                                 <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="/WaterTransport">Water Transport</a>
//                                 <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="Construction">Construction & Demolish Water</a>
//                                 <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
//                             text-gray-600" href="CargoTransport">Cargo By Light & Heavy Trucks</a>
//                             </div> </div>


//                         <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="OurFleet">OurFleet</a>
//                         <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="About">About Us</a>
//                         <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="Contact">Contact Us</a>
//                         <a className="ml-8 text-zinc-1000 bg-amber-500 py-2 px-4 rounded-sm font-semibold " href="Get and Quote">Get a Quote</a>
//                     </div>

//                 </div> </div>




//         </>
//     )
// }

// export default Desktop






import { useEffect, useState } from "react";

function Desktop() {
    const [activePage, setActivePage] = useState("");

    // Set active page based on current URL when component mounts
    useEffect(() => {
        const path = window.location.pathname;
        const page = path.split("/")[1] || "Home";
        setActivePage(page);
    }, []);

    // Check if a link is active
    const isActive = (page) => {
        if (page === activePage) {
            return " text-amber-500 font-bold rounded-md px-3"; // Button-like appearance when active
        }
        return "";
    };

    // Check if any service page is active
    const isServiceActive = () => {
        const servicePages = ["Material", "WaterTransport", "Construction", "CargoTransport"];
        return servicePages.includes(activePage) ? "text-amber-500  font-bold rounded-md px-3" : "";
    };

    return (
        <>
            <div className="hidden lg:block h-12 w-full lg:flex items-center lg:justify-between sticky top-0 z-[1000] rounded-b-2xl bg-gradient-to-r from-white backdrop-blur bg-white/90 shadow-sm">
                {/* Logo */}
                <div className="h-10 w-60 ml-4">
                    <img className="w-full h-full pl-4" src="images/Logo/dynamicLeo.png" alt="Logo" />
                </div>

                {/* Navigation Links */}
                <div className="lg:flex lg:justify-start">
                    <div className="lg:flex lg:items-center hidden lg:w-[700px]">
                        {/* Home Link */}
                        <a 
                            className={`cursor-pointer lg:ml-20 lg:text-xs xl:text-base xl:text-zinc-700  py-3 transition-colors ${isActive("Home")}`} 
                            href="/Home"
                        >
                            Home
                        </a>

                        {/* Services Dropdown */}
                        <div className="relative group flex items-center justify-center">
                            <a 
                                className={`flex lg:ml-8 xl:ml-6 lg:text-xs xl:text-base xl:text-zinc-700  py-3 transition-colors ${isServiceActive()}`} 
                                href="#"
                            >
                                Services             
                                

                                <i className={`fa-solid fa-caret-down pt-1 pl-1 ${isServiceActive() ? "text-black" : ""}`}></i>
                            </a>

                            {/* Services Dropdown Menu */}
                            <div className="absolute invisible group-hover:visible top-full w-60 bg-white shadow-lg rounded-md">
                                <a 
                                    className={`block px-4 py-3 hover:bg-gray-100 transition-colors text-gray-600 ${isActive("Material")}`} 
                                    href="/Material"
                                >
                                    Construction Material
                                </a>
                                <a 
                                    className={`block px-4 py-3  transition-colors text-gray-600 ${isActive("WaterTransport")}`} 
                                    href="/WaterTransport"
                                >
                                    Water Transport
                                </a>
                                <a 
                                    className={`block px-4 py-3  transition-colors text-gray-600 ${isActive("Construction")}`} 
                                    href="/Construction"
                                >
                                    Construction & Demolish Water
                                </a>
                                <a 
                                    className={`block px-4 py-3  transition-colors text-gray-600 ${isActive("CargoTransport")}`} 
                                    href="/CargoTransport"
                                >
                                    Cargo By Light & Heavy Trucks
                                </a>
                            </div>
                        </div>

                        {/* Other Navigation Links */}
                        <a 
                            className={`lg:ml-8 xl:ml-6 lg:text-xs xl:text-base xl:text-zinc-700 h py-3 transition-colors ${isActive("OurFleet")}`} 
                            href="/OurFleet"
                        >
                            Our Fleet
                        </a>
                        <a 
                            className={`lg:ml-8 xl:ml-6 lg:text-xs xl:text-base xl:text-zinc-700  py-3 transition-colors ${isActive("About")}`} 
                            href="/About"
                        >
                            About Us
                        </a>
                        <a 
                            className={`lg:ml-8 xl:ml-6 lg:text-xs xl:text-base xl:text-zinc-700  py-3 transition-colors ${isActive("Contact")}`} 
                            href="/Contact"
                        >
                            Contact Us
                        </a>
                        
                        {/* Call to Action Button */}
                        <a 
                            className={`ml-8 text-white ${activePage === "Quote" ? "bg-amber-600 font-bold" : "bg-amber-500 font-semibold"} hover:bg-amber-600 py-2 px-4 rounded-md transition-colors`} 
                            href="/Quote"
                        >
                            Get a Quote
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Desktop;