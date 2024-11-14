import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
// import Login from './Login.tsx'
import QuestionForm from "./mainMenu.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuestionForm />
  </StrictMode>,
)
