function Hero() {

    return (
        <>

            <div className="relative h-[430px] bg-black " >
                <img className="w-full h-full opacity-50" src="images/Contact us/contact.jpg" alt="" />
                <div data-aos="fade-up" className="absolute  h-32  w-[60%] inset-0 m-auto flex flex-col p-2 items-center justify-center  bg-stone-700 bg-opacity-80  hover:bg-stone-600" >
                    <p className="sm:font-bold sm:text-2xl text-amber-400 ">CONTACT US</p>
                    <p className="sm:text-sm text-xs text-white bg-brown-400  text-center">We’re here to assist you with all your shipping inquiries. Whether you have urgent requests or general questions, our team is ready to provide the support you need. Reach out to DLT today!</p>
                </div>
            </div>



        </>
    )
}

export default Hero