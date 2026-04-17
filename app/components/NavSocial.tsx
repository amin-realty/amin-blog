'use client'

import { useState, useEffect } from 'react'

const BASE = 386

export default function NavSocial() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(BASE)

  useEffect(() => {
    const storedLiked = localStorage.getItem('amin_liked') === '1'
    const storedExtra = parseInt(localStorage.getItem('amin_likes') || '0')
    setLiked(storedLiked)
    setCount(BASE + storedExtra)
  }, [])

  const toggleLike = () => {
    if (!liked) {
      const newCount = count + 1
      setLiked(true)
      setCount(newCount)
      localStorage.setItem('amin_liked', '1')
      localStorage.setItem('amin_likes', String(newCount - BASE))
    } else {
      const newCount = count - 1
      setLiked(false)
      setCount(newCount)
      localStorage.setItem('amin_liked', '0')
      localStorage.setItem('amin_likes', String(newCount - BASE))
    }
  }

  return (
    <div style={{
      position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)',
      zIndex: 999, borderRadius: '12px 0 0 12px', overflow: 'hidden',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
    }}>
      <button
        onClick={toggleLike}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: liked ? '#fff1f2' : '#fff',
          border: 'none', padding: '14px 16px', cursor: 'pointer',
          fontFamily: 'inherit', minWidth: 72, transition: 'background .2s',
        }}
      >
        <span style={{ fontSize: '1.5rem', display: 'inline-block', transform: liked ? 'scale(1.2)' : 'scale(1)', transition: 'transform .2s' }}>👍</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b91c1c' }}>{liked ? '已按讚' : '按讚'}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#b91c1c' }}>{count}</span>
      </button>
    </div>
  )
}
