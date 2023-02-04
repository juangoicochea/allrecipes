import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState( '' );

    const handleInputChange = ( e ) => {
        e.preventDefault();
        setName( e.target.value );
    }
    const handleSubmit = ( e ) => {
        e.preventDefault();
        dispatch( searchByName( name ) );
    }

  return (
    <form>
        <input type='text' placeholder='Search Recipe' onChange={ e => handleInputChange( e ) } />
        <button className='search' type='submit' onClick={ e => handleSubmit( e ) }>
          <FontAwesomeIcon icon={solid( 'magnifying-glass' )} />
        </button>
    </form>
  );
}
