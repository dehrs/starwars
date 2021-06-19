import './styles.scss';
export const Caracteristics = ({ label, description }) => {
  return (
    <>
      <div className="details">
        <strong >{label}</strong>
        <p >{description}</p>
      </div>
    </>
  )
}
