//pendiente la dieta
export const Card = ( { id, title, image, dishTypes, healthScore } ) => {
  return (
    <div>
        <div>
            <img src={ image } alt={ title } />
        </div>
        <div>
            <p>Health Score: { healthScore }</p>
            <h5>{ dishTypes }</h5>
            <h3>{ title }</h3>
        </div>
    </div>
  );
}
