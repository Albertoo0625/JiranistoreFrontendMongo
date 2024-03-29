import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/SellerPage';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Details from './components/Details';
import CheckoutPage from './components/Cart/CheckOut';
import Seller from './components/SellerPage';
import SearchForm from './components/Search';
import Users from './components/Users';




const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App1(props) {

  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path='/' element={<Login/>}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

       

        {/* we want to protect these routes */}
      <Route element={<PersistLogin />}>

         <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
         <Route path="/home" element={<Home />} />
     

      
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/search" element={<SearchForm />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/users" element={<Users />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="seller" element={<Seller />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="products/*" element={<App/>} />
            <Route path="details" element={<Details/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="checkout" element={<CheckoutPage/> }/>      
            <Route element={<Default/>} />
          </Route>
          

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
          </Route>

          </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

  );
}

export default App1;