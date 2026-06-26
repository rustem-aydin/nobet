'use client'

import { useEffect, useRef, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { Sparkles, CheckCircle2, PartyPopper } from 'lucide-react'

import { EyeBall } from './EyeBall'
import { Pupil } from './Pupil'
import { LoginForm } from './login-form'
import { LoginFormData } from 'types/schemas'

// Speech Bubble Component
function SpeechBubble({
  message,
  visible,
  type = 'error',
}: {
  message: string
  visible: boolean
  type?: 'error' | 'success'
}) {
  if (!visible || !message) return null

  const isSuccess = type === 'success'

  return (
    <div
      className="absolute z-50 animate-in fade-in zoom-in-95 duration-300"
      style={{
        bottom: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'max-content',
        maxWidth: '220px',
      }}
    >
      <div
        className={`relative px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
          isSuccess
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-white text-red-600 border-red-100'
        }`}
      >
        {isSuccess && <CheckCircle2 className="size-4 text-green-500 shrink-0" />}
        {message}
        {/* Triangle pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-0 h-0"
          style={{
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${isSuccess ? '#f0fdf4' : 'white'}`,
          }}
        />
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [mouseX, setMouseX] = useState<number>(0)
  const [mouseY, setMouseY] = useState<number>(0)
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false)
  const [isBlackBlinking, setIsBlackBlinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isPurplePeeking, setIsPurplePeeking] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<FieldErrors<LoginFormData>>({})
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const purpleRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const yellowRef = useRef<HTMLDivElement>(null)
  const orangeRef = useRef<HTMLDivElement>(null)

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Purple blinking
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true)
        setTimeout(() => {
          setIsPurpleBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
      return blinkTimeout
    }
    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  // Black blinking
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true)
        setTimeout(() => {
          setIsBlackBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
      return blinkTimeout
    }
    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  // Looking at each other when typing
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true)
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setIsLookingAtEachOther(false)
    }
  }, [isTyping])

  // Purple peeking when password visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(
          () => {
            setIsPurplePeeking(true)
            setTimeout(() => {
              setIsPurplePeeking(false)
            }, 800)
          },
          Math.random() * 3000 + 2000,
        )
        return peekInterval
      }
      const firstPeek = schedulePeek()
      return () => clearTimeout(firstPeek)
    } else {
      setIsPurplePeeking(false)
    }
  }, [password, showPassword, isPurplePeeking])

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 }

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 3

    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY

    const faceX = Math.max(-15, Math.min(15, deltaX / 20))
    const faceY = Math.max(-10, Math.min(10, deltaY / 30))
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120))

    return { faceX, faceY, bodySkew }
  }

  const purplePos = calculatePosition(purpleRef)
  const blackPos = calculatePosition(blackRef)
  const yellowPos = calculatePosition(yellowRef)
  const orangePos = calculatePosition(orangeRef)

  // Success durumunda karakterler mutlu olsun
  const successTransform = isSuccess ? 'scale(1.05)' : 'scale(1)'
  const successTransition = isSuccess ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Content Section - Characters */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground overflow-hidden">
        {/* Success Overlay */}

        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="size-8 rounded-lg bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span>YourBrand</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className="relative" style={{ width: '550px', height: '400px' }}>
            {/* Purple tall rectangle character - Back layer */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '70px',
                width: '180px',
                height: isSuccess
                  ? '460px'
                  : isTyping || (password.length > 0 && !showPassword)
                    ? '440px'
                    : '400px',
                backgroundColor: isSuccess ? '#22c55e' : '#6C3FF5',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: isSuccess
                  ? `skewX(0deg) ${successTransform} translateY(-10px)`
                  : password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : isTyping || (password.length > 0 && !showPassword)
                      ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                      : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
                transition: successTransition,
              }}
            >
              {/* Success Bubble */}
              <SpeechBubble
                message={
                  isSuccess ? 'Giriş Başarılı! 🎉' : formErrors.email?.message?.toString() || ''
                }
                visible={isSuccess || !!formErrors.email}
                type={isSuccess ? 'success' : 'error'}
              />

              {/* Eyes - Success'ta mutlu gözler */}
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: isSuccess
                    ? '45px'
                    : password.length > 0 && showPassword
                      ? `${20}px`
                      : isLookingAtEachOther
                        ? `${55}px`
                        : `${45 + purplePos.faceX}px`,
                  top: isSuccess
                    ? '30px'
                    : password.length > 0 && showPassword
                      ? `${35}px`
                      : isLookingAtEachOther
                        ? `${65}px`
                        : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={isSuccess ? 3 : 7}
                  maxDistance={isSuccess ? 2 : 5}
                  eyeColor="white"
                  pupilColor={isSuccess ? '#16a34a' : '#2D2D2D'}
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    isSuccess
                      ? 0
                      : password.length > 0 && showPassword
                        ? isPurplePeeking
                          ? 4
                          : -4
                        : isLookingAtEachOther
                          ? 3
                          : undefined
                  }
                  forceLookY={
                    isSuccess
                      ? -2
                      : password.length > 0 && showPassword
                        ? isPurplePeeking
                          ? 5
                          : -4
                        : isLookingAtEachOther
                          ? 4
                          : undefined
                  }
                />
                <EyeBall
                  size={18}
                  pupilSize={isSuccess ? 3 : 7}
                  maxDistance={isSuccess ? 2 : 5}
                  eyeColor="white"
                  pupilColor={isSuccess ? '#16a34a' : '#2D2D2D'}
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    isSuccess
                      ? 0
                      : password.length > 0 && showPassword
                        ? isPurplePeeking
                          ? 4
                          : -4
                        : isLookingAtEachOther
                          ? 3
                          : undefined
                  }
                  forceLookY={
                    isSuccess
                      ? -2
                      : password.length > 0 && showPassword
                        ? isPurplePeeking
                          ? 5
                          : -4
                        : isLookingAtEachOther
                          ? 4
                          : undefined
                  }
                />
              </div>

              {/* Success'ta gülümseme */}
              {isSuccess && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-8 border-b-4 border-white rounded-full" />
                </div>
              )}
            </div>

            {/* Black tall rectangle character - Middle layer */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '240px',
                width: '120px',
                height: isSuccess ? '330px' : '310px',
                backgroundColor: isSuccess ? '#16a34a' : '#2D2D2D',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform: isSuccess
                  ? `skewX(0deg) ${successTransform} translateY(-10px)`
                  : password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : isLookingAtEachOther
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                      : isTyping || (password.length > 0 && !showPassword)
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
                transition: successTransition,
              }}
            >
              {/* Success/Password Error Bubble */}
              <SpeechBubble
                message={
                  isSuccess ? 'Hayırlı olsun! ✨' : formErrors.password?.message?.toString() || ''
                }
                visible={isSuccess || !!formErrors.password}
                type={isSuccess ? 'success' : 'error'}
              />

              {/* Eyes */}
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: isSuccess
                    ? '26px'
                    : password.length > 0 && showPassword
                      ? `${10}px`
                      : isLookingAtEachOther
                        ? `${32}px`
                        : `${26 + blackPos.faceX}px`,
                  top: isSuccess
                    ? '25px'
                    : password.length > 0 && showPassword
                      ? `${28}px`
                      : isLookingAtEachOther
                        ? `${12}px`
                        : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={isSuccess ? 2 : 6}
                  maxDistance={isSuccess ? 2 : 4}
                  eyeColor="white"
                  pupilColor={isSuccess ? '#15803d' : '#2D2D2D'}
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    isSuccess
                      ? 0
                      : password.length > 0 && showPassword
                        ? -4
                        : isLookingAtEachOther
                          ? 0
                          : undefined
                  }
                  forceLookY={
                    isSuccess
                      ? -2
                      : password.length > 0 && showPassword
                        ? -4
                        : isLookingAtEachOther
                          ? -4
                          : undefined
                  }
                />
                <EyeBall
                  size={16}
                  pupilSize={isSuccess ? 2 : 6}
                  maxDistance={isSuccess ? 2 : 4}
                  eyeColor="white"
                  pupilColor={isSuccess ? '#15803d' : '#2D2D2D'}
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    isSuccess
                      ? 0
                      : password.length > 0 && showPassword
                        ? -4
                        : isLookingAtEachOther
                          ? 0
                          : undefined
                  }
                  forceLookY={
                    isSuccess
                      ? -2
                      : password.length > 0 && showPassword
                        ? -4
                        : isLookingAtEachOther
                          ? -4
                          : undefined
                  }
                />
              </div>

              {isSuccess && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-6 border-b-4 border-white rounded-full" />
                </div>
              )}
            </div>

            {/* Orange semi-circle character - Front left */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                backgroundColor: isSuccess ? '#86efac' : '#FF9B6B',
                borderRadius: '120px 120px 0 0',
                transform: isSuccess
                  ? `skewX(0deg) ${successTransform} translateY(-10px)`
                  : password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
                transition: successTransition,
              }}
            >
              {/* Submit Error/Success Bubble */}
              <SpeechBubble
                message={isSuccess ? 'Fazla Mazeret Girme! 🎊' : submitError}
                visible={isSuccess || !!submitError}
                type={isSuccess ? 'success' : 'error'}
              />

              {/* Eyes */}
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: isSuccess
                    ? '82px'
                    : password.length > 0 && showPassword
                      ? `${50}px`
                      : `${82 + (orangePos.faceX || 0)}px`,
                  top: isSuccess
                    ? '80px'
                    : password.length > 0 && showPassword
                      ? `${85}px`
                      : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={isSuccess ? 2 : 5}
                  pupilColor={isSuccess ? '#166534' : '#2D2D2D'}
                  forceLookX={isSuccess ? 0 : password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={isSuccess ? -2 : password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={isSuccess ? 2 : 5}
                  pupilColor={isSuccess ? '#166534' : '#2D2D2D'}
                  forceLookX={isSuccess ? 0 : password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={isSuccess ? -2 : password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>

              {isSuccess && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-10 border-b-4 border-green-800 rounded-full" />
                </div>
              )}
            </div>

            {/* Yellow tall rectangle character - Front right */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                backgroundColor: isSuccess ? '#4ade80' : '#E8D754',
                borderRadius: '70px 70px 0 0',
                zIndex: 4,
                transform: isSuccess
                  ? `skewX(0deg) ${successTransform} translateY(-10px)`
                  : password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
                transition: successTransition,
              }}
            >
              {/* Success Bubble */}
              <SpeechBubble message="Görüşürüz! 👍" visible={isSuccess} type="success" />

              {/* Eyes */}
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: isSuccess
                    ? '52px'
                    : password.length > 0 && showPassword
                      ? `${20}px`
                      : `${52 + (yellowPos.faceX || 0)}px`,
                  top: isSuccess
                    ? '35px'
                    : password.length > 0 && showPassword
                      ? `${35}px`
                      : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={isSuccess ? 2 : 5}
                  pupilColor={isSuccess ? '#14532d' : '#2D2D2D'}
                  forceLookX={isSuccess ? 0 : password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={isSuccess ? -2 : password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={isSuccess ? 2 : 5}
                  pupilColor={isSuccess ? '#14532d' : '#2D2D2D'}
                  forceLookX={isSuccess ? 0 : password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={isSuccess ? -2 : password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>

              {/* Horizontal line for mouth - Success'ta gülümseme */}
              {isSuccess ? (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <div className="w-14 h-7 border-b-4 border-green-900 rounded-full" />
                </div>
              ) : (
                <div
                  className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                  style={{
                    left:
                      password.length > 0 && showPassword
                        ? `${10}px`
                        : `${40 + (yellowPos.faceX || 0)}px`,
                    top:
                      password.length > 0 && showPassword
                        ? `${88}px`
                        : `${88 + (yellowPos.faceY || 0)}px`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary-foreground transition-colors">
            Contact
          </a>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Right Login Section */}
      <div className="flex items-center justify-center p-8 bg-background">
        <LoginForm
          onTypingChange={setIsTyping}
          onPasswordChange={setPassword}
          onShowPasswordChange={setShowPassword}
          onErrorsChange={setFormErrors}
          onSubmitErrorChange={setSubmitError}
          onSuccessChange={setIsSuccess}
        />
      </div>
    </div>
  )
}
