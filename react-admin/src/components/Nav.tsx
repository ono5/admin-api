// src/components/Nav.tsx
import { Link } from 'react-router-dom'
import { UserProps } from '../models/user'
import axios from 'axios'

// propsを追加
const Nav = (props: { user: UserProps | null }) => {
  const logout = async () => { await axios.post('logout') }

	return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link
            to={'/profile'}
            className="nav-link px-3"
          >
            {props.user?.first_name} {props.user?.last_name}
          </Link>
          <Link
            to={'/login'}
            className="nav-link px-3"
            onClick={logout}
          >
            Sign out
          </Link>
        </div>
      </div>
    </header>
	)
}

export default Nav
