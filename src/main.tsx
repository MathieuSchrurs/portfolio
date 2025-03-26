// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'; // Import Tailwind first
import './index.css'  // Then other styles
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
