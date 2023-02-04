
export const Paginate = ({ allRecipes, recipesPerPage, paginate, currentPage }) => {
    const pageNumbers = [];

    for( let i = 1; i <= Math.ceil( allRecipes / recipesPerPage ); i++ ) {
        pageNumbers.push( i );
    }

  return (
    <div className='paginateComponent'>
        <ul>
            {
                pageNumbers && pageNumbers.map( number => (
                    <li className={ number === currentPage ? 'currentPage' : 'otherPage' } key={ number }>
                        <a onClick={ () => paginate( number ) }>{ number }</a>
                    </li>
                ))
            }
        </ul>
    </div>
  );
}
