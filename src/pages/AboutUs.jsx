import React from 'react'
import { ModelView } from '../components/ModelView'
import '../styles/aboutus.css'

export const AboutUs = () => {
  return (
  <>
    <div className="model-container">
      <ModelView modelPath='/gltf/full_assembly_2021/full_assembly_2021.gltf'/>
      <p>2021 Car model</p>
    </div> 
    <div className="model-container">
      <ModelView modelPath='/gltf/full_assembly_2022/full_assembly_2022.gltf'/>
      <p>2022 Car model</p>
    </div> 
    <div className="model-container">
      <ModelView modelPath='/gltf/frame_assembly_26-05-23/frame_assembly_26-05-23.gltf'/>
      <p>2023 Car model</p>
    </div> 
    <div className="model-container">
      <ModelView modelPath='/gltf/full_assembly_2024/full_assembly_2024.gltf'/>
      <p>2024 Car model</p>
    </div>  
  </>
  )
}
