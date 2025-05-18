
function Mobile() {
    return (
        <>



            <div className="lg:hidden  block  h-12 w-full flex  items-center justify-between sticky top-0 z-[1000] rounded-b-2xl ">


                <div className=" h-10 w-60 "><img className="w-full h-full " src="images/Logo/dynamicLeo.png" alt="" /></div>





                <div className="flex  ">

                    <div className="relative group/1  flex items-center justify-center    p-4 lg:invisible">

                        <i className="fa-solid fa-bars scale-[1.5] text-blue-700  "></i>

                        <div className=" absolute invisible group-hover/1:visible mt-[245px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-20">
                            <a className="block  px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/Home">Home</a>


                            <div className="  group  flex items-center justify-center ">

                                <a className="   block  py-2 hover:bg-gray-100 transition-colors pr-24
                            text-gray-600 " href="/WaterTransport"><i className="fa-solid fa-arrow-left pt-1 pr-2"></i>Services</a>

                                <div className="absolute invisible  group-hover:visible mt-[220px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-40">
                                    <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/Material">Construction Material</a>
                                    <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/WaterTransport">Water Transport</a>
                                    <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="Construction">Construction & Demolish Water</a>
                                    <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoTransport">Cargo By Light & Heavy Trucks</a>
                                </div>     </div>







                            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="Ourfleet">Our Fleet</a>
                            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="About">About Us</a>
                            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="Contact">Contact Us</a>
                        </div>

                    </div>  </div>  </div>






        </>
    )
}

export default Mobile