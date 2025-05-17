function ContactForm() {

    return (
        <>

            <div className=" p-4 flex flex-col  bg-slate-100   md:w-[100%] items-center ">
                <div className="md:w-[60%] grid md:grid-cols-2 gap-4  ">







                                           {/* Information Right Side */}
                    <div className="w-[100%] h-[100%]">

                        <div><p className="font-semibold py-4 ">Need fast and reliable transportation? <br />
                            We are here to help. Contact us today!</p></div>

                        <div><p>Our dedicated customer service specialists are available 24/7/365.</p></div>

                        <div className="flex flex-col  my-8 p-2 bg-white rounded-lg">
                            <p className=" mt-4 text-zinc-700 " ><i className="fa-solid fa-location-dot mr-1 text-orange-400 scale-[1]"></i> Office No 06, Level 26th, Aspin Commercial Tower, Sheikh Zayed
                                Road, Dubai, UAE</p>
                            <p className=" text-zinc-700 mt-4 " > <i className="fa-solid fa-envelope mr-2 text-orange-400 scale-[1.4]"></i>info@dynamicleotransport.ae</p>
                            <p className=" mt-4 text-zinc-700 " ><i className="fa-solid fa-phone text-orange-400 scale-[1.4]"></i> +971 521205514</p>

                        </div>


                        <div className=" mt-4 rounded-lg h-30 ">
                            <img className="w-full h-40" src="images/Hero/Site.jpg" alt="" />
                        </div>
                    </div>






                                                  {/* Form Right */}

                    <div className=" w-[90%] h-[100%]  bg-white  p-4 shadow-2xl">

                        <table className="w-[100%]">
                            <p className="text-xs text-slate-900 mb-2">First name</p>
                            <input className="border border-slate-400 p-2 rounded-md w-[100%] mb-6" type="text" placeholder="Enter your first name" />
                            <p className="text-xs text-slate-900 mb-2">Email</p>
                            <input className="border border-slate-400 p-2 rounded-md w-[100%] mb-6" type="text" placeholder="Enter your email" />
                            <p className="text-xs text-slate-900 mb-2">Contact No</p>
                            <input className="border border-slate-400 p-2 rounded-md w-[100%] mb-6" type="text" placeholder="Enter your contact number" />
                            <p className="text-xs text-slate-900 mb-2">Message</p>
                            <textarea className="border border-slate-400 p-2  rounded-md w-[100%] mb-6 " name="" id="" placeholder="Leave us a massage" rows="4" ></textarea>
                            <button className="w-[100%] bg-orange-400 py-2 text-white rounded-md">Send Messsage</button>
                        </table>

                    </div> </div></div>


        </>
    )
}

export default ContactForm