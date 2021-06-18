import './styles.scss';
export const Caracteristics = ({ label, description, right }) => {
  return (
    <>
      <div className="details">
        <div>
          <strong>{label}</strong>
          <p style={{ textAlign: right ? 'right' : 'inherit' }}>{description}</p>
        </div>
      </div>
    </>
  )
}
