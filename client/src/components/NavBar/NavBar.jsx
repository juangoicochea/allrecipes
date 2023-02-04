import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/allrecipes-logo.svg';

export const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickReturn = () => {
        navigate( '/home' );
    }

    const handleClickReload = () => {
        dispatch( getRecipes() );
    }

    const buttonMenu = () => {
        const getURL = document.URL;
        if( getURL.search( '/home' ) === -1 ) {
            return (
                <a onClick={ e => handleClickReturn() }>Return Home</a>
            );
        } else {
            return (
                <a onClick={ e => handleClickReload() }>Reload Recipes</a>
            );
        }
    }

  return (
    <div className='navBarComponent'>
        <Link to='/'><img className='navBarComponent__logo' src={ logo } alt='AllRecipes' /></Link>
        <div>
        { buttonMenu() }
        <Link to='/create'>Add Recipe</Link>
        </div>
    </div>
  );
}