


function Desktop() {
    return (
        <>

            <div className=" hidden lg:block  h-12 w-full lg:flex  items-center lg:justify-between sticky top-0 z-[1000] rounded-b-2xl bg-gradient-to-r from-white  backdrop-blur">


                <div className=" h-10 w-60 "><img className="w-full h-full " src="images/Logo/dynamicLeo.png" alt="" /></div>





                <div className="lg:flex lg:justify-start ">

                    <div className="  lg:flex   lg:items-center hidden  lg:w-[700px]">
                        <a className="cursor-pointer lg:ml-20   text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="/Home">Home</a>


                        <div className="relative group   flex items-center justify-center ">

                            <a className=" flex lg:ml-8 xl:ml-6 lg:text-xs text-zinc-1000 xl:text-base xl:text-zinc-700  " href="/Home">Services<i className="fa-solid fa-caret-down pt-1 pl-1"></i></a>

                            <div className="absolute invisible group-hover:visible mt-[230px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white">
                                <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/Material">Construction Material</a>
                                <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/WaterTransport">Water Transport</a>
                                <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="Construction">Construction & Demolish Water</a>
                                <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoTransport">Cargo By Light & Heavy Trucks</a>
                            </div> </div>


                        <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="OurFleet">OurFleet</a>
                        <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="About">About Us</a>
                        <a className="lg:ml-8 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="Contact">Contact Us</a>
                        <a className="ml-8 text-zinc-1000 bg-amber-500 py-2 px-4 rounded-sm font-semibold " href="Get and Quote">Get a Quote</a>
                    </div>

                </div> </div>




        </>
    )
}

export default Desktop