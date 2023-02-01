import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeDetail, deleteRecipe } from '../../actions';
import { NavBar } from '../NavBar/NavBar';

export const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const recipe = useSelector( ( state ) => state.detail );

    const handleDelete = ( id ) => {
      var result = confirm( 'Are you sure you want to delete this recipe?' );
      if( result ) {
        dispatch( deleteRecipe( id ) );
        alert( 'Recipe deleted!' );
        navigate( '/home' );
      }
    }
    
    useEffect(() => {
      dispatch( getRecipeDetail( id ) );
    }, [dispatch]);
    
  return (
    <div>
      <NavBar />
      {
        recipe.title ?
        <div>
          <button onClick={ () => navigate( '/home' ) }>Return</button>
          <h1>{ recipe.title }</h1>
          <div><img src={ recipe.image } alt={ recipe.title } /></div>
          <h2>Summary</h2>
          <div dangerouslySetInnerHTML={ { __html: recipe.summary } } />
          <div>
            <span>Diets:</span>
            <ul>
              { 
                recipe.diets?.map( diet => (
                  diet.name ? <li key={ diet.name }>{ diet.name }</li> :
                  <li key={ diet }>{ diet }</li>
                ))
              }
            </ul>
            
          </div>
          <div>
            <span>Dish types:</span>
            <ul>
              {
                recipe.dishTypes?.map( type => (
                  <li key={ type }>{ type }</li>
                ))
              }
            </ul>
          </div>
          <div>Health Score: { recipe.healthScore }</div>
          <div>Weight Watcher Smart Points: { recipe.weightWatcherSmartPoints }</div>
          <h2>Steps</h2>
          <div>
            { 
              typeof recipe.steps === 'object' ? recipe.steps?.map( e => (
                <div key={ e.number }>
                  <h3>{ e.number }</h3>
                  <p><b>Ingredients: </b>{ e.ingredients.map( el => (
                    <span key={ el.name }>{ el.name }. </span> )) }</p>
                  <p>{ e.step }</p>
                </div>
              )) : recipe.steps
            }
          </div>
          {
            recipe.created_db && ( 
              <div>
                <Link to={ `/update/${ recipe.id }` }><button>Update</button></Link>
                <button onClick={ e => handleDelete( id ) }>Delete</button>
              </div>
              )
          }
        </div>
        : <div>Loading...</div>
      }
    </div>
  );
}
