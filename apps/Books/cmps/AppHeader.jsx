const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {

    return <header className="header">
        {/* <h1 className="logo">BOOK STORE</h1> */}
        <img className="logo" src="../assets/img/logo.jpg" />
        <nav>
            <ul>
                <li><NavLink exact to="/" >Home</NavLink></li>
                <li><NavLink to="/book" >Books</NavLink></li>
                <li><NavLink to="/about" >About</NavLink></li>
            </ul>
        </nav>
    </header>

}

export const AppHeader = withRouter(_AppHeader);