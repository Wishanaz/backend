import AppRoutes from './AppRoutes'
import './features/shared/global.scss'


import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'

import AuthInitializer from './features/auth/components/AuthInitializer'



const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AuthInitializer>
          <AppRoutes/>
        </AuthInitializer>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App