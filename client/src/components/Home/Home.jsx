import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterRecipesByCreator, filterRecipesByDiet, getDiets, getRecipes, orderBy } from '../../actions';
import { Card } from '../Card/Card';
import { NavBar } from '../NavBar/NavBar';
import { Paginate } from '../Paginate/Paginate';
import { SearchBar } from '../SearchBar/SearchBar';

export const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector( ( state ) => state.recipes );
    const allDiets = useSelector( ( state ) => state.diets ); 
    const [sort, setSort] = useState( '' );
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
        dispatch( getDiets() );
    }, [dispatch] );
    
    const handleFilterDiets = ( e ) => {
        dispatch( filterRecipesByDiet( e.target.value ) );
        setCurrentPage( 1 );
    }

    const handleFilterByCreator = ( e ) => {
        dispatch( filterRecipesByCreator( e.target.value ) );
        setCurrentPage( 1 );
    }

    const handleSort = ( e ) => {
        dispatch( orderBy( e.target.value ) );
        setCurrentPage( 1 );
        setSort( e.target.value );
    }

    if( recipesOfActualPage.length > 0 && loader ) {
        setLoader( false );
    }

  return (
    <div className='homeComponent'>
        <div className='homeComponent__falseNavBar'></div>
        <NavBar />
        <div className='homeComponent__boxFilters'>
            <div className='homeComponent__boxFilters__left'>
                <div>
                    <div>Order by:</div>
                    <select onChange={ e => handleSort( e ) }>
                        <option value='All' key='All' default>All</option>
                        <option value="Asc_name" key="Asc_name">Alphabetically (A-Z)</option>
                        <option value="Desc_name" key="Desc_name">Alphabetically (Z-A)</option>
                        <option value="Asc_healthScore" key="Asc_healthScore">Health Score (Lower-Higher)</option>
                        <option value="Desc_healthScore" key="Desc_healthScore">Health Score (Higher-Lower)</option>
                    </select>
                </div>
                <div>
                    <div>Filter by diet:</div>
                    <select onChange={ e => handleFilterDiets( e ) }>
                        <option value='All' key='All' default>All</option>
                        {
                            allDiets?.map( diet => (
                                <option value={ diet.name } key={ diet.id }>{ diet.name }</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <div>Filter by creator:</div>
                    <select onChange={ e => handleFilterByCreator( e ) }>
                        <option value='All' key='All'>All</option>
                        <option value='API_Created' key='API_Created'>API Created</option>
                        <option value='User_Created' key='User_Created'>User Created</option>
                    </select>
                </div>
            </div>
            <div>
                <div>Search:</div>
                <SearchBar />
            </div>
        </div>
        <section>

            {
                recipesOfActualPage.length > 0 && !loader ? (
                    recipesOfActualPage.map( recipe => (
                        <Card 
                            key={ recipe.id }
                            id={ recipe.id }
                            title={ recipe.title }
                            image={ recipe.image }
                            dishTypes={ recipe.dishTypes.map( ( e, i ) => ( 
                                <span key={ e }>{ e }{ i < recipe.dishTypes.length-1 && ' - ' } </span> ) 
                                ) }
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

        </section>
        <Paginate
            allRecipes={ allRecipes.length }
            recipesPerPage={ recipesPerPage }
            paginate={ paginate }
            currentPage={ currentPage }
        />
    </div>
  );
}
