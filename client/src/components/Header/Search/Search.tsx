import classNames from 'classnames'
import IconSearch from '../../../assets/img/Icon-Search.svg?react'
import style from './search.module.scss'
const Search = () => {
  return (
    <div
      className={classNames(
        style.wrapperInput,
        'd-flex a-i-center j-c-between b-1x-solid-primary b-r-lg-30x b-r-0x h-50x p-10x bg-grey-second'
      )}
    >
      <input
        type="text"
        placeholder="Caută produse"
        className="
              flex-grow-1
              bg-transparent
              b-none
              o-none
              fs-14
            "
      />
      <IconSearch className="d-lg-block d-none" />
    </div>
  )
}

export default Search
