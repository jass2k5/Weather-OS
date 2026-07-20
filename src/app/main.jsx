import { createRoot } from 'react-dom/client';
import '../shared/styles/index.scss'
import '../shared/styles/bootSequence.scss'
import '../shared/styles/Desktop.scss'
import '../shared/components/mouseFollower/MouseFollower.scss'
import '../shared/styles/terminal.scss'
import '../shared/styles/Searchbar.scss'
import { App } from './App'
import 'remixicon/fonts/remixicon.css'
import '../shared/styles/Text.scss'
import '../shared/styles/TopRightDate.scss'
import '../shared/styles/Dock.scss'
import '../shared/styles/Button.scss'
import '../shared/styles/ClockTerminal.scss'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

)
