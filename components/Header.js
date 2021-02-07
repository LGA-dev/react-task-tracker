import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  // const logMessage = () => {
  //   console.log('click');
  // }
  const location = useLocation()
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Check if the location(Example: localhost:3000/about) is equal to "/" then show the button */}
      {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//   color: 'cyan', backgroundColor: 'gray'
// }

export default Header
