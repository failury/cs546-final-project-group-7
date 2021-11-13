import Login from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Transactions from "./pages/Transactions"
import Wallets from "./pages/Wallets"
import Reports from "./pages/Reports"
import Budget from "./pages/Budget"
import Home from './pages/home';
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
                path: '/Dashboard/Transactions',
                component: Transactions,
            },
            {
                path: '/Dashboard/Wallets',
                component: Wallets,
            },
            {
                path: '/Dashboard/Reports',
                component: Reports,
            },
            {
                path: '/Dashboard/Budget',
                component: Budget,
            },
            {
                path: '/Dashboard/home',
                component: Home,
            },
        ],
    },
];

export default routes;