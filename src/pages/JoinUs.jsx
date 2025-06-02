import React, { useState } from 'react'
import "../styles/form.css"

export const JoinUs = () => {
const [faculty, setFaculty] = useState('');
// Replace 'SCRIPT URL' with your actual Google Apps Script URL
const scriptURL = import.meta.env.VITE_REACT_GOOGLEFORM_LINK; // <-- Replace this with your actual Google Apps Script web app URL

const allOptions = [
    { value: 'VD', label: 'Vehicle Dynamics' },
    { value: 'Powertrain', label: 'Powertrain' },
    { value: 'Aerodynamics', label: 'Aerodynamics' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Autonomous', label: 'Autonomous' },
    { value: 'Business', label: 'Business' },
  ];

  const [sub1, setSub1] = useState('');
  const [sub2, setSub2] = useState('');
  const [sub3, setSub3] = useState('');
  const filterOptions = (exclude = []) =>allOptions.filter((opt) => !exclude.includes(opt.value));

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    fetch(scriptURL, { 
      method: 'POST', 
      body: formData 
    })
    .then(response => {
      alert("Thank you! Form is submitted");
      // Reset form after successful submission
      e.target.reset();
      // Reset state variables
      setFaculty('');
      setSub1('');
      setSub2('');
      setSub3('');
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert("There was an error submitting the form. Please try again.");
    });
  };

  return (
    <>
   
    <form className='Reg-Form' name='contact-form' onSubmit={handleSubmit}>
        <legend>Registration Form</legend>
        <p>
            <label htmlFor="fName">First name: </label>
            <input type="text" name="firstName" id="fName" required/>
            <label htmlFor="lName">Last name: </label>
            <input type="text" name="lastName" id="lName" required/>
        </p>
        <p>
            <label htmlFor="eMail">Email:</label> 
            <input type="email" name="eMail" id="eMail" required/>
            <label htmlFor="pNum">Phone number:</label>
            <input type="text" name="pNum" id="pNum" required pattern='+[0-9]{12}' placeholder='Add the country code as well, for example; +20...'/>
        </p>
        <div className="reg">
            <label htmlFor="reg-num">Registration number:</label>
            <input type="text" name="reg-num" id="reg-num" required/>
        </div>
        <div className="camp">
            <label htmlFor="campus">Select campus:</label>
            <select name="campus" id="campus" required>
                <option value="">-- Select Campus --</option>
                <option value="main-campus">Abou Keer</option>
                <option value="alamein">Alamein</option>
                <option value="smart">Smart Village</option>
                <option value="sheraton">Sheraton</option>
                <option value="miami">Miami</option>
            </select>
        </div>
        <div className="faculty">
            <label htmlFor="fac">Choose your faculty:</label>
            <select name="fac" id="fac" value={faculty} onChange={(e) => setFaculty(e.target.value)} required>
                <option value="">-- Select Faculty --</option>
                <option value="Eng">Engineering</option>
                <option value="CS">Computer Science</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Business">Business and Management</option>
                <option value="Logistics">Logistics</option>
                <option value="Fisheries">Fisheries</option>
                <option value="Pharma">Pharmacology</option>
                <option value="Maritime">Maritime</option>
                <option value="Other">Other...</option>
            </select>
        </div>
        {faculty=="Eng"&&(
            <div className="major">
                <label htmlFor="maj">Choose your Major:</label>
                <select name="maj" id="maj">
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Computer">Computer Engineering</option>
                    <option value="Communication">Communication Engineering</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Architecture">Architecture Engineering</option>
                </select>
            </div>            
        )}
        <div className="uni-info">
            <label htmlFor="studyYear">Year of study:</label>
            <input type="text"
            name="studyYear"
            id="study"
            required pattern='[0-5]' 
            placeholder='Insert a number between 1 and 5'/>
        </div>
        <p>Due to the high number of applicants, it is required that you select three subteams you'd like to join the most and rank them in order of preference</p>
        <p>For more info on each subteam, please check the subteams section on the home page</p>
        <div>
      <div className="subteam-1">
        <label htmlFor="sub1">Preference 1:</label>
        <select required
          name='sub1'
          id="sub1"
          value={sub1}
          onChange={(e) => {
            setSub1(e.target.value);
            if (e.target.value === sub2) setSub2('');
            if (e.target.value === sub3) setSub3('');
          }}
        >
          <option value="">-- Select Subteam--</option>
          {filterOptions([]).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="subteam-2">
        <label htmlFor="sub2">Preference 2:</label>
        <select
        required
        name='sub2'
          id="sub2"
          value={sub2}
          onChange={(e) => {
            setSub2(e.target.value);
            if (e.target.value === sub3) setSub3('');
          }}
        >
          <option value="">-- Select Subteam--</option>
          {filterOptions([sub1]).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="subteam-3">
        <label htmlFor="sub3">Preference 3:</label>
        <select
        required
        name='sub3'
          id="sub3"
          value={sub3}
          onChange={(e) => setSub3(e.target.value)}
        >
          <option value="">-- Select Subteam--</option>
          {filterOptions([sub1, sub2]).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="exp">
        <label htmlFor="experience">Prior experience:</label> <br />
        <textarea name="experience" id="experience" placeholder='If you have any prior experience in activities that required team work, technical work or anything that helped you gain a skill you believe would benefit the team, feel free to share:'></textarea>
    </div>
        <button type="submit">Submit</button>
    </form>
    </>
  )
}