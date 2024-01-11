import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';
import DefaultLayout from '../Layouts/DefaultLayout';
import HomePage from '../Pages/Home';
import CategoryPage from '../Pages/Category';
import ForbiddenPage from '../Pages/404';
const InitRouter = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <CategoryPage />,
      },
      {
        path: '/:categoryId',
        element: <CategoryPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <ForbiddenPage />,
  },
];
export default InitRouter;
