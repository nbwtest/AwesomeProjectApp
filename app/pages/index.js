import Login from './login/Login';
import Home from './home/Home';

const appRouter = [
  {
    name: 'Login',
    component: Login,
    headerShown: false,
  },
  {
    name: 'Home',
    component: Home,
    headerShown: false,
  },
];

export default appRouter;
