import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './scss/index.scss'
import './scss/bootSequence.scss'
import './scss/Desktop.scss'
import './components/mouseFollower/MouseFollower.scss'
import './scss/terminal.scss'
import './scss/Searchbar.scss'
import { App } from './App'
import 'remixicon/fonts/remixicon.css'
import './scss/Text.scss'
import './scss/TopRightDate.scss'
import './scss/Dock.scss'
import './scss/Button.scss'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

)
