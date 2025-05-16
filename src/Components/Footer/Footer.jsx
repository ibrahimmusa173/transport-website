
function Footer() {
    return (

        <div className=" mt-16 w-[100%]">



            <div className=" flex flex-col justify-center items-center container mx-auto md:flex md:flex-row md:justify-between md:px-4">
                <div ><img className="h-20 w-60" src="img/dynamicLeo.png" alt="" /></div>
                <div className=" mt-4 "><p className="text-sky-700 text-2xl font-semibold md:text-4xl font-bold">MAKE THE LEAP</p></div>
            </div>




            <div className="   grid sm:grid-cols-2 md:grid-cols-3">

                <div className="flex flex-col mt-10 pl-4 pt-6">
                    <p className="ml-8 font-semibold " >Quick Links</p>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Home</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Our Fleet</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">About Us</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Contact Us</a>
                </div>

                <div className="flex flex-col mt-10 pl-4 pt-6">
                    <p className="ml-8 font-semibold " >Services</p>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Construction Material</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Water Transport</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Construction & Demolition Waste</a>
                    <a className="ml-8 mt-4 text-zinc-700 hover:text-amber-300 hover:translate-x-2 duration-300" href="a">Cargo by Light & Heavy Trucks</a>
                </div>

                <div className="flex flex-col mt-10 pl-4 pt-6 ml-8">
                    <p className=" font-semibold  " >Contact Us</p>
                    <p className=" text-zinc-700 mt-4 " > <i className="fa-solid fa-envelope mr-2 text-amber-300"></i>info@dynamicleotransport.ae</p>
                    <p className=" mt-4 text-zinc-700 " ><i className="fa-solid fa-phone text-amber-300"></i> +971 521205514</p>
                    <p className=" mt-4 text-zinc-700 " ><i className="fa-solid fa-location-dot mr-1 text-amber-300"></i> Office No 06, Level 26th, Aspin Commercial <br /> <p className="ml-5">Tower,</p>
                        <p className="ml-5 mt-[-5]">Sheikh Zayed Road, Dubai, UAE</p></p>

                </div>               </div>



            <div className="border border-zinc-200 w-[90%] ml-16 pl-4 mt-12  "></div>




            <div className="flex flex-col justify-center items-center md:flex-row md:justify-between mx-8 px-8">

                <div className=" flex h-16 items-center ">
                    <div className=" p-4"> <i className="fa-brands fa-facebook scale-150  hover:scale-[1.8] duration-300 text-amber-300"></i></div>
                    <div className=" p-3">  <i className="fa-brands fa-linkedin scale-150  hover:scale-[1.8] duration-300 text-amber-300"></i></div>
                    <div className=" p-3">  <i className="fa-brands fa-instagram scale-150  hover:scale-[1.8] duration-300 text-amber-300"></i></div>
                </div>

                <div className="text-xs text-gray-600">
                    <p>© 2025 Dynamic Leo. ALL RIGHTS RESERVED</p>
                </div>


            </div>




        </div>

    )
}

export default Footer