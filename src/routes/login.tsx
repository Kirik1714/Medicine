/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";

import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../features/auth/hooks/useLogin";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
 const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isPending,
    error,
    handleSubmit,
  } = useLogin();

 return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-200">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/80 transition-colors duration-200">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white">
          Pharmacy App
        </h2>
        <p className="text-sm text-center text-slate-400 dark:text-slate-500 mt-2">
          Sign in to the Medicine Testing Portal
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/50 text-center font-medium">
              {error.message === "Invalid username or password"
                ? "Invalid username or password."
                : "Network error. Please try again later."}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. emilys"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm"
              disabled={isPending}
            />
          </div>

         <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm"
                disabled={isPending}
              />
              <button
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer disabled:cursor-not-allowed"
                tabIndex={-1} 
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl shadow-md shadow-blue-500/10 transition duration-200 text-sm mt-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
        
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>Hint for test user:</p>
          <p className="font-mono mt-1 text-slate-500 dark:text-slate-400">
            Логин: <span className="text-blue-600 dark:text-blue-400">emilys</span> | Пароль:{" "}
            <span className="text-blue-600 dark:text-blue-400">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  );

}
