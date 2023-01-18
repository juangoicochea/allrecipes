import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../actions';

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
        <button type='submit' onClick={ e => handleSubmit( e ) }>Search</button>
    </form>
  );
}
