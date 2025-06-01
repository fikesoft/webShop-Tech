import style from './securtiate.module.scss'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useChangeUserPassword } from '../../../lib/hooks/useChangeUserPassword'
const changePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: z.string().min(6, 'Parola nouă trebuie să aibă cel puțin 6 caractere'),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'Parolele noi trebuie să coincidă',
    path: ['repeatNewPassword'], // mark the error on this field
  })

type FormI = z.infer<typeof changePasswordSchema>
const Securitate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormI>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: '', newPassword: '', repeatNewPassword: '' },
    mode: 'onBlur',
  })

  const { changePassword, isSuccess, isLoading, error } = useChangeUserPassword()

  const onSubmit = async (data: FormI) => {
    try {
      await changePassword(data) // now really waits for the request
      reset() // only clear on success
    } catch {
      // form stays intact so user can correct
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-24x p-20x" style={{ flexDirection: 'column' }}>
      <h4 className="h4 col-12 fw-medium">Securitate</h4>
      <div className="d-flex col-5 gap-16x" style={{ flexDirection: 'column' }}>
        {/* Nume */}
        <div className={style.authInput}>
          <label htmlFor="password">
            Parola veche<span className="text-red-normal">*</span>
          </label>
          <input id="password" {...register('password')} placeholder="Introduceti parola veche" type="password" />
          {errors.password && <p className="text-red-normal">{errors.password.message}</p>}
        </div>

        {/* Telefon */}
        <div className={style.authInput}>
          <label htmlFor="newPassword">
            Parola nouă<span className="text-red-normal">*</span>
          </label>
          <input id="newPassword" {...register('newPassword')} placeholder="Introduceti parola noua" type="password" />
          {errors.newPassword && <p className="text-red-normal">{errors.newPassword.message}</p>}
        </div>

        {/* Email */}
        <div className={style.authInput}>
          <label htmlFor="email">
            Repetă parola nouă<span className="text-red-normal">*</span>
          </label>
          <input id="email" {...register('repeatNewPassword')} placeholder="Repeta parola noua" type="password" />
          {errors.repeatNewPassword && <p className="text-red-normal">{errors.repeatNewPassword.message}</p>}
        </div>
      </div>

      <button type="submit" className={classNames(style.saveButton, 'col-3')}>
        {isLoading ? 'Se salvează...' : 'Salvează modificările'}
      </button>

      {isSuccess && <p className="text-green-normal">Parola a fost salvata cu succes!</p>}
      {error && <p className="text-red-normal">{error.message}</p>}
    </form>
  )
}

export default Securitate
