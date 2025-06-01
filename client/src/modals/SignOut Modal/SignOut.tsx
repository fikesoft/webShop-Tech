import IconWarning from '../../assets/img/Icon-Warning.svg?react'

interface SignOutI {
  erorMessage: string
}
const SignOut: React.FC<SignOutI> = ({ erorMessage }) => {
  return (
    <div className="d-flex j-c-center a-i-center text-center gap-12x mb-20x" style={{ flexDirection: 'column' }}>
      <IconWarning />
      <h6 className="h6 fw-bold">Ești sigur că vrei să te deconectezi?</h6>
      <p className="paragraph-smalls">
        {erorMessage
          ? 'Mai incearca inca odata '
          : 'Dacă ai terminat, te poți deconecta pentru siguranța contului tău.'}
      </p>
      {erorMessage && <p className="text-red-normal">{erorMessage}</p>}
    </div>
  )
}

export default SignOut
