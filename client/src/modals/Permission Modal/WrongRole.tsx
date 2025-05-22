import React from 'react'
import IconError from '../../assets/img/Icon-Error.svg?react'
const WrongRole = () => {
  return (
    <div className="d-flex j-c-center a-i-center text-center gap-12x mb-20x" style={{ flexDirection: 'column' }}>
      <IconError />
      <h6 className="h6 fw-bold">Ne pare rau nu aveti permisiuni</h6>
      <p className="paragraph-smalls">Incercati sa va autentificati.</p>
    </div>
  )
}

export default WrongRole
