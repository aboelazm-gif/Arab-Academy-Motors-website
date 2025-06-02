import {React, useEffect} from 'react';
import subteamInfo from '../jsons/subteamData.json';
import getCollection from "../firebase/getCollection";
import '../styles/subteamInfoCard.css'
export const SubteamInfoCard = ({subname}) => {
    const subteam = subteamInfo.find(st=>st.name.match(subname));
  return (
    <div>
        {subteam &&(
            <div>
                <h1 className="component-title">{subteam.name}</h1>
                <img className='subteam-image' src={subteam.img} alt={subteam.name} />
                <p className='accordion-description open sub-desc'>{subteam.desc}</p>
            </div>
        )}

    </div>
  )
}
