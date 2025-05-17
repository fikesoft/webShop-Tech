import React from 'react'
import LivrarePhoto from '../../assets/img/Livrare.png'
import style from './livrare.module.scss'
import classNames from 'classnames'
const Livrare = () => {
  return (
    <section>
      <div className="container">
        <h2 className="h2 fw-medium  mb-50x">Livrare</h2>

        <div className="row j-c-center a-i-center ">
          <div className="d-flex gap-16x col-8 paragraph" style={{ flexDirection: 'column' }}>
            <div className="d-flex gap-16x" style={{ flexDirection: 'column' }}>
              <p className="fw-medium">Condițiile de livrare în Chișinău:</p>
              <ul className={classNames(style.bulletUl)}>
                <li>Livrarea comenzilor în suma de peste 500 lei în raza Chișinăului este gratuită.</li>
                <li>Pentru comenzi până la suma de 500 lei, livrarea este contra cost - 50 lei.</li>
                <li>Livrarea în suburbii constituie 100 lei.</li>
                <li>
                  Livrarea de luni până vineri se efectuează de la 10:00 la 22:00 în 3 intervale de timp (10:00 - 14:00,
                  14:00 - 18:00, 18:00 - 22:00).
                </li>
                <li>Sâmbăta, livrarea se efectuează între orele 10:00 și 18:00, fără intervale de timp fixe.</li>
                <li>Livrarea se efectuează exclusiv pentru produsele incluse în comandă.</li>
                <li>Transportul a mai multor produse pentru alegere la fața locului nu este disponibil.</li>
                <li>Curierul vă va contacta cu 30 de minute înainte de livrarea produsului.</li>
                <li>
                  Serviciul de curierat nu include montarea, instalarea sau conectarea tehnicii, demonstarea
                  caracteristicilor produsului sau explicarea metodelor de exploatare.
                </li>
              </ul>
            </div>
            <div className="d-flex gap-16x" style={{ flexDirection: 'column' }}>
              <p className="fw-medium">Condițiile de livrare în Chișinău:</p>
              <ul className={classNames(style.bulletUl)}>
                <li>Livrarea produselor de dimensiuni mari se efectuiază până la scară sau porțile casei.</li>
                <li>
                  Ridicarea produselor de dimensiuni mari la etaj sau livrarea directă la domiciliu poate fi realizată
                  la dorința clientului contra plată.
                </li>
                <li>
                  Prețul pentru ridicarea produselor de dimensiuni mari:
                  <ul className="overflow-hidden">
                    <li>Minim 100 lei pentru ridicare până la etajul 3 (inclusiv).</li>
                    <li>
                      Dacă nu există ascensor sau este nefuncțional:
                      <ul className="overflow-hidden">
                        <li>100 lei + 20 lei pentru fiecare etaj, începând cu etajul 4.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Ajutarea curierului de către client la ridicare reduce prețul de două ori.</li>
              </ul>
            </div>
          </div>
          <div className="4">
            <img src={LivrarePhoto} alt="Poza" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Livrare
