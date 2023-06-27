import ReactDOM from 'react-dom/client'
import { ContextProvider } from './Context/ContextProvider';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)
