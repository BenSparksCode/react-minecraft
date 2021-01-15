import React from 'react'
import { usePlane } from 'use-cannon'
import { TextureLoader, RepeatWrapping } from 'three'
import { useStore } from '../hooks/useStore'

import grass from '../images/grass.jpg'

export const Ground = (props) => {
    const [addCube, activeTexture] = useStore(state => [
        state.addCube,
        state.texture
    ])
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        ...props
    }))
    const texture = new TextureLoader().load(grass)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(100, 100)

    return (
        <mesh ref={ref} receiveShadow
            onClick={(e) => {
                e.stopPropagation()
                const [x, y, z] = Object.values(e.point).map(coord => Math.ceil(coord))
                addCube(x, y, z, activeTexture)
            }}
        >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshLambertMaterial attach='material' map={texture} />
        </mesh>
    )
}
