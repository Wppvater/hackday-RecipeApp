import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
       <Link to="/">
         <h3>Hem</h3>
       </Link>
       <Link to="/recipes">
        <h3>Recept</h3>
       </Link>
       <Link to="/groceries">
        <h3>Inköp</h3>
       </Link>
    </nav>
  )
}

export default Navbar;