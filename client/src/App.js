import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage'; 
import { Home } from './components/Home/Home';
import { CreateRecipe } from './components/CreateRecipe/CreateRecipe';
import { Detail } from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={ <LandingPage /> } />
          <Route exact path='/home' element={ <Home /> } />
          <Route exact path='/create' element={ <CreateRecipe /> } />
          <Route exact path='/recipe/:id' element={ <Detail /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
