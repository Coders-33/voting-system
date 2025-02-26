import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./Styling/global.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './Context/UserContext.tsx';
createRoot(document.getElementById('root')!).render(
 
    <AuthContextProvider>
    <App />
    </AuthContextProvider>

)
