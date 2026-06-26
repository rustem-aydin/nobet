'use client'

import { motion } from 'framer-motion'
import { Calendar, CheckCheck, Trash2Icon, FileText, User, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { slideFromLeft, slideFromRight, transition } from '@/features/calendar/animations'
import { useSchedule } from '../contexts/schedule-context'
import { ScheduleDateNavigator } from './schedule-date-navigator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScheduleTodayButton } from './ScheduleTodayButton'
import ConfirmDialog from '@/components/confirm-dialog'
import { InteractiveLogsTable } from '@/components/interactiveLogsTable'
import { getPersonnelIcon } from './personnel-lists'

export function ScheduleHeader() {
  const {
    selectedDutyType,
    selectedPersonnel,
    setSelectedPersonnel,
    handleGenerate,
    logs,
    setSelectedDutyType,
    duty_types,
    auth,
    personnels,
    schedules,
    handleApproved,
    generating,
    handleDelete,
    year,
    month,
  } = useSchedule()

  const isChief = auth?.role === 'admin' || auth?.role === 'chief'

  const schedulesInMonth = schedules.filter((s) => {
    const scheduleDate = new Date(s.dutyDate)
    return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month
  })

  const hasDraftInMonth = schedulesInMonth.some((s) => s.status === 'draft')
  const hasCompletedInMonth = schedulesInMonth.some((s) => s.status === 'completed')

  const selectDutyValue = selectedDutyType ? String(selectedDutyType.id) : 'all'
  const selectPersonValue = selectedPersonnel ? String(selectedPersonnel.id) : 'all'

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        className="flex items-center gap-3"
        variants={slideFromLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <ScheduleTodayButton />
        <ScheduleDateNavigator view={'month'} />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3"
        variants={slideFromRight}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        {/* Duty Type Filter */}
        <Select
          value={selectDutyValue}
          onValueChange={(val) => {
            if (val === 'all') {
              setSelectedDutyType(null)
            } else {
              const dt = duty_types.find((d) => String(d.id) === val)
              if (dt) setSelectedDutyType(dt)
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tüm Nöbetler" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-gray-400" />
                Tüm Nöbetler
              </div>
            </SelectItem>
            {duty_types.map((dt) => (
              <SelectItem key={dt.id} value={String(dt.id)}>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: dt.color || '#888' }}
                  />
                  {dt.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Personnel Filter (yeni) */}
        <Select
          value={selectPersonValue}
          onValueChange={(val) => {
            if (val === 'all') {
              setSelectedPersonnel(null)
            } else {
              const person = personnels.find((p) => String(p.id) === val)
              if (person) setSelectedPersonnel(person)
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tüm Personel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-gray-400" />
                Tüm Personel
              </div>
            </SelectItem>
            {personnels.map((p) => {
              // Whitelist/blacklist durumuna göre ikon belirle
              const Icon = getPersonnelIcon(p.fullName) || User // varsayılan User ikonu
              return (
                <SelectItem key={p.id} value={String(p.id)}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-3 w-3 text-gray-500" />
                    {p.fullName}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        {isChief && (
          <>
            {schedulesInMonth.length === 0 ? (
              <Button variant="outline" onClick={handleGenerate} disabled={generating}>
                <Calendar className="mr-2 h-4 w-4" />
                Çizelge Oluştur
              </Button>
            ) : hasDraftInMonth ? (
              <ConfirmDialog
                title="Tümünü Onayla"
                description="Bu çizelge kalıcı olarak onaylanacaktır. Emin misiniz?"
                confirmText="Evet, Onayla"
                onConfirm={handleApproved}
              >
                <Button
                  variant="secondary"
                  className="bg-green-500/30 text-green-500 hover:bg-green-500/50"
                  disabled={generating}
                >
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Çizelgeyi Onayla
                </Button>
              </ConfirmDialog>
            ) : null}
          </>
        )}

        {isChief && !hasCompletedInMonth && (
          <ConfirmDialog
            title="Çizelgeyi Sil"
            description="Bu çizelge kalıcı olarak silinecek. Emin misiniz?"
            confirmText="Evet, sil"
            onConfirm={handleDelete}
          >
            <Button variant="destructive" disabled={generating || schedulesInMonth.length === 0}>
              <Trash2Icon className="mr-2 h-4 w-4" />
              Çizelge Sil
            </Button>
          </ConfirmDialog>
        )}

        {logs && logs.length > 0 && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <FileText className="mr-2 h-4 w-4" />
                Loglar
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {logs.length}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="min-w-4xl w-full p-0">
              <div className="h-[calc(100vh-80px)]">
                <InteractiveLogsTable logs={logs} />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </motion.div>
    </div>
  )
}
