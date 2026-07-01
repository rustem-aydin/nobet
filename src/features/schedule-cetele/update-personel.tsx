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
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DutyType, Personnel } from '@/payload-types'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Edit } from 'lucide-react'
import { updatePersonnelSchema, UpdatePersonnelFormValues } from 'types/schemas'
import { updatePersonnel } from '@/collections/Personnel/actions/updatePersonnel'
import ConfirmDialog from '@/components/confirm-dialog'
import { deletePersonnel } from '@/collections/Personnel/actions/deletePersonnel'
import { checkEmailUnique } from '@/collections/Personnel/actions/checkEmailUnique'

export function UpdatePersonel({
  dutyTypes,
  personnel,
}: {
  dutyTypes: DutyType[]
  personnel: Personnel
}) {
  const [isOpen, setIsOpen] = useState(false)
  const schema = useMemo(
    () => updatePersonnelSchema(String(personnel.id), checkEmailUnique),
    [personnel.id],
  )
  const form = useForm<UpdatePersonnelFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  })
  const handleDelete = async () => {
    toast.promise(deletePersonnel(personnel.id), {
      loading: 'Personel siliniyor...',
      success: 'Personel başarıyla silindi',
      dismissible: true,
      error: (err) => String(err),
    })
    setIsOpen(false)
  }
  const onSubmit = async (values: UpdatePersonnelFormValues) => {
    try {
      const payload = { ...values }
      if (!payload.password) {
        delete payload.password
        delete payload.confirmPassword
      }

      toast.promise(updatePersonnel(payload, personnel.id), {
        loading: 'Personel güncelleniyor...',
        success: 'Personel başarıyla güncellendi',
        dismissible: true,
        error: (err) => String(err),
      })
      setIsOpen(false)
    } catch (error) {
      toast.error(String(error))
    }
  }

  useEffect(() => {
    form.reset({
      email: personnel.email || '',
      fullName: personnel.fullName || '',
      password: '',
      confirmPassword: '',
    })
  }, [personnel, form])

  // Tip hatasını önlemek için any kullanımı (Payload tipi yetersiz olduğu için)
  const getCountForDutyType = (dutyTypeId: number): number => {
    const docs = (personnel.counts?.docs as any[]) ?? []
    const found = docs.find((item: any) => item.dutyType?.id === dutyTypeId)
    return found?.count ?? 0
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon-xs">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-3xl max-w-lg">
        <DialogHeader>
          <DialogTitle>Personel Güncelle</DialogTitle>
          <DialogDescription>Personel bilgilerini güncelleyin.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="update-personnel-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
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
                  <FormLabel>Şifre (değiştirmek isterseniz)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Yeni şifre girin (boş bırakırsanız değişmez)"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Şifre Onay</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Şifreyi tekrar girin"
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border rounded-lg p-3 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Nöbet Tipi Sıralamaları (Görüntüleme)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {dutyTypes.map((dt) => (
                  <div key={dt.id} className="space-y-1">
                    <FormLabel className="text-xs">{dt.name}</FormLabel>
                    <Input
                      disabled
                      value={getCountForDutyType(dt.id)}
                      readOnly
                      className="bg-muted/50 cursor-default"
                    />
                  </div>
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
          <Button form="update-personnel-form" type="submit">
            Değişiklikleri Kaydet
          </Button>
          <ConfirmDialog
            title="Personeli sil"
            description="Bu personel kalıcı olarak silinecek. Personele ait nöbet çizelgesi sıfırlanacaktır. Emin misiniz?"
            confirmText="Evet, sil"
            onConfirm={handleDelete}
          >
            <Button variant={'destructive'}>Personeli Sil</Button>
          </ConfirmDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
