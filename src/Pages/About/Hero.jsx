function Hero() {

    return (
        <>

                                 {/* Hero Section */}
            <div className="relative h-[460px]  mb-16 bg-black " >
                <img className="w-full h-full object-cover " src="images/About us/hero.jpg" alt="" />
                <div data-aos="fade-up" className="absolute  h-16 w-36 sm:w-52 inset-0 m-auto flex items-center justify-center hover:bg-black bg-black bg-opacity-50 hover:duration-300 text-orange-400 font-semibold text-2xl sm:font-bold sm:text-4xl" >About Us</div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -my-8 mx-1  border border-black bg-blue-900 bg-opacity-80 flex items-center justify-around w-[60%] min-w-60 h-[80px]">
                    <div className="text-white "><p className="font-bold text-lg">1200+</p><p className="text-xs">clints</p></div>
                    <div className="text-white "><p className="font-bold text-lg">20+</p><p className="text-xs">Cities</p></div>
                    <div className="text-white "><p className="font-bold text-lg">60+</p><p className="text-xs">Drivers</p></div>
                    <div className="text-white "><p className="font-bold text-lg">12+</p><p className="text-xs">Offices</p></div>
                </div>
            </div>

        </>
    )
}

export default Hero