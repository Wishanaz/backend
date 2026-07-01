import React from 'react'
// import FaceExpression from './features/expression/components/FaceExpression'

import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./features/shared/styles/golbal.scss"
import { AuthProvider } from './features/auth/auth.context'


const App = () => {
  return (

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

    // <FaceExpression/>
  )
}

export default App