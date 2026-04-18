import React, { useEffect, useState } from 'react'

export default function Toast({ message, show }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--green)', color: '#0a3d24',
      fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700,
      padding: '9px 20px', borderRadius: 30,
      opacity: show ? 1 : 0, pointerEvents: 'none',
      transition: 'opacity 0.2s', zIndex: 200, whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  )
}
