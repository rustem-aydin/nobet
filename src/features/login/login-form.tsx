'use client'

import { useEffect, useState } from 'react'
import { useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { LoginFormData, loginSchema } from 'types/schemas'
import { toast } from 'sonner'
import { loginAction } from '@/collections/Personnel/actions/auth'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onTypingChange: (isTyping: boolean) => void
  onPasswordChange: (password: string) => void
  onShowPasswordChange: (show: boolean) => void
  onErrorsChange: (errors: FieldErrors<LoginFormData>) => void
  onSubmitErrorChange: (error: string) => void
  onSuccessChange: (success: boolean) => void
}

export function LoginForm({
  onTypingChange,
  onPasswordChange,
  onShowPasswordChange,
  onErrorsChange,
  onSubmitErrorChange,
  onSuccessChange,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  // Validation hatalarını parent'a ilet
  useEffect(() => {
    onErrorsChange(form.formState.errors)
  }, [form.formState.errors, onErrorsChange])

  // Submit hatasını parent'a ilet
  useEffect(() => {
    onSubmitErrorChange(submitError)
  }, [submitError, onSubmitErrorChange])

  const handleShowPasswordToggle = () => {
    const newValue = !showPassword
    setShowPassword(newValue)
    onShowPasswordChange(newValue)
  }

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError('')
    setIsLoading(true)
    onSuccessChange(false)

    try {
      const result = await loginAction({ email: data.email, password: data.password })

      if (result.success) {
        onSuccessChange(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        router.refresh()
        onSubmitErrorChange('')
      } else {
        const err = result.message || 'Invalid email or password. Please try again.'
        setSubmitError(err)
        onSubmitErrorChange(err)
        onSuccessChange(false)

        console.log('❌ Login failed')
      }
    } catch (error) {
      const err = 'An unexpected error occurred. Please try again.'
      setSubmitError(err)
      onSubmitErrorChange(err)
      onSuccessChange(false)

      toast.error('Error', {
        description: err,
        duration: 4000,
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-105">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Mail className="size-4 text-primary" />
        </div>
        <span>YourBrand</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Giriş Yap</h1>
        <p className="text-muted-foreground text-sm">
          Nöbet Arayüzünüe girmek için formu doldurunuz
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="anna@gmail.com"
                    autoComplete="off"
                    className="h-12 bg-background border-border/60 focus:border-primary"
                    {...field}
                    onFocus={() => onTypingChange(true)}
                    onBlur={() => onTypingChange(false)}
                    onChange={(e) => {
                      field.onChange(e)
                      onTypingChange(true)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 pr-10 bg-background border-border/60 focus:border-primary"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        onPasswordChange(e.target.value)
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleShowPasswordToggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
