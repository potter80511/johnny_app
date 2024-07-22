import { useEffect } from 'react'

const useOnClickOutside = (ref: any, callback: () => void): void => {
  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    window.addEventListener('click', handler)

    return () => {
      window.removeEventListener('click', handler)
    }
  }, [callback, ref])
}

export default useOnClickOutside
