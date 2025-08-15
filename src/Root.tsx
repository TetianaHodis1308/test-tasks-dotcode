import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { lazy, Suspense } from 'react';
import { Loader } from './components/Loader';

const FirstTask = lazy(() => import('./pages/FirstTask'));
const SecondTask = lazy(() => import('./pages/SecondTask'));

export const Root = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="home"
              element={
                <Navigate
                  to={'/'}
                  replace
                />
              }
            />

            <Route
              path="first-task"
              element={<FirstTask />}
            />
            <Route
              path="second-task"
              element={<SecondTask />}
            />

            <Route
              path="*"
              element={<h1>Page not found</h1>}
            />
          </Route>
        </Routes>
      </HashRouter>
    </Suspense>
  );
};
