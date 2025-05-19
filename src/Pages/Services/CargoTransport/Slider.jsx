
// function Slider() {
//   return (
//     <>
      
           


//                        <div className="border border-black  bg-violet-50 ">

//                          <div className="flex items-center  text-center text-5xl font-semibold text-indigo-800 my-8">What Our Clients Say About Us</div>



//                                                {/* Slider */}
//                                                <div className="grid md:grid-cols-2">
//                          <div className=" m-12 bg-white shadow-lg rounded-xl ">



//                                               {/* First Clint */}
//                       <div className="   mt-4 border border black ">
                        
//                       <div className="flex h-[40] border border black">  <div className="border border-slate-700 h-14 w-14 rounded-full mx-4 my-4 flex items-center justify-center"><i className="fa-solid fa-truck-pickup scale-[2]"></i> </div>

//                         <div className=" mx-4 my-4 ">
//                            <p className="font-bold text-xl text-indigo-700">John</p>
//                             <p className="text-indigo-700">Operations Director </p></div> 
                            

//                             <div className=" scale-[2.5] h-full mx-8 mt-10">
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
                            
//                             </div></div> </div>
                        
                        

//                         <div className=" p-4 border border-black">
//                            <div className="font-bold text-xl text-indigo-700">Outstanding reliability and efficiency!</div>    
//                          <div className="text-indigo-700 text-lg mt-2">Their heavy-duty fleet solutions transformed our supply chain operations. The real-time GPS tracking and preventive maintenance programs ensured our trucks stayed on the road, even during peak seasons. With their support. </div>
//                         </div>
                        
                        
                        



//                                                      {/* Second Clint */}

//                           <div className="   mt-4 ">
                        
//                        <div className="flex h-[40] border border black">
//                          <div className="border border-slate-700 h-14 w-14 rounded-full mx-4 my-2 flex items-center justify-center"><i className="fa-solid fa-face-smile scale-[2]"></i> </div>

//                         <div className=" mx-4 my-4">
//                             <p className="font-bold text-xl text-indigo-700">Maria</p>
//                             <p className="text-indigo-700">Logistics Manager</p>
//                             </div>

//                             <div className=" scale-[2.5] h-full mx-8 mt-10">
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
                            
//                             </div></div> </div>
                        
                        

//                         <div className=" p-4">
//                            <div className="font-bold text-xl text-indigo-700">Outstanding reliability and efficiency!</div>    
//                          <div className="text-indigo-700 text-lg mt-2">Their heavy-duty fleet solutions transformed our supply chain operations. The real-time GPS tracking and preventive maintenance programs ensured our trucks stayed on the road, even during peak seasons. With their support. </div>
//                            </div>





//                                                    {/* Thired Clint */}
//                          <div className="  mt-4">
//                         <div className="flex h-[40] border border black">

//                         <div className="border border-slate-700 h-14 w-14 rounded-full mx-4 my-2 flex items-center justify-center"><i className="fa-solid fa-circle-user scale-[2]"></i> </div>

//                         <div className=" mx-4 my-4">
//                             <p className="font-bold text-xl text-indigo-700">Sarah</p>
//                             <p className="text-indigo-700">Supply Chain Manager </p>
//                             </div>

//                             <div className=" scale-[2.5] h-full mx-8 mt-10">
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
//                             <span className="transform scale-150 text-amber-500">&#8902;</span>
                            
//                             </div></div> </div>
                        
                        

//                         <div className=" p-4 ">
//                            <div className="font-bold text-xl text-indigo-700">Exceptional service quality </div>    
//                          <div className="text-indigo-700 text-lg mt-2">Working with this team has significantly improved our logistics efficiency. Their innovative solutions and dedicated support have made them an invaluable partner in our supply chain operations.</div>
//                         </div>



//                          </div></div></div>



//     </>
//   )
// }

// export default Slider





import { useState } from "react";

const testimonials = [
  {
    name: "John",
    role: "Operations Director",
    icon: "fa-truck-pickup",
    title: "Outstanding reliability!",
    feedback:
      "Their heavy-duty fleet solutions transformed our supply chain operations. The real-time GPS tracking and preventive on the road, even during peak seasons.",
  },
  {
    name: "Maria",
    role: "Logistics Manager",
    icon: "fa-face-smile",
    title: "Reliable and professional service!",
    feedback:
      "With exceptional fleet support, our logistics never miss a beat. The team is always responsive and provides top-tier solutions for our business needs.",
  },
  {
    name: "Sarah",
    role: "Supply Chain Manager",
    icon: "fa-circle-user",
    title: "Exceptional service quality",
    feedback:
      "Working with this team has significantly improved our logistics efficiency. Their innovative solutions and dedicated support have made them an invaluable partner.",
  },
];

function Slider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-violet-50  px-4 py-8">
      <h2 className="text-center text-3xl md:text-5xl font-semibold text-indigo-800 mb-8">
        What Our Clients Say About Us
      </h2>

      <div className="relative md:max-w-[30%]  mx-auto bg-white shadow-xl rounded-xl p-6">
        {/* Testimonial Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full border border-slate-700 flex items-center justify-center text-indigo-700">
              <i className={`fa-solid ${testimonials[current].icon} text-2xl`} />
            </div>
            <div className="ml-4">
              <p className="text-xl font-bold text-indigo-700">
                {testimonials[current].name}
              </p>
              <p className="text-indigo-700">{testimonials[current].role}</p>
            </div>
          </div>
          <div className="flex gap-1 sm:ml-auto text-amber-500 text-xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>&#8902;</span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xl font-bold text-indigo-700">
            {testimonials[current].title}
          </p>
          <p className="text-indigo-700 text-lg mt-2">
            {testimonials[current].feedback}
          </p>
        </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-gray-200 text-black rounded-full shadow-lg hover:bg-gray-300"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        
      </div>
    </div>
  );
}

export default Slider;