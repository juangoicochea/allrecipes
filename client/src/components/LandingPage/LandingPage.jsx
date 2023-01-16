import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <>
        <div>Soy LandingPage</div>
        <Link to='/home'>
            <button>Continue</button>
        </Link>
    </>
  );
}