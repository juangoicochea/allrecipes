import { Link } from 'react-router-dom';
//pendiente la dieta
export const Card = ( { id, title, image, dishTypes, healthScore } ) => {
  return (
    <div className='cardComponent'>
        <div>
            <Link to={ `/recipe/${ id }` }>
              <img src={ image } alt={ title } />
            </Link>
        </div>
        <div className='cardComponent__info'>
            <span className='cardComponent__dishTypes'>{ dishTypes }</span>
            <Link to={ `/recipe/${ id }` }>
              <h3>{ title }</h3>
            </Link>
            <span className='cardComponent__healthScore'>Health Score: { healthScore }</span>
        </div>
    </div>
  );
}
