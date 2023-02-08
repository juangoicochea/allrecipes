import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipes, getDiets, postRecipe, getRecipeDetail, updateRecipe } from '../../actions/';
import { NavBar } from '../NavBar/NavBar';

const validate = ( input ) => {
    let errors = {};

    if( !input.title ) {
        errors.title = 'Title is require.';
    }

    if( !input.summary ) {
        errors.summary = 'Summary is require.';
    }

    if( !input.steps ) {
        errors.steps = 'Steps are require.';
    }

    if( input.dishTypes.length <= 0 ) {
        errors.dishTypes = 'Please select one dishtype at least.';
    }

    if( input.dishTypes.length >= 5 ) {
        errors.dishTypes = 'Please select maximun 4 dishTypes.';
    }

    if( input.diets.length <= 0 ) {
        errors.diets = 'Please select one diet at least.';
    }

    if( input.diets.length >= 5 ) {
        errors.diets = 'Please select maximun 4 diets.';
    }
    return errors;
}

const validateBlur = ( input ) => {
    let errors = {};
    const regExesUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    
    if( input.image && input.image.match( regExesUrl ) === null ) {
        errors.image = 'Its not a valid URL image.';
    }

    if( input.healthScore < 0 || input.healthScore > 100 ) {
        errors.healthScore = 'Please write a number between 0 and 100.';
    }

    if( input.weightWatcherSmartPoints < 0 || input.weightWatcherSmartPoints > 100 ) {
        errors.weightWatcherSmartPoints = 'Please write a number between 0 and 100.';
    }
    return errors;
}

