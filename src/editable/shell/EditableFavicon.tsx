'use client'

import { useEffect } from 'react'
import favicon from '@/editable/assets/capsigrow-favicon.png'

export function EditableFavicon() {
  useEffect(() => {
    const href = typeof favicon === 'string' ? favicon : favicon.src
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-editable-favicon="capsigrow"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/png'
      link.dataset.editableFavicon = 'capsigrow'
      document.head.appendChild(link)
    }
    link.href = href
  }, [])

  return null
}
