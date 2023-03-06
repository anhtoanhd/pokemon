import { Container as ModalContainer } from 'react-modal-promise';
import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from './components';
import { publicRoutes } from './configs';

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={<PublicRoute route={route} />} />;
        })}
      </Routes>
      <ModalContainer />
    </div>
  );
}

export default App;
