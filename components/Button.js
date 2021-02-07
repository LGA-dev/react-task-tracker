import PropTypes from 'prop-types' // Search this later

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{backgroundColor: color}}  // Why double curly braces on style?
      className="btn"
    >
    { text }
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue'
}


// Why propTypes and not PropTypes?
// What do propTypes really do? Just enforce a type?
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button