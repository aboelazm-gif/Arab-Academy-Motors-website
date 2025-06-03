import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";
import slideData from '../jsons/mainCarousel.json'
import subteamData from "../jsons/subteamData.json"
import { SponsorBar } from "../components/SponsorBar";
import { OldBoardCarousel } from "../components/OldBoardCarousel";
import '../styles/home.css';
import { useContext } from "react";
import { userContext } from "../App";

const Home = () => {
  const {user} = useContext(userContext);
  return (
    <div>
        {user&&<p className="welcome-user">Welcome, {user?.data?.name}</p>} 
        <h1 className='component-title'>OUR JOURNEY:</h1>
        <Carousel slides={slideData}/>

        <h1 className="component-title">SUB-TEAMS:</h1>
        <Accordion accordionContent={subteamData} showDescription={true} showRole={false}/>

        <h1 className="component-title">PREVIOUS BOARD MEMBERS:</h1>
        <OldBoardCarousel/>

        <h1 className="component-title">SPONSORS AND PARTNERS:</h1>
        <SponsorBar/>
    </div>
  )
}
export default Home;
