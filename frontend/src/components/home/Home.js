import PropTypes from 'prop-types'


const Header = ({ title, body }) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <p>{body}</p>
            
        </header>
    )
}

Header.defaultProps = {
    title: 'Welcome to the Stock Bot Home Page',
    body: 'Stockbots is your personal, automated trading platform. It requires zero effort from you and will help you beat inflation and the market in general. \n StockBots mission is to be the beset trading platform in the world and help you achieve financial freedom.',  
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}



export default Header
