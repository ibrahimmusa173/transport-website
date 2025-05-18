import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Hero from './Hero';
import MainFirst from './MainFirst';
import MainSecond from './MainSecond';
import MainThired from './MainThired';
import MainFourth from './MainFourth';
import MainFifth from './MainFifth';
import MainSixth from './MainSixth';

function Home() {

  return (
    <>
   <Navbar/>
   <Hero/>
   <MainFirst/> 
   <MainSecond/>
   <MainThired/>
   <MainFourth/>
   <MainFifth/>
   <MainSixth/>    
  <Footer/>
  
    </>
  )
}

export default Home
