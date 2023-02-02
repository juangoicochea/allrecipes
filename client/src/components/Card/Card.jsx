import { Link } from 'react-router-dom';
//pendiente la dieta
export const Card = ( { id, title, image, dishTypes, healthScore } ) => {
  return (
    <div id='card'>
        <div>
            <Link to={ `/recipe/${ id }` }>
              <img src={ image } alt={ title } />
            </Link>
        </div>
        <div>
            <span className='dishTypes'>{ dishTypes }</span>
            <Link to={ `/recipe/${ id }` }>
              <h3>{ title }</h3>
            </Link>
            <span className='healthScore'>Health Score: { healthScore }</span>
        </div>
    </div>
  );
}
