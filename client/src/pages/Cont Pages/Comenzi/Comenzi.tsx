import React from 'react'
import EmptyPage from '../../Empty/EmptyPage'

const Comenzi = () => {
  const obj = []
  return (
    <>
      {obj.length === 0 ? (
        <EmptyPage
          title="Nu ai încă nicio comandă"
          paragraph="Cumpără produsele preferate și urmărește aici statusul comenzilor tale"
        />
      ) : null}
    </>
  )
}

export default Comenzi
