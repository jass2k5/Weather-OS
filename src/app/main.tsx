import { createRoot } from 'react-dom/client';
import '../shared/styles/index.scss'
import { App } from './App'
import 'remixicon/fonts/remixicon.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(//!gurantees the ts that the element exists.

    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

)
