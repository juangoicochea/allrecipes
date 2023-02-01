import { Link } from 'react-router-dom';
//pendiente la dieta
export const Card = ( { id, title, image, dishTypes, healthScore } ) => {
  return (
    <div>
        <div>
            <Link to={ `/recipe/${ id }` }>
              <img src={ image } alt={ title } />
            </Link>
        </div>
        <div>
            <p>Health Score: { healthScore }</p>
            <h5>{ dishTypes }</h5>
            <Link to={ `/recipe/${ id }` }>
              <h3>{ title }</h3>
              </Link>
        </div>
    </div>
  );
}
