import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
 
import '../styles/index.css';
import  AuthPage  from '../features/auth/pages/AuthPage.jsx';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthPage/>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)