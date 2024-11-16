import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
//import Signup from './Signup.tsx'
import QuestionForm from "./mainMenu.tsx";

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="15675128597-staqbibejtf8m4qsenndlla407s9k036.apps.googleusercontent.com">
        <QuestionForm />
      </GoogleOAuthProvider>
  </StrictMode>,
)
