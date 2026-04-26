function Hero() {

    return (
        <>

            <div className="relative md:h-[430px] h-[300px] bg-black" >
                <img className="w-full h-full opacity-50 object-cover" src="images/Hero/cargobylight.jpg" alt="" />
                <div data-aos="fade-up" className="absolute border border-black h-20 text-center md:w-[700px] w-[70%] inset-0 m-auto flex items-center justify-center bg-black bg-opacity-50 text-orange-400 md:font-bold font-semibold md:text-4xl text-2xl" >
                    Cargo by Light & Heavy trucks</div>
            </div>

        </>
    )
}

export default Hero