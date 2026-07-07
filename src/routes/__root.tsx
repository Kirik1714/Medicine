/* eslint-disable react-refresh/only-export-components */
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'

export const Route = createRootRoute({

  beforeLoad:({location})=>{
    const isAuthenticated = !!localStorage.getItem("auth_token");
    const isPublicRoute = location.pathname === '/login' || location.pathname === '/register';
    if(!isAuthenticated && !isPublicRoute){
      throw redirect({
        to:'/login'
      })
      
    }
    if (isAuthenticated && isPublicRoute) {
      throw redirect({
        to: '/', 
      })
    }
    
  },
  component: RootComponent,
})

function RootComponent() {
  
  return (
   <Outlet/>
  )
}
