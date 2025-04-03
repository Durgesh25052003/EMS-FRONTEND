"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from "lucide-react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Replace with actual authentication logic
      if (email === "admin@example.com" && password === "password") {
        window.location.href = "/dashboard"
      } else {
        setError("Invalid email or password")
        setIsLoading(false)
      }
    }, 1500)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()

    if (!forgotEmail) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setResetSent(true)
      // In a real app, you would call your API to send a password reset email
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="absolute inset-0 z-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-6 text-white">
          <div className="mb-2 flex items-center">
            <User className="mr-2 h-6 w-6" />
            <h1 className="text-2xl font-bold">EMS Portal</h1>
          </div>
          <p className="text-blue-100">{showForgotPassword ? "Reset your password" : "Sign in to your account"}</p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {!showForgotPassword ? (
            // Login Form
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-center text-sm font-medium text-white hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          ) : (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword}>
              {resetSent ? (
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <h3 className="mb-2 text-lg font-medium text-green-800">Password Reset Email Sent</h3>
                  <p className="mb-4 text-sm text-green-700">
                    We've sent a password reset link to <strong>{forgotEmail}</strong>. Please check your inbox and
                    follow the instructions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false)
                      setResetSent(false)
                      setForgotEmail("")
                    }}
                    className="rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <p className="mb-4 text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <div className="mb-6">
                    <label htmlFor="forgot-email" className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="mr-2 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Don't have an account? Contact your administrator</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

