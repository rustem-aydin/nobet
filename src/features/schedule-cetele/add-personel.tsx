'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDisclosure } from '@/features/calendar/hooks'
import { Dialog } from '@/components/ui/dialog'
import { createPersonnelSchema, PersonnelFormValues } from 'types/schemas'
import { Input } from '@/components/ui/input'
import { DutyType } from '@/payload-types'
import { useEffect } from 'react'
import { addPersonnel } from '@/collections/Personnel/actions/addPersonnel'
import { toast } from 'sonner'

export function AddPersonel({ dutyTypes }: { dutyTypes: DutyType[] }) {
  const { isOpen, onToggle } = useDisclosure()

  // Şemayı dutyTypes'a göre oluştur
  const personnelSchema = createPersonnelSchema(dutyTypes)

  const form = useForm<PersonnelFormValues>({
    resolver: zodResolver(personnelSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      // Dinamik alanlar için varsayılan değerler
      ...dutyTypes.reduce(
        (acc, dt) => {
          acc[`dutyType_${dt.id}`] = 0
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  })
  const onSubmit = async (values: PersonnelFormValues) => {
    try {
      toast.promise(async () => await addPersonnel(values), {
        loading: 'Personel Ekleniyor',
        success: 'Personel Eklendi',
        error: (err) => String(err),
      })

      onToggle()
    } catch (error) {
      toast.error(String(error))
    }
  }
  // dutyTypes değişirse form'u resetle ve şemayı güncelle
  useEffect(() => {
    const defaults = {
      email: '',
      fullName: '',
      password: '',
      ...dutyTypes.reduce(
        (acc, dt) => {
          acc[`dutyType_${dt.id}`] = 0
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    form.reset(defaults as any) // <-- sadece 'as any' ekle
  }, [dutyTypes, form])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onToggle()
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="cursor-pointer" size={'sm'}>
          Personel Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-3xl max-w-lg">
        <DialogHeader>
          <DialogTitle>{'Personel Ekle'}</DialogTitle>
          <DialogDescription>{'Nöbet grubunuza personel ekleyin.'}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Tam İsim</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ad Soyad girin"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Eposta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="E-posta adresi girin"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="required">Şifre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Şifre girin"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dinamik DutyType Input'ları */}
            <div className="border rounded-lg p-3 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Nöbet Tipi Sıralamaları</h4>
              <div className="grid grid-cols-2 gap-3">
                {dutyTypes.map((dt) => (
                  <FormField
                    key={dt.id}
                    control={form.control}
                    name={`dutyType_${dt.id}` as const}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-xs">{dt.name}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            max={100}
                            placeholder="0"
                            className={fieldState.invalid ? 'border-red-500' : ''}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter className="flex justify-end bg-card gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              İptal
            </Button>
          </DialogClose>
          <Button form="event-form" type="submit">
            {'Değişiklikleri Kaydet'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
