import React, { useRef, useEffect } from 'react'

export const useInterval = (callback, delay) => {
    const savedCallback = useRef()

    // stores the latest callback
    useEffect(() => {
        savedCallback.current = callback
    })

    // sets up the interval
    useEffect(() => {
        const tick = () => {
            if (typeof savedCallback?.current !== undefined) {
                savedCallback.current()
            }
            if (delay !== null) {
                const id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }
    }, [delay])
}
