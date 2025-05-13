import IconWarning from '../../assets/img/Icon-Warning.svg?react'
const SignOut = () => {
  return (
    <div className="d-flex j-c-center a-i-center text-center gap-12x mb-20x" style={{ flexDirection: 'column' }}>
      <IconWarning />
      <h6 className="h6 fw-bold">Ești sigur că vrei să te deconectezi?</h6>
      <p className="paragraph-smalls">Dacă ai terminat, te poți deconecta pentru siguranța contului tău.</p>
    </div>
  )
}

export default SignOut
