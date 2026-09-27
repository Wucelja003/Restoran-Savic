import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.08 }}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </ReactLenis>
  </StrictMode>,
)
