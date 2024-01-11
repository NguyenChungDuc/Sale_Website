import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitRouter from './Routers';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {InitRouter.map((route, index) => {
          if (route.children) {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((children, index) => (
                  <Route
                    key={index}
                    path={children.path}
                    element={children.element}
                  />
                ))}
              </Route>
            );
          } else {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
