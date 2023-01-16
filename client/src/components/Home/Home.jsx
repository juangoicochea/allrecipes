import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions';
import { Card } from '../Card/Card';
import { Paginate } from '../Paginate/Paginate';

export const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector( (state) => state.recipes );
    const [loader, setLoader] = useState( true );
    const [currentPage, setCurrentPage] = useState( 1 );
    const recipesPerPage = 15;
    const lastRecipeOfPage = currentPage * recipesPerPage;
    const firstRecipeOfPage = lastRecipeOfPage - recipesPerPage;
    const recipesOfActualPage = allRecipes?.slice( firstRecipeOfPage, lastRecipeOfPage );

    const paginate = ( pageNumber ) => {
        setCurrentPage( pageNumber );
    }

    useEffect(() => {
        dispatch( getRecipes() );
    }, [dispatch] );
    
    if( recipesOfActualPage.length > 0 && loader ) {
        setLoader( false );
    }

  return (
    <>
        <div>Home</div>
        {
            recipesOfActualPage.length > 0 && !loader ? (
                recipesOfActualPage.map( recipe => (
                    <Card 
                        key={ recipe.id }
                        id={ recipe.id }
                        title={ recipe.title }
                        image={ recipe.image }
                        dishTypes={ recipe.dishTypes }
                        healthScore={ recipe.healthScore }
                    />
                )
            )
            ) : !recipesOfActualPage.length > 0 && loader ? (
                <h2>Loading...</h2>
            ) : (
                <h1>There is not a recipe by that name!</h1>
            )
        }
        <Paginate
            allRecipes={ allRecipes.length }
            recipesPerPage={ recipesPerPage }
            paginate={ paginate }
        />
    </>
  );
}
