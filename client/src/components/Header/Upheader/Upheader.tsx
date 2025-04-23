import classNames from 'classnames'
import Promotion from '../Promotion/Promotion'
import Nav from '../Nav/Nav'
import style from './up-header.module.scss'
const Upheader = () => {
  return (
    <header className={classNames(style.containerUpheader)}>
      <div className="container d-flex j-c-between p-20x-0x paragraph-small">
        <Nav />
        <div className="d-flex gap-30x a-i-center j-c-lg-end j-c-between w-lg-50 w-100">
          <div className="d-lg-flex d-none">
            {' '}
            <Promotion />{' '}
          </div>
          <div className="d-flex gap-10x a-i-center">
            <div className={classNames(style.firstCircle, 'bg-green-light-active w-20x h-20x b-r-50')}>
              <div className={classNames(style.secondCircle, 'bg-green-normal w-10x h-10x b-r-50')}></div>
            </div>

            <p className=" fw-bold">+(373) 76-706-706 </p>
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
