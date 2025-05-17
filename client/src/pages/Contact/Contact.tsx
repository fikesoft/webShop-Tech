import classNames from 'classnames'
import style from './aboutUs.module.scss'
import Map from '../../assets/img/map.png'

const Contact = () => {
  return (
    <section>
      <div className="container">
        <h1 className="h1 fw-medium mb-50x">Contacte</h1>
        <div className="row" style={{ flexDirection: 'column', gap: '24px' }}>
          <div className={classNames(style.contactInfoContainer, 'col-12')}>
            <div className={classNames(style.contactInfo, style.user)}>
              <h4 className="fw-medium">Call Center</h4>
              <div className={style.contactContent}>
                <p className="paragraph fw-medium">Program de lucru:</p>
                <div>
                  <p>Ln - Vin: 9:00 - 19:00</p>
                  <p>Sb: 9:00 - 15:00</p>
                  <p>Dum: închis</p>
                </div>
                <div>
                  <p className="paragraph fw-medium">Telefon:</p>
                  <div>
                    <p>+(373) 76-706-706</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(style.contactInfo, style.details)}>
              <h4 className="fw-medium">Rechizite</h4>
              <div>
                <p>Denumirea completă: VOLOVEI INVEST SR</p>
                <p>Adresa juridică: mun. Chişinău, Stăuceni, str. Alecsandri Vasile, 34A </p>
                <p>Cod fiscal: XXXXXXXXXXXX</p>
                <p>Cod TVA: XXXXXXXXXXXX</p>
              </div>
            </div>
          </div>
          <div className={classNames(style.mapContainer, 'col-12')}>
            <img src={Map} alt="map" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
