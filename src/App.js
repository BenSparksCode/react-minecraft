import { Canvas } from 'react-three-fiber'
import { Sky } from 'drei'
import { Physics } from 'use-cannon'
import { nanoid } from 'nanoid'

import { useStore } from './hooks/useStore'
import { useInterval } from './hooks/useInterval'

import './App.css';

import { Ground } from './components/Ground'
import { Player } from './components/Player'
import { Cube } from './components/Cube'

function App() {
  const [cubes, saveWorld] = useStore((state) => [state.cubes, state.saveWorld])

  useInterval(() => {
    saveWorld(cubes)
    console.log("Saved game state.");
  }, 10000)

  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight
        castShadow
        intensity={0.7}
        position={[100, 100, 100]}
      />
      <Physics gravity={[0, -30, 0]}>
        {/* world objects go here */}
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />

        {cubes.map(cube => <Cube key={nanoid()} position={cube.pos} texture={cube.texture} />)}


      </Physics>
    </Canvas>
  );
}

export default App;
