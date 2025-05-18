
    


function Hero() {

  return (

     
    <>
      <div className="relative h-[600px] bg-black">
        {/* Video with autoPlay and loop attributes */}
        <video 
          className="w-full h-full object-cover opacity-30" 
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        >
          <source src="/images/Video/transportVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 w-full h-full flex items-center justify-left pl-8 sm:pl-20">
          <div data-aos="fade-up" className="w-[40%] sm:w-[280] md:w-[390px] flex flex-col text-white">
            <p className="sm:font-semibold md:font-bold font-normal md:text-4xl sm:text-2xl text-xl">Logistics, Simplified.</p>
            <p className="md:text-2xl sm:text-xl mt-1.5">Logistics Solutions</p>
            <p className="text-xs text-justify mt-3">From fulfillment to the last mile we pick, pack, ship, and deliver while prioritizing speed, costs and quality for shippers with over 3,000 monthly orders.</p>
            
            <div className="mt-4 flex flex-col sm:flex-row">
              <button className="px-2 md:px-4 md:py-2 text-black font-semibold ml-2 mt-2 bg-amber-400 rounded-sm hover:bg-amber-300">Visit Now</button>
              <button className="px-2 md:px-4 md:py-2.5 text-white font-semibold ml-2 mt-2 rounded-sm border-2 border-amber-400 hover:bg-amber-400 hover:bg-opacity-20">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero

