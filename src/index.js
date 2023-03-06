import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Loader from './components/Loader';
import List from './views/sale-order/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadList, loadDetails, loadCustomersAndProucts } from './views/sale-order/loaderData';
import Details from './views/sale-order/Details';
import Create from './views/sale-order/Create';

const router = createBrowserRouter([
  {
    path: '/',
    loader: loadList,
    element: <List />
  },
  {
    path: '/:id',
    loader: loadDetails,
    element: <Details />
  },
  {
    path: '/create',
    loader: loadCustomersAndProucts,
    element: <Create />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
