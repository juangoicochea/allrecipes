import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions';
import { Link, useNavigate } from 'react-router-dom';

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
                <button onClick={ e => handleClickReturn() }>Return Home</button>
            );
        } else {
            return (
                <button onClick={ e => handleClickReload() }>Reload Recipes</button>
            );
        }
    }

  return (
    <div>
        AllRecipes 
        { buttonMenu() }
        <Link to='/create'>Add Recipe</Link>
    </div>
  );
}