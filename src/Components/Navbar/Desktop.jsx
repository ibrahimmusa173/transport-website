

function Desktop(){



    return(
        <>
        <div className=" h-12 w-full flex  items-center justify-between sticky top-0 z-[1000] rounded-b-2xl bg-gradient-to-r from-white  backdrop-blur">


        <div className=" h-10 w-60 pl-8"><img className="w-full h-full " src="img/dynamicLeo.png" alt="" /></div>





        <div className="flex">

          <div className="  lg:flex   lg:items-center hidden  lg:w-[800px]">
           <a className="cursor-pointer lg:ml-20   text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 "href="/Home1">Home</a>
                
                           
            <div className="relative group   flex items-center justify-center ">

            <a className=" flex lg:ml-2.5 xl:ml-6 lg:text-xs text-zinc-1000 xl:text-base xl:text-zinc-700  " href="/Home1">Services<i className="fa-solid fa-caret-down pt-1 pl-1"></i></a>
           
           <div className="absolute invisible group-hover:visible mt-[245px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white">
            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/ConstructionMaterial">Construction Material</a>
            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/WaterTransport">Water Transport</a>
            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="ConstructionAndDemolishWaste">Construction & Demolish Water</a>
           <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoByLightandHeavyTrucks">Cargo By Light & Heavy Trucks</a>
           </div> </div>
                     

                <a className="lg:ml-2.5 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="OurFleet">Our Fleet</a>
                <a className="lg:ml-2.5 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="AboutUs">About Us</a>
                <a className="lg:ml-2.5 xl:ml-6 text-zinc-1000 lg:text-xs xl:text-base xl:text-zinc-700 " href="ContactUs">Contact Us</a>
                <a className="ml-4 text-zinc-1000 bg-amber-500 py-2 px-4 rounded-sm font-semibold " href="Get and Quote">Get a Quote</a>
            </div>



                                               {/* For Mobile Use */}

          {/* <div class="border border-black "><i class="fa-solid fa-bars scale-[1.5] text-blue-700  p-4"></i></div> */}



             <div className="relative group/1  flex items-center justify-center   border border-black p-4 lg:invisible">

           <i className="fa-solid fa-bars scale-[1.5] text-blue-700  "></i>
           
           <div className="border border-black absolute invisible group-hover/1:visible mt-[245px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-20">
            <a className="block  px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/ConstructionMaterial">Home</a>

  
                  <div className="  group  flex items-center justify-center ">

            <a className="   block  py-2 hover:bg-gray-100 transition-colors pr-24
                            text-gray-600 " href="/WaterTransport"><i className="fa-solid fa-arrow-left pt-1 pr-2"></i>Services</a>
           
           <div className="absolute invisible  group-hover:visible mt-[220px]  w-48 bg-white shadow-lg rounded-md shadow-lg bg-white mr-16">
            <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/ConstructionMaterial">Construction Material</a>
            <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="/WaterTransport">Water Transport</a>
            <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="ConstructionAndDemolishWaste">Construction & Demolish Water</a>
           <a className="block px-6 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoByLightandHeavyTrucks">Cargo By Light & Heavy Trucks</a>
           </div>     </div>







            <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="ConstructionAndDemolishWaste">Our Fleet</a>
           <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoByLightandHeavyTrucks">About Us</a>
           <a className="block px-4 py-2 hover:bg-gray-100 transition-colors
                            text-gray-600" href="CargoByLightandHeavyTrucks">Contact Us</a>
           </div>

           </div>

    
         
        
        
        
        
        </div>

        
            

        </div>



        </>
    )
}

export default Desktop;
