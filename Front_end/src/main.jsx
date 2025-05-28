import React from 'react'
import { GlobalProvider } from './contexts/GlobalProvider'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router/routes'
import './index.css'

createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </GlobalProvider>


)
