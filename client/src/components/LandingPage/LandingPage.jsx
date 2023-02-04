import { Link } from 'react-router-dom';
import image1 from '../../assets/images/landing1.webp';
import image2 from '../../assets/images/landing2.webp';
import image3 from '../../assets/images/landing3.webp';
import image4 from '../../assets/images/landing4.webp';
import image5 from '../../assets/images/landing5.webp';
import logo from '../../assets/images/allrecipes-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const LandingPage = () => {
  return (
    <div className='landingPageComponent'>
      <img className='logo' src={ logo } alt='AllRecipes' />
      <section>
        <img src={ image1 } alt='Delicious recipe 1' />
        <img src={ image2 } alt='Delicious recipe 2' />
        <img src={ image3 } alt='Delicious recipe 3' />
        <img src={ image4 } alt='Delicious recipe 4' />
        <img src={ image5 } alt='Delicious recipe 5' />
      </section>
      <Link to='/home'>
          <button>
            Continue
            &nbsp;<FontAwesomeIcon icon={solid('spoon')} />
          </button>
      </Link>
    </div>
  );
}