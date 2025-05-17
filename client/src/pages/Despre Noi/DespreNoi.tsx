import React from 'react'
import style from './despreNoi.module.scss'
import classNames from 'classnames'
import DesprePhoto from '../../assets/img/DespreNoi.png'
import InstagramIcon from '../../assets/img/Instagram-Icon.svg?react'
import FacebookIcon from '../../assets/img/Facebook-Icon.svg?react'
import YoutubeIcon from '../../assets/img/Youtube-Icon.svg?react'
import TiktokIcon from '../../assets/img/Tiktok-Icon.svg?react'
const DespreNoi = () => {
  return (
    <section>
      <div className="container">
        <div className="d-flex" style={{ flexDirection: 'column' }}>
          <h2 className="h2 fw-medium mb-50x">Despre Noi</h2>
          <div className={classNames(style.despreContainer, 'row paragraph')}>
            <div className="d-flex col-lg-8 col-12 gap-16x " style={{ flexDirection: 'column' }}>
              <p className="fw-medium">Despre IVISHOP - Magazinul Tău de Încredere</p>
              <p>
                İvishop este magazinul online administrat de VOLOVEI INVEST SRL, unde găseşti o gamă variată de produse,
                de la tehnică şi electrocasnice, până la articole pentru casă şi lifestyle. Ne dedicăm oferirii unor
                produse de calitate, la prețuri accesibile, asfel încât să ai mereu la îndemână cele mai bune soluţii
                pentru nevoile tale.
              </p>
              <p>
                Prin utilizarea platformei ivishop, ești de acord cu Termenii și Condițiile noastre, care reglementează
                toate aceste servicii și produsele oferite. Te invităm să consulți și Politica de Confidențialitate,
                precum și alte documente legale disponibile pe site-ul nostru.
              </p>
              <p>
                VOLOVEI INVEST SRL își rezervă dreptul de a modifica aceste condiții fără notificare prealabilă.
                Continuând să folosești ivishop, accepți versiunea actualizată a termenilor. Dacă nu ești de acord, poți
                oricând renunța la utilizarea serviciilor noastre.
              </p>
              <p>
                Pentru mai multe detalii despre companie și produsele noastre, explorează sit-ul ivishop și bucură-te de
                cumpărături sigure și rapide!
              </p>
            </div>
            <div className="col-lg-4 col-12">
              <img src={DesprePhoto} alt="despre-photo" />
            </div>
          </div>
          <div className={classNames(style.despreCompanieContainer, 'row gapv-16x')}>
            {/* Title */}
            <div className="col-12">
              <h4 className="h4 fw-medium">Date despre companie :</h4>
            </div>

            {/* Left column: company identifiers */}
            <div className="col-12">
              <p>Denumirea completă: VOLOVEI INVEST SRL</p>
              <p>Adresa juridică: mun. Chișinău, Stăuceni, str. Alecsandri Vasile, 34A</p>
              <p>Cod fiscal: XXXXXXXXXXXX</p>
              <p>Cod TVA: XXXXXXXXXXXX</p>
            </div>

            {/* Right column: contact & program */}
            <div className="col-12">
              <p>
                Operator livrare:
                <a href="tel:+37376706706" className="fw-medium">
                  +(373)76-706-706
                </a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:info@norisushi.md" className="fw-medium">
                  info@norisushi.md
                </a>
              </p>
            </div>

            <div className="col-12">
              <p>
                Luni-Vineri:9:00-19:00
                <br />
                Sâmbătă:9:00-15:00
                <br />
                Duminică:închis
              </p>
            </div>

            {/* Social icons row */}
            <div className={classNames('col-12', style.socialRow)}>
              <a href="https://instagram.com/…">
                <InstagramIcon className={style.socialIcon} />
              </a>
              <a href="https://facebook.com/…">
                <FacebookIcon className={style.socialIcon} />
              </a>
              <a href="https://youtube.com/…">
                <YoutubeIcon className={style.socialIcon} />
              </a>
              <a href="https://tiktok.com/…">
                <TiktokIcon className={style.socialIcon} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DespreNoi
