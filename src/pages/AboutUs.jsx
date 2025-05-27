import React from 'react'
import { ModelView } from '../components/ModelView'
import '../styles/aboutus.css'

export const AboutUs = () => {
  return (
  <>
    <div className="model-container">
      <ModelView modelPath='/gltf/full_assembly_2021/full_assembly_2021.gltf'/>
      <div className="model-description">
        <h2>2021-2022 Car model</h2>
        <p>One of our first driverless designs, this design was a CV and had a carbon fiber suspension system</p>
      </div>     
    </div> 
    <div className="model-container">
      <ModelView modelPath='/gltf/frame_assembly_26-05-23/frame_assembly_26-05-23.gltf'/>
      <div className="model-description">
        <h2>2022-2023 Car model</h2>
        <p>Our first electric vehicle design as well as being driverless, this design went back to basics in terms of aero package while prioritizing cooling requirements and drag reduction rather than downforce generation</p>
      </div>
      
    </div> 
    <div className="model-container">
      <ModelView modelPath='/gltf/full_assembly_2024/full_assembly_2024.gltf'/>
      <div className="model-description">
        <h2>2023-2024 Car model</h2>
        <p>car</p>
      </div>
    </div>  
  </>
  )
}
