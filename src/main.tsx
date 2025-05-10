import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import index from '@/store';
import './assets/css/app.scss';

import App from '@/App';
import {Suspense} from "react";
import {RouteLoadingComponent} from "@/routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={index}>
    <QueryClientProvider client={queryClient}>
    <Suspense fallback={<RouteLoadingComponent/>}>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </Suspense>
    </QueryClientProvider>
  </Provider>,
);
