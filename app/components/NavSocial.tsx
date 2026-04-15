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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* 按讚 */}
      <button
        onClick={toggleLike}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: liked ? '#b91c1c' : '#fff1f2',
          border: `1.5px solid ${liked ? '#b91c1c' : '#fca5a5'}`,
          color: liked ? '#fff' : '#b91c1c',
          borderRadius: 8, padding: '7px 13px', cursor: 'pointer',
          fontSize: '0.85rem', fontWeight: 700, fontFamily: 'inherit',
          transition: 'background .2s',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '1rem', display: 'inline-block', transform: liked ? 'scale(1.3)' : 'scale(1)', transition: 'transform .2s' }}>👍</span>
        <span>{liked ? '已按讚' : '按讚'}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 800, minWidth: 22 }}>{count}</span>
      </button>

      {/* 追蹤 */}
      <a
        href="https://www.facebook.com/fantasichouse"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleFollow}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: followed ? '#374151' : '#1877F2',
          color: '#fff', borderRadius: 8,
          padding: '7px 14px', cursor: 'pointer',
          fontSize: '0.85rem', fontWeight: 700,
          textDecoration: 'none', whiteSpace: 'nowrap',
          transition: 'background .2s',
        }}
      >
        <span>{followed ? '✓' : '＋'}</span>
        <span>{followed ? '已追蹤' : '追蹤最新消息'}</span>
      </a>
    </div>
  )
}
