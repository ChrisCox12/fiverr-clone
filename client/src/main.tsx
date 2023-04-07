import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import { 
  Login, 
  Home, 
  Gigs, 
  Gig, 
  AddGig, 
  Orders, 
  MyGigs, 
  Messages, 
  Message, 
  Category, 
  Register, 
  Checkout, 
  Success, 
  EditGig 
} from './pages';
import { Footer, Navbar } from './components';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CurrentUserProvider } from './hooks/UserContext';

// initializes a QueryClient for react-query
const queryClient = new QueryClient();

// defines a layout for the entire app
function Layout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

const router = createBrowserRouter([ 
  {
    path: '/', 
    element: <Layout />,
    children: [
      {
        path: '', 
        element: <Home />
      },
      {
        path: 'categories/:category',
        element: <Category />
      },
      {
        path: 'gig/:id',
        element: <Gig />
      },
      {
        path: 'add-gig',
        element: <AddGig />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'mygigs',
        element: <MyGigs />
      },
      {
        path: 'messages',
        element: <Messages />
      },
      {
        path: 'message/:id',
        element: <Message />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'checkout/:id',
        element: <Checkout />
      },
      {
        path: 'success',
        element: <Success />
      },
      {
        path: 'edit-gig/:id',
        element: <EditGig />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <CurrentUserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
);
