
export const Paginate = ({ allRecipes, recipesPerPage, paginate   }) => {
    const pageNumbers = [];

    for( let i = 1; i <= Math.ceil( allRecipes / recipesPerPage ); i++ ) {
        pageNumbers.push( i );
    }

  return (
    <div>
        <ul>
            {
                pageNumbers && pageNumbers.map( number => (
                    <li key={ number }>
                        <a onClick={ () => paginate( number ) }>{ number }</a>
                    </li>
                ))
            }
        </ul>
    </div>
  );
}
