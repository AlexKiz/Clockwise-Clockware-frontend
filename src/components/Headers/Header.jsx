import {Link} from 'react-router-dom'

const Header = () => {

    return (
        <div>
            <header>
                <div>
                    <div>
                        <Link to='/order-form'><a>Logo</a></Link>
                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li><Link to='/order-form'>Make order</Link></li>
                                <li>Admin
                                    <ul>
                                        <li><Link to='/admin/users-list'>User Controller</Link></li>
                                        <li><Link to='/admin/cities-list'>City Controller</Link></li>
                                        <li><Link to='/admin/masters-list'>Master Controller</Link></li>
                                        <li><Link to='/admin/orders-list'>Order Controller</Link></li>
                                    </ul>
                                </li>
                                <li><Link to='/login'>Login</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header