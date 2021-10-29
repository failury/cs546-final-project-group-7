import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Page1 from "./pages/page1";
import Page2 from './pages/page2';

const routes = [
    {
    path: '/login',
    component: Login,
    },
    {
        path: '/signup',
        component: SignUp,
        },
    {
    path: '/Dashboard',
    component: Dashboard,
    routes: [              
        {
        path: '/Dashboard/page1',
        component: Page1,
        },
        {
        path: '/Dashboard/page2',
        component: Page2,
        },
    ],
    },
];

export default routes;