import React, { useEffect, useRef } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core';

const ImageD = ({ imageUrl }) => {
  const sceneRef = useRef(null);
  useEffect(() => {
    const engine = new Engine(sceneRef.current, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
    camera.panningSensibility = 1000;  
    camera.inertia = 0.5; 
    camera.attachControl(sceneRef.current, true);


    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    const box = MeshBuilder.CreateBox("box", { height: 4, width: 4, depth: 4 }, scene);

    const material = new StandardMaterial("boxMaterial", scene);
    material.diffuseTexture = new Texture(imageUrl, scene);
    
    box.material = material;

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [imageUrl]);

  return <canvas ref={sceneRef} style={{ width: '80%%', height: '50vh' }} />;
};

export default ImageD;
