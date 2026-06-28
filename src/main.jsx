import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './scss/index.scss'
import './scss/bootSequence.scss'
import './scss/Desktop.scss'
import './components/mouseFollower/MouseFollower.scss'
import { App } from './App'
import 'remixicon/fonts/remixicon.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

)
