import { useEffect, RefObject } from 'react'

/**
 * Applies CSS animation classes when elements scroll into view.
 * Content is ALWAYS visible — animations are purely additive enhancement.
 * Uses data-anim="up|left|right" and data-delay="ms" attributes.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current
    if (!section) return

    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-anim]'))
    if (items.length === 0) return

    const classMap: Record<string, string> = {
      up:    'anim-up',
      left:  'anim-left',
      right: 'anim-right',
    }

    const animate = () => {
      items.forEach((el, i) => {
        const dir   = el.dataset.anim || 'up'
        const delay = parseInt(el.dataset.delay || '0') + i * 70
        const cls   = classMap[dir] || 'anim-up'
        setTimeout(() => {
          el.style.animationDelay = delay + 'ms'
          el.classList.add(cls)
        }, 10)
      })
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate()
          obs.disconnect()
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' })

    obs.observe(section)

    // If already in viewport on mount (e.g., hero), fire immediately
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate()
      obs.disconnect()
    }

    return () => obs.disconnect()
  }, [])
}
