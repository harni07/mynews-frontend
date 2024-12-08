import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { store } from './store'
import { Provider } from 'react-redux';
import {
    RouterProvider,
} from "react-router-dom";
import {router} from "./route";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

