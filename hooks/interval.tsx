import { useRef, useEffect } from 'react'

function useInterval(callback: any, delay: number) {
    const savedCallback = useRef(() => {})

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

export default useInterval
