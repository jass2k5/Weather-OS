import { createRoot } from 'react-dom/client';
import '../shared/styles/index.scss'
import { App } from './App'
import 'remixicon/fonts/remixicon.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

)
