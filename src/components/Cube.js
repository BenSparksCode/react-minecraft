import React, { useState } from 'react'
import { useBox } from 'use-cannon'

import * as textures from '../textures'

export const Cube = ({ position, texture, ...props }) => {
    const [hover, setHover] = useState(null)
    const [ref] = useBox(() => ({
        type: "Static",
        position,
        ...props
    }))


    return (
        <mesh castShadow ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation()
                setHover(Math.floor(e.faceIndex / 2))
            }}
            onPointerOut={() => setHover(null)}
        >
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    attachArray='material'
                    map={textures[texture]}
                    key={index}
                    color={hover === index ? 'gray' : 'white'}
                    opacity={texture === 'glass' ? 0.7 : 1}
                    transparent
                />
            ))}
            <boxBufferGeometry attach='geometry' />
        </mesh>
    )
}
