import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import classNames from 'classnames'
import style from './date.module.scss'
import useAppSelector from '../../../store/hooks/useSelector'
import { useSaveUser } from '../../../lib/hooks/useSaveUser'

// 1) Schema keys must match your register() calls
const schema = z.object({
  nume: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  telefon: z.string().regex(/^\+?\d{6,}$/, 'Telefon invalid (minim 6 cifre)'),
  email: z.string().email('Email invalid'),
  birthDate: z.string().regex(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Formatul datei: ZZ/LL/AAAA'),
})
type FormI = z.infer<typeof schema>

export default function DatePersonale() {
  const { userName, userPhone, userEmail, userBirthDate } = useAppSelector((s) => s.user)
  // switch to the async API so we can await in onSubmit
  const { saveUserAsync, isLoading, isSuccess, error } = useSaveUser()

  // 2) hook up RHF + Zod, seed with Redux values
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormI>({
    resolver: zodResolver(schema),
    defaultValues: {
      nume: userName ?? '',
      telefon: userPhone ?? '',
      email: userEmail ?? '',
      birthDate: userBirthDate ?? '',
    },
    mode: 'onBlur',
  })

  // 3) reset any time Redux user changes
  useEffect(() => {
    reset({
      nume: userName ?? '',
      telefon: userPhone ?? '',
      email: userEmail ?? '',
      birthDate: userBirthDate ?? '',
    })
  }, [userName, userPhone, userEmail, userBirthDate, reset])

  // 4) linear async submit with error handling
  const onSubmit = async (data: FormI) => {
    try {
      await saveUserAsync({
        userName: data.nume,
        userPhone: data.telefon,
        userEmail: data.email,
        userBirthDate: data.birthDate,
      })
    } catch {
      // server error ends up in `error`
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-24x p-20x" style={{ flexDirection: 'column' }}>
      <h4 className="h4 col-12 fw-medium">Date personale</h4>
      <div className="d-flex col-5 gap-16x" style={{ flexDirection: 'column' }}>
        {/* Nume */}
        <div className={style.authInput}>
          <label htmlFor="nume">Nume</label>
          <input id="nume" {...register('nume')} placeholder="Introduceti numele dvs" />
          {errors.nume && <p className="text-red-normal">{errors.nume.message}</p>}
        </div>

        {/* Telefon */}
        <div className={style.authInput}>
          <label htmlFor="telefon">Telefon</label>
          <input id="telefon" {...register('telefon')} placeholder="Introduceti telefonul dvs" />
          {errors.telefon && <p className="text-red-normal">{errors.telefon.message}</p>}
        </div>

        {/* Email */}
        <div className={style.authInput}>
          <label htmlFor="email">
            Email<span className="text-red-normal">*</span>
          </label>
          <input id="email" {...register('email')} placeholder="Introduceti emailul dvs" />
          {errors.email && <p className="text-red-normal">{errors.email.message}</p>}
        </div>

        {/* Data nașterii */}
        <div className={style.authInput}>
          <label htmlFor="birthDate">Data de naștere</label>
          <input id="birthDate" {...register('birthDate')} placeholder="Introdu data nașterii (ZZ/LL/AAAA)" />
          {errors.birthDate && <p className="text-red-normal">{errors.birthDate.message}</p>}
        </div>
      </div>

      <button type="submit" className={classNames(style.saveButton, 'col-3')} disabled={isLoading}>
        {isLoading ? 'Se salvează...' : 'Salvează modificările'}
      </button>

      {isSuccess && <p className="text-green-normal">Datele au fost salvate cu succes!</p>}
      {error && <p className="text-red-normal">{error.message}</p>}
    </form>
  )
}
