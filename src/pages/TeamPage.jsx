import { HighBoard } from '../components/HighBoard'
import { Heads } from '../components/Heads'
import boardMembers from '../jsons/boardmembers.json'

export const TeamPage = () => {
  const advisor = boardMembers.find(m => m.role === 'Faculty Advisor');
  const teamLeader = boardMembers.find(m => m.role === 'Team Leader');
  return (
    <>
    <h1 className="component-title">Team Board:</h1>
    <div className="team-hierarchy">
      <div className="highboard-members">
        <HighBoard boardMember={advisor}/>
        <HighBoard boardMember={teamLeader}/>
      </div>   
      <Heads />
    </div>
    </>
  )
}
