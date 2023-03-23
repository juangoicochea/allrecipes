import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

export const Error404 = () => {
  return (
    <div>
        <NavBar />
        <div>
            <h1>Whoops! Error 404</h1>
            <p>The info you're looking for can't be found!</p>
            <p>You might want to try searching again or go back home.</p>
            <div><Link to='/home'><button>Home</button></Link></div>  
        </div>
    </div>
  );
}