import classNames from 'classnames'
import Promotion from '../Promotion/Promotion'
import Nav from '../Nav/Nav'
import style from './up-header.module.scss'
const Upheader = () => {
  return (
    <header className={classNames(style.container)}>
      <div className="container d-flex j-c-between  paragraph-small p-20x-0x ">
        <div className=" d-lg-block d-none w-lg-50">
          <Nav />
        </div>

        <div className="d-flex a-i-center j-c-lg-end j-c-between gap-30x  w-lg-50 w-100">
          <div className="d-lg-flex d-none">
            {' '}
            <Promotion />{' '}
          </div>
          <div className="d-flex a-i-center gap-10x">
            <div className={classNames(style.firstCircle, 'bg-green-light-active')}>
              <div className={classNames(style.secondCircle, 'bg-green-normal')}></div>
            </div>

            <p className="fw-bold">+(373) 76-706-706 </p>
          </div>
          <div>
            <p className="fw-medium">Ru</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Upheader
