'use client'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { HomeIcon, ArrowLeft } from 'lucide-react'

const NotFoundd = () => {
  const getPreviousUrl = () => {
    return sessionStorage.getItem('last-calendar-url') || document.referrer || '/'
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
            404
          </EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
            İstenilen sayfa bulunamadı
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <a href="/">
                <HomeIcon className="size-4 mr-2" data-icon="inline-start" />
                Go Home
              </a>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                window.location.replace(getPreviousUrl())
              }}
            >
              <ArrowLeft className="size-4 mr-2" data-icon="inline-start" />
              Geri Dön
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFoundd
