import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export const ModelView = ({modelPath}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null); // Track if scene is already created
  const modelLoadedRef = useRef(false); // Track if model is already loaded
  const containerRef = useRef(null); // Added container ref

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const aspectRatio = 16 / 9;
    const width = container.clientWidth;
    const height = width / aspectRatio;

    // Prevent double initialization
    if (sceneRef.current) {
      console.log('Scene already exists, skipping initialization');
      return;
    }

    console.log('ModelView component mounted - initializing scene');

    // === Scene Setup ===
    const scene = new THREE.Scene();
    sceneRef.current = scene; // Store reference
    scene.background = new THREE.Color(0x0e0f0f); // Black background

    const camera = new THREE.PerspectiveCamera(12, width / height, 1, 1000);
    camera.position.set(4, 5, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ensure the mount element exists before adding
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = 1.5;
    controls.target.set(0, 1, 0);
    controls.update();

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-10, 5, -5);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // === GLTF Loader with DRACO support ===
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = () => {
      console.log('All resources loaded successfully');
    };

    loadingManager.onError = (url) => {
      console.error('Failed to load resource:', url);
      console.log('Check if this file exists and is accessible');
    };

    loadingManager.onProgress = (url, loaded, total) => {
      console.log(`Loading: ${url} (${loaded}/${total})`);
    };

    loader.manager = loadingManager;

    const tryLoadModel = async () => {
      if (modelLoadedRef.current) {
        console.log('Model already loaded, skipping...');
        return;
      }

      try {
        console.log(`Attempting to load model from: ${modelPath}`);

        await new Promise((resolve, reject) => {
          loader.load(
            modelPath,
            (gltf) => {
              if (modelLoadedRef.current) {
                console.log('Model already loaded during this attempt, skipping...');
                resolve();
                return;
              }

              console.log('Model loaded successfully!', gltf);
              modelLoadedRef.current = true;

              const model = gltf.scene;

              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());

              console.log('Model size:', size);
              console.log('Model center:', center);

              model.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  console.log('Mesh found:', child.name || 'unnamed');

                  if (child.material) {
                    console.log('Material:', child.material);
                    if (child.material.map) {
                      console.log('Texture found:', child.material.map);
                    }
                  }
                }
              });
              model.position.y = 0.5;
              model.position.x = -0.2;
              scene.add(model);
              console.log('Model added to scene');
              resolve();
            },
            (xhr) => {
              const progress = (xhr.loaded / xhr.total) * 100;
              console.log(`Loading progress: ${progress.toFixed(2)}%`);
            },
            (error) => {
              console.error(`Failed to load from ${modelPath}:`, error);
              reject(error);
            }
          );
        });
      } catch (error) {
        console.log(`Path ${modelPath} failed, trying fallback...`);

        if (error.message && error.message.includes('could not be decoded')) {
          console.log('Attempting to load model without textures...');
          try {
            await tryLoadWithoutTextures(modelPath);
          } catch (fallbackError) {
            console.log('Fallback loading also failed:', fallbackError);
          }
        }
      }
    };

    const tryLoadWithoutTextures = async (path) => {
      if (modelLoadedRef.current) {
        console.log('Model already loaded, skipping fallback...');
        return;
      }

      return new Promise((resolve, reject) => {
        loader.load(
          path,
          (gltf) => {
            if (modelLoadedRef.current) {
              console.log('Model already loaded during fallback, skipping...');
              resolve();
              return;
            }

            console.log('Model loaded without textures!');
            modelLoadedRef.current = true;

            const model = gltf.scene;

            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                child.material = new THREE.MeshStandardMaterial({
                  color: 0x888888,
                  metalness: 0.1,
                  roughness: 0.8,
                });
              }
            });
            scene.add(model);
            console.log('Model added to scene without textures');
            resolve();
          },
          undefined,
          reject
        );
      });
    };

    tryLoadModel();

    // === Handle Resize ===
    const handleResize = () => {
      const width = container.clientWidth;
      const height = width / aspectRatio;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // === Animation Loop ===
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    // === Cleanup ===
    return () => {
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef} // Wrap with containerRef div for sizing
      style={{
        width: '40%',
        position: 'relative',
        border:'1px solid rgb(0,100,100)',
        borderRadius:"0px 25px 25px 0",
        margin:"20px 20px  10px -1px"
      }}
    >
      <div
        ref={mountRef}
        className="model-car"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '16 / 9',
          borderRadius:"25px",
          overflow:"hidden",
        }}
      />
    </div>
  );
};