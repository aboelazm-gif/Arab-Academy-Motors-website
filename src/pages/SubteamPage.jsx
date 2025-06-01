import React from 'react';
import subteam from "../jsons/teamMembers.json";
import subHead from "../jsons/boardmembers.json";
import { useParams } from 'react-router-dom';
import { HighBoard } from '../components/HighBoard';
import { MemberCard } from '../components/memberCard';
import { SubteamInfoCard } from '../components/SubteamInfoCard';

export const SubteamPage = () => {
    const {subteamName} = useParams();
    const subhead = subHead.filter(sm=>sm.sub.match(subteamName));
    const sub = subteam.filter(m=>m.sub1.startsWith(subteamName) || m.sub2.match(subteamName));
    
    return (<>
    <div className="subteam-container">
        <div className="members-info">
            <h1 className="component-title">
            SUBTEAM HEAD:
            </h1>
            <div className="subteam-lead">
                <HighBoard boardMember={subhead[0]} />
            </div>
            <h1 className="component-title">
                SUBTEAM MEMBERS:
            </h1>
            <div className='subteam-member-list'>
                {sub.map((m,index) => (
                <div className='subteam-member' key={index}>
                    <MemberCard subteamMember={m} currentSubteam={subteamName}/>
                </div>
            ))}
            </div>
        </div>
        <div className="subteam-details">
            <SubteamInfoCard subname={subteamName}/>
        </div>
    </div>
    </>
  )
}
