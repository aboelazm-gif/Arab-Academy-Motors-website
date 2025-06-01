import React from 'react'
import '../styles/memberCard.css'

export const MemberCard = ({subteamMember, currentSubteam}) => {
  const extractRole = (str) => {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length > 1) {
      const potentialRole = parts[parts.length - 1].trim();
      // Check if it looks like a role (contains "Member", "Lead", "Head", etc.)
      if (potentialRole.includes('Senior')) {
        return potentialRole;
      }
    }
    return null;
  };

  // Only extract role from the subteam that matches the current page
  let role = null;
  if (subteamMember.sub1?.startsWith(currentSubteam)) {
    role = extractRole(subteamMember.sub1);
  } else if (subteamMember.sub2?.match(currentSubteam)) {
    role = extractRole(subteamMember.sub2);
  }

  return (
    <div className="subteam-member-card">
      <div className="member-name">{subteamMember.name}</div>
      {role && 
      <div className="member-role">{role}</div>}
    </div>
  );
};