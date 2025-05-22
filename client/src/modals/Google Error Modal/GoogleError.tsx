import IconError from '../../assets/img/Icon-Error.svg?react'

interface ErrorModalProps {
  errorMessage: string
}
const GoogleError: React.FC<ErrorModalProps> = ({ errorMessage }) => {
  return (
    <div className="d-flex j-c-center a-i-center text-center gap-12x mb-20x" style={{ flexDirection: 'column' }}>
      <IconError />
      <h6 className="h6 fw-bold">A aparut o erroare:</h6>
      <p className="paragraph-smalls">{errorMessage}</p>
    </div>
  )
}

export default GoogleError