export const CreateRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const allDiets = useSelector( ( state ) => state.diets );
    const allDishTypes = useSelector( ( state ) => state.recipes );
    const recipe = useSelector( ( state ) => state.detail );
    const [ errors, setErrors ] = useState({});
    const [ updated, setUpdated ] = useState( false );
    const [ input, setInput ] = useState({
        title: '',
        image: '',
        dishTypes: [],
        summary: '',
        healthScore: '',
        weightWatcherSmartPoints: '',
        steps: '',
        diets: [],
    });
    
    const getAllDiets = () => {
        let data = allDiets.map( diet => (
            <option value={ diet.name } key={ diet.name }>{ diet.name }</option>
        ));
        return data;
    }

    const getAllDishTypes = () => {
        let data = allDishTypes.flatMap( type => type.dishTypes );
        const dataArr = new Set( data );
        let result = [ ...dataArr ];
        return result.map( type => (
            <option value={ type } key={ type }>{ type }</option>
        ));
    }

    const handleChange = ( e ) => {
        setInput({
            ...input,
            [ e.target.name ]: e.target.value
        });
        setErrors( validate({
            ...input,
            [ e.target.name ]: e.target.value
        }));
    }

    const handleBlur = ( e ) => {
        setErrors( validateBlur ({
            ...input,
            [ e.target.name ]: e.target.value
        }));
    }

    const handleSelectDishTypes = ( e ) => {
        if( input.dishTypes.length < 4 && !input.dishTypes.includes( e.target.value ) ) {
            setInput({
                ...input,
                dishTypes: [ ...input.dishTypes, e.target.value ]
            });
        }
        setErrors( validate({
            ...input,
            dishTypes: [ ...input.dishTypes, e.target.value ]
        }));
    }

    const handleSelectDiets = ( e ) => {
        if( input.diets.length < 4 && !input.diets.find( diet => diet.name === e.target.value ) ) {
            setInput({
                ...input,
                diets: [ ...input.diets, { name: e.target.value } ]
            });
        }
        setErrors( validate({
            ...input,
            diets: [ ...input.diets, e.target.value ]
        }));
    }

    const handleDeleteDiet = ( e ) => {
        setInput({
            ...input,
            diets: input.diets.filter( diet => diet.name != e )
        });
        setErrors( validate({
            ...input,
            diets: input.diets.filter( diet => diet.name != e )
        }));
    } 

    const handleDeleteDishType = ( e ) => {
        setInput({
            ...input,
            dishTypes: input.dishTypes.filter( type => type != e )
        })
        setErrors( validate ({
            ...input,
            dishTypes: input.dishTypes.filter( type => type != e )
        }))
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        let getDiets = [];
        input.diets.forEach( diet => {
            diet.name ? getDiets.push( diet.name ) : getDiets.push( diet ); 
        });
        input.diets = getDiets;

        if( !id ) {
            dispatch( postRecipe( input ) );
            alert( 'Recipe Created!' );
        } else {
            dispatch( updateRecipe( id, input ) );
            alert( 'Recipe Updated!' );
        }

        setInput({
            title: '',
            image: '',
            dishTypes: [],
            summary: '',
            healthScore: '',
            weightWatcherSmartPoints: '',
            steps: '',
            diets: [],
        });
        navigate( '/home' );
    }

    if( id && recipe.title && !updated ) {
        setInput({
            title: recipe.title,
            image: recipe.image,
            dishTypes: recipe.dishTypes,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
            steps: recipe.steps,
            diets: recipe.diets,
        });
        setUpdated( !updated );
    }
    
    useEffect(() => {
        dispatch( getDiets() );
        dispatch( getRecipes() );
        id && dispatch( getRecipeDetail( id ) );
    }, [ dispatch, id ]);
    

  return (
    <div className='createRecipeComponent'>
        <div className='falseNavBar'></div>
        <NavBar />
        <section>
            <form>
                {
                    !id ? <h1>Create your recipe</h1> : <h1>Update recipe</h1>
                }
                <div className='createRecipeComponent__divForm'>
                    <span>Title:</span>
                    <div>
                        <input type='text' name='title' value={ input.title } placeholder='E.g. MilkyWay Coffe' onChange={ e => handleChange( e ) } />
                        {
                            errors.title && ( <p>{ errors.title }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Image:</span>
                    <div>
                        <input type='text' name='image' value={ input.image } placeholder='E.g. http://imagesbank.com/myimage.jpg' onChange={ e => handleChange( e ) } onBlur={ e => handleBlur( e ) } />
                        {
                            errors.image && ( <p>{ errors.image }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Dish Types:</span>
                    <div>
                        <select name='dishTypes' onChange={ e => handleSelectDishTypes( e ) }>
                            <option disabled selected value>Select...</option>
                            {
                                getAllDishTypes()
                            }
                        </select>
                        <ul>
                            {
                                input.dishTypes.map( type => (
                                    <li key={ type }>{ type } <span onClick={ () => handleDeleteDishType( type ) }>x</span></li>
                                ))
                            }
                        </ul>
                        {
                            errors.dishTypes && ( <p>{ errors.dishTypes }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Summary:</span>
                    <div>
                        <textarea name='summary' value={ input.summary } placeholder='This is a delicious recipe...' onChange={ e => handleChange( e ) }></textarea>
                        {
                            errors.summary && ( <p>{ errors.summary }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Health Score:</span>
                    <div>
                        <input type='number' name='healthScore' value={ input.healthScore } placeholder='75' onChange={ e => handleChange( e ) } onBlur={ e => handleBlur( e ) } />
                        {
                            errors.healthScore && ( <p>{ errors.healthScore }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Weight Watcher Smart Points:</span>
                    <div>
                        <input type='number' name='weightWatcherSmartPoints' value={ input.weightWatcherSmartPoints } placeholder='11' onChange={ e => handleChange( e ) } onBlur={ e => handleBlur( e ) } />
                        {
                            errors.weightWatcherSmartPoints && ( <p>{ errors.weightWatcherSmartPoints }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Steps:</span>
                    <div>
                        <textarea name='steps' value={ input.steps } rows='4' cols='50' placeholder='First we need to mix all the ingredients...' onChange={ e => handleChange( e ) }></textarea>
                        {
                            errors.steps && ( <p>{ errors.steps }</p> )
                        }
                    </div>
                </div>
                <div className='createRecipeComponent__divForm'>
                    <span>Diets:</span>
                    <div>
                        <select name='diets' onChange={ e => handleSelectDiets( e ) }>
                            <option disabled selected value>Select...</option>
                            {
                                getAllDiets()
                            }
                        </select>
                        <ul>
                            {
                                input.diets.map( diet => (
                                    <li key={ diet.name ? diet.name : diet }>{ diet.name ? diet.name : diet } <span onClick={ () => handleDeleteDiet( diet.name ? diet.name : diet ) }>x</span></li>
                                ))
                            }
                        </ul>
                        {
                            errors.diets && ( <p>{ errors.diets }</p> )
                        }
                    </div>
                </div>
                <div>
                    {
                        Object.keys( errors ).length === 0 && input.title.length >= 1 ? (
                            <button type='submit' onClick={ e => handleSubmit( e ) }>
                                {
                                    id ? <span>Update Recipe</span> : <span>Create Recipe</span>
                                }
                            </button>
                            
                        ) : null
                    }
                </div>
            </form>
        </section>
    </div>
  );
}
