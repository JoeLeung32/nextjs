import { useRef, useEffect } from 'react'

interface CallBackProvider {
    callback: () => void
}

const useInterval = (callback: CallBackProvider, delay: number) => {
    const savedCallback = useRef(() => ({}))

    // Remember the latest function.
    useEffect(() => {
        if (savedCallback && savedCallback.current) {
            if (callback && typeof callback === 'function') {
                savedCallback.current = callback
            }
        }
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback && typeof savedCallback.current === 'function') {
                savedCallback.current()
                return true
            }
            return false
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
        return undefined
    }, [delay])
}

export default useInterval
