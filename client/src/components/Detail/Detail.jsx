import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions';

export const Detail = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector( ( state ) => state.recipes );
    const [ detail, setDetail ] = useState('');
    

    useEffect(() => {
      dispatch( getRecipes() );
    }, [dispatch]);
    

  return (
    <div>Detail</div>
  );
}
