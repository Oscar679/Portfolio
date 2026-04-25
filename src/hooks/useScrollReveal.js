import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { root = null, rootMargin = '0px', threshold = 0.15 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('revealed')
        observer.unobserve(el)
      }
    }, { root, rootMargin, threshold })

    observer.observe(el)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold])

  return ref
}
