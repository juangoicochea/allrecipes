import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeDetail, deleteRecipe } from '../../actions';
import { NavBar } from '../NavBar/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import loadingImg from '../../assets/images/loading.gif';

export const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const recipe = useSelector( ( state ) => state.detail );

    const handleDelete = ( id ) => {
      var result = window.confirm( 'Are you sure you want to delete this recipe?' );
      if( result ) {
        dispatch( deleteRecipe( id ) );
        alert( 'Recipe deleted!' );
        navigate( '/home' );
      }
    }

    const healthScoreStars = ( score ) => {
      let numStars = 0;
      let stars = [];
      if( score >= 0 && score < 20 ) numStars = 1;
      if( score >= 20 && score < 40 ) numStars = 2;
      if( score >= 40 && score < 60 ) numStars = 3;
      if( score >= 60 && score < 80 ) numStars = 4;
      if( score >= 80 && score <= 100 ) numStars = 5;

      for ( let i = 0; i < numStars; i++ ) {
        stars.push( <FontAwesomeIcon className='star' icon={solid('star')} /> );
      }
      return stars;
    }
    
    useEffect(() => {
      dispatch( getRecipeDetail( id ) );
    }, [dispatch]);
    
  return (
    <div className='detailComponent'>
      <div className='falseNavBar'></div>
      <NavBar />
      {
        recipe.title ?
        <section>
          <button className='returnButton' onClick={ () => navigate( '/home' ) }>
            <FontAwesomeIcon icon={solid('chevron-left')} />&nbsp;
            Return
          </button>
          <h1>{ recipe.title }</h1>
          <div className='detailComponent__ranks'>
            <span>Health Score: { healthScoreStars( recipe.healthScore ) } { recipe.healthScore }</span> 
            <span>Weight Watcher Smart Points: { recipe.weightWatcherSmartPoints }</span>
          </div>
          <div><img src={ recipe.image } alt={ recipe.title } /></div>
          <div className='detailComponent__info'>
            <div className='detailComponent__infoHeader'>
              <div className='detailComponent__infoHeader__summary'>
                <h2>Summary</h2>
                <div dangerouslySetInnerHTML={ { __html: recipe.summary } } />
              </div>
              <div className='detailComponent__infoHeader__dietsTypes'>
                <h2>Diets:</h2>
                <ul>
                  { 
                    recipe.diets?.map( diet => (
                      diet.name ? <li key={ diet.name }>{ diet.name }</li> :
                      <li key={ diet }>{ diet }</li>
                    ))
                  }
                </ul>
              </div>
              <div className='detailComponent__infoHeader__dietsTypes'>
                <h2>Types:</h2>
                <ul>
                  {
                    recipe.dishTypes?.map( type => (
                      <li key={ type }>{ type }</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className='detailComponent__infoFooter'>
              <h2>Steps</h2>
              {
                typeof recipe.steps === 'object' ? (
                  <ol>
                    { 
                      recipe.steps?.map( e => (
                        <li key={ e.number }>
                          <p><b>Ingredients: </b>{ e.ingredients.map( el => (
                            <span key={ el.name }>{ el.name }. </span> )) }</p>
                          <p>{ e.step }</p>
                        </li>
                      ))
                    }
                  </ol> 
                  ) : recipe.steps
              }
              {
                recipe.created_db && ( 
                  <div>
                    <Link to={ `/update/${ recipe.id }` }><button className='detailComponent__infoFooter__button'>Update</button></Link>
                    <button className='detailComponent__infoFooter__button' onClick={ e => handleDelete( id ) }>Delete</button>
                  </div>
                  )
              }
            </div>
          </div>
        </section>
        : 
          <section>
            <div className='loading'><img src={ loadingImg } alt='Loading' /></div>
          </section>
      }
    </div>
  );
}
