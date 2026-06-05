'use client'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { FullWidthDivider } from '@/components/full-width-divider'
import { Form } from '@/components/ui/form'
import { formSchema, LoginFormValues } from 'types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import FormInput from '@/components/form-input'
import { loginAction } from 'actions/auth'
import { useForm } from 'react-hook-form'

export function AuthPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const handleLogin = async ({ email, password, passwordHash }: any) => {
    const { user } = await loginAction({ email, password })
    try {
      if (user) {
        toast.success('Giriş başarılı! Yönlendiriliyorsunuz...')
      } else {
        toast.error('❌ Giriş başarısız, yönlendirme yapılmadı.')
      }
    } catch (error) {
      toast.error('Giriş sırasında bir hata oluştu.')
    }
  }

  return (
    <div className="relative w-full overflow-hidden px-4 md:h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center border-x *:px-6">
        <div className="flex flex-col space-y-6">
          <a aria-label="Home" className="" href="#">
            <Logo className="h-4.5" />
          </a>
          <div className="space-y-1">
            <h1 className="font-semibold text-xl tracking-wide">Hey, welcome!</h1>
            <p className="text-base text-muted-foreground">
              Log in or sign up. It only takes a moment.
            </p>
          </div>
        </div>

        <div className="relative my-6 flex size-full flex-col gap-4 py-8">
          <FullWidthDivider position="top" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
              <FormInput
                form={form}
                name="email"
                placeholder="E-posta Adresi Girin"
                title="E-posta"
                type="email"
              />

              <FormInput
                form={form}
                name="password"
                placeholder="Şifre Girin"
                title="Şifre"
                type="password"
              />

              <Button
                type="submit"
                className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Giriş Yap
              </Button>
            </form>
          </Form>
          <FullWidthDivider position="bottom" />
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Siber Sistem Geliştirme Komutanlığı
        </p>
      </div>
    </div>
  )
}
