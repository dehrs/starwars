import './styles.scss';
export const Caracteristics = ({ label, description, right }) => {
  return (
    <>
      <div className="details" style={{ textAlign: right ? 'right' : 'inherit' }}>
        <strong >{label}</strong>
        <p >{description}</p>
      </div>
    </>
  )
}
