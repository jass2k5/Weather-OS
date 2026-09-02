import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react"; 
import '../shared/styles/index.scss';
import { App } from './App';
import 'remixicon/fonts/remixicon.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

Sentry.init({

  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration()
  ],
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0 
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);