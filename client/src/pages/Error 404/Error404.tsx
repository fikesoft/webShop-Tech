import classNames from 'classnames'
import ErrorPhoto from '../../assets/img/404.svg?react'
import style from './error404.module.scss'
const Error404 = () => {
  return (
    <section>
      <div className="container">
        <div className="d-flex a-i-center text-center" style={{ flexDirection: 'column' }}>
          <ErrorPhoto className={style.img} />
          <div className="d-flex a-i-center gap-24x" style={{ flexDirection: 'column' }}>
            <h1 className="h1 fw-medium">Oops! Pagina nu a fost găsită</h1>
            <h5 className="h5 fw-regular">
              Se pare că ai ajuns pe un drum închis. Verifică adresa sau întoarce-te la pagina principală.
            </h5>
            <div className="d-flex gap-16x paragraph-small">
              <button className={classNames(style.button, style.buttonContinue)}>Continuați cumpărăturile</button>
              <button className={style.button}>Vezi promoțiile noastre</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Error404
