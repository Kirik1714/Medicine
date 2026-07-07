/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState, type ReactNode } from 'react'
import { Home, Table2, Layers, FileText, Sun, Bell, Grid, Moon, Menu, X } from 'lucide-react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_profile')
    navigate({ to: '/login' })
  }

  const navLinks = (
    <>
      <Link 
        to="/" 
        onClick={() => setIsMobileMenuOpen(false)}
        activeProps={{ className: 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-500/10 rounded-lg px-3 py-1.5 w-full lg:w-auto' }}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg px-3 py-1.5 transition duration-150"
      >
        <Home className="w-4.5 h-4.5" />
        <span>Home</span>
      </Link>

      <Link 
        to="/medications" 
        onClick={() => setIsMobileMenuOpen(false)}
        activeProps={{ className: 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-500/10 rounded-lg px-3 py-1.5 w-full lg:w-auto' }}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg px-3 py-1.5 transition duration-150"
      >
        <Table2 className="w-4.5 h-4.5" />
        <span>Tables</span>
      </Link>

      <div className="flex items-center gap-2 text-sm font-medium text-slate-300 dark:text-slate-600 cursor-not-allowed px-3 py-1.5">
        <Layers className="w-4.5 h-4.5" />
        <span>Process</span>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-slate-300 dark:text-slate-600 cursor-not-allowed px-3 py-1.5">
        <FileText className="w-4.5 h-4.5" />
        <span>Documentation</span>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-200">
      
      <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-40 h-16 px-4 sm:px-8 flex items-center transition-colors duration-200">
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer transition"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <nav className="hidden lg:flex items-center gap-8 md:ml-[20%]">
          {navLinks}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-orange-50 dark:bg-slate-700 flex items-center justify-center text-orange-500 dark:text-yellow-400 hover:bg-orange-100 dark:hover:bg-slate-600 transition duration-200 cursor-pointer"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition relative p-1">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition p-1">
            <Grid className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-100 dark:border-slate-700 h-8">
            <img 
              src={'https://dummyjson.com/icon/emilys/128'} 
              alt="User" 
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 dark:border-slate-600 object-cover"
            />
            
            <button 
              onClick={handleLogout}
              className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium ml-1 transition"
            >
              Log out
            </button>
          </div>

        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 flex flex-col gap-2 transition-all duration-200 animate-fade-in z-30 sticky top-16">
          {navLinks}
        </div>
      )}

      <main className="flex-1 py-8 px-4 sm:px-8 max-w-full w-full mx-auto min-w-0">
        {children}
      </main>
    </div>
  ) 
}