'use client'

import { useState, useEffect } from 'react'

const BASE = 386

export default function NavSocial() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(BASE)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    const storedLiked = localStorage.getItem('amin_liked') === '1'
    const storedExtra = parseInt(localStorage.getItem('amin_likes') || '0')
    const storedFollowed = localStorage.getItem('amin_followed') === '1'
    setLiked(storedLiked)
    setCount(BASE + storedExtra)
    setFollowed(storedFollowed)
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

  const handleFollow = () => {
    localStorage.setItem('amin_followed', '1')
    setFollowed(true)
  }

  return (
    <div style={{
      position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)',
      zIndex: 999, display: 'flex', flexDirection: 'column',
      borderRadius: '12px 0 0 12px', overflow: 'hidden',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
    }}>
      {/* 按讚 */}
      <button
        onClick={toggleLike}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: liked ? '#fff1f2' : '#fff',
          border: 'none', borderBottom: '1px solid #f0e0e0',
          padding: '14px 16px', cursor: 'pointer',
          fontFamily: 'inherit', minWidth: 72,
          transition: 'background .2s',
        }}
      >
        <span style={{ fontSize: '1.5rem', display: 'inline-block', transform: liked ? 'scale(1.2)' : 'scale(1)', transition: 'transform .2s' }}>👍</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b91c1c' }}>{liked ? '已按讚' : '按讚'}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#b91c1c' }}>{count}</span>
      </button>

      {/* 追蹤 */}
      <a
        href="https://www.facebook.com/fantasichouse"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleFollow}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: followed ? '#374151' : '#1877F2',
          padding: '14px 16px', cursor: 'pointer',
          textDecoration: 'none', transition: 'background .2s',
        }}
      >
        <span style={{ fontSize: '1.3rem', color: '#fff' }}>{followed ? '✓' : '＋'}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>
          {followed ? '已追蹤' : '追蹤\n最新消息'}
        </span>
      </a>
    </div>
  )
}
