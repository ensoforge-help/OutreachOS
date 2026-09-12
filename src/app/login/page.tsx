'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login delay
    setTimeout(() => router.push('/dashboard'), 600)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-[360px] space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            OutreachOS
          </h1>
          <p className="text-sm text-muted-foreground">
            Outreach management platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@outreachos.com"
              defaultValue="admin@outreachos.com"
              className="h-10 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-muted-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              defaultValue="password"
              className="h-10 bg-card border-border text-foreground"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 mt-2 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <p className="text-center">
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </p>
      </div>
    </div>
  )
}
