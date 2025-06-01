import React from 'react'
import { ModelView } from '../components/ModelView'
import '../styles/aboutus.css'

export const AboutUs = () => {
  return (
  <>
    <div className="model-container">
      <ModelView modelPath='/src/assets/gltf/assembly_2021/full_assembly_2021.gltf'/>
      <div className="model-description">
        <h2>2021-2022 Design:</h2>
        <p>One of our first driverless designs, this design was a combustion vehicle (CV) and had a carbon fiber suspension system</p>
      </div>     
    </div> 
    <div className="model-container">
      <ModelView modelPath='/src/assets/gltf/assembly_2023/frame_assembly_26-05-23.gltf'/>
      <div className="model-description">
        <h2>2022-2023 Design:</h2>
        <p>Our first electric, driverless design, this design went back to basics in terms of aero package while prioritizing cooling and weight reduction.</p>
      </div>
      
    </div> 
    <div className="model-container">
      <ModelView modelPath='/src/assets/gltf/assembly_2024/full_assembly_2024.gltf'/>
      <div className="model-description">
        <h2>2023-2024 Design:</h2>
        <p>This design featured a full aeropackage consisting of; nose cone, front and rear wings and an undertray. This is considered our best design since the pandemic.</p>
      </div>
    </div>  
  </>
  )
}
