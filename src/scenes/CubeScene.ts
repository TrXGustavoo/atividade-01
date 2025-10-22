import * as THREE from "three";
import { Renderer } from "expo-three";

export function createCubeScene(gl: any) {
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

  // cena + câmera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
  camera.position.z = 2;

  // renderer
  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);

  // iluminação
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 4, 5);
  scene.add(directionalLight);

  // cubo vermelho
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // loop de animação
  const render = () => {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();

  // retorna cena para expandir depois
  return { scene, camera, renderer, cube };
}