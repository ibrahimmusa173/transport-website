function MainFirst() {

  return (
    <>
    

 <div className="flex items-center justify-center container ">
      <div data-aos="fade-up" className="w-[580px]  flex flex-col items-center justify-center mt-4 mb-4">
        <p className="text-4xl font-bold text-yellow-600">Our Services</p>
        <div className=" px-8 py-6 mt-4 text-stone-600 rounded-lg flex flex-col items-center justify-center
               shadow-lg shadow-red-300 container mx-auto text-sm">
          <p>  Comprehensive logistics solutions tailored to meet your business needs, </p>
          <p> needs, delivering excellence across the UAE and beyond.</p>
        </div></div></div>






           
      <div data-aos="fade-up" className=" grid md:grid-cols-2  w-full mb-4 px-10 ">
        <div className="p-4 group"><div className="h-[500px] bg-black  relative"><img className="w-full h-full   object-cover opacity-50 group-hover:opacity-35 duration-300" src="images/Services/services1.jpg" alt="" />
        <div  className="absolute  transform translate-y-full group-hover:translate-y-0 transition-all duration-500  inset-0 ml-4 mt-[460px]  text-white">Construction Equipment Supply</div>
        </div></div>

        <div className=" ">
        <div className="p-4 group"><div className="h-[234px] bg-black  relative"><img className="w-full h-full   object-cover opacity-50 group-hover:opacity-35 duration-300" src="images/Services/services2.jpg" alt="" />
        <div  className="absolute  transform translate-y-full group-hover:translate-y-0 transition-all duration-500  inset-0 ml-4 mt-[190px]  text-white">Site Assistance</div>
           </div></div>

      <div className="p-4 group"><div className="h-[234px] bg-black  relative"><img className="w-full h-full   object-cover opacity-40 group-hover:opacity-30 duration-300" src="images/Services/services3.jpg" alt="" />
        <div  className="absolute  transform translate-y-full group-hover:translate-y-0 transition-all duration-500  inset-0 ml-4 mt-[190px]  text-white">Material Supply</div>
        </div></div></div>
      </div>

     



    </>
  )
}

export default MainFirst