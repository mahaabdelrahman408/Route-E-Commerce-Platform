import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Sale from './components/Sale/Sale'
import Brand from './components/Brand/Brand'
import Blog from './components/Blog/Blog'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Search from './components/Search/Search'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import UserContextProvider from './components/UserContextProvider/UserContextProvider'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetPassword from './components/ResetPassword/ResetPassword'
import Profile from './components/Profile/Profile'
import UpdateLoggedUserData from './components/UpdateLoggedUserData/UpdateLoggedUserData'
import UpdateLoggedUserPassword from './components/UpdateLoggedUserPassword/UpdateLoggedUserPassword'
import RecentProducts from './components/RecentProducts/RecentProducts'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Loading from './components/Loading/Loading'
import CategorySlider from './components/CategorySlider/CategorySlider'
import MainSlider from './components/MainSlider/MainSlider'
import CartContextProvider from './components/CartContextProvider/CartContextProvider'
import { Toaster } from 'sonner'
import Checkout from './components/Checkout/Checkout'
import CashOrder from './components/CashOrder/CashOrder'
import OrderContextProvider from './components/OrderContextProvider/OrderContextProvider'
import CategoriesContextProvider from './components/CategoriesContextProvider/CategoriesContextProvider'
import WishlistContextProvider from './components/WishlistContextProvider/WishlistContextProvider'

const routers = createBrowserRouter([{
  path:'/', element:<Layout/>,children:[
{index:true, element:<ProtectedRouter><Home/></ProtectedRouter>},
{path:'shop',element:<ProtectedRouter><Shop/></ProtectedRouter>},
{path:'sale',element:<ProtectedRouter><Sale/></ProtectedRouter>},
{path:'brands',element:<ProtectedRouter><Brand/></ProtectedRouter>},
{path:'blog',element:<ProtectedRouter><Blog/></ProtectedRouter>},
{path:'navbar',element:<Navbar/>},
{path:'footer',element:<Footer/>},
{path:'search',element:<ProtectedRouter><Search/></ProtectedRouter>},
{path:'login',element:<Login/>},
{path:'register',element:<Register/>},
{path:'cart',element:<ProtectedRouter><Cart/></ProtectedRouter>},
{path:'wishlist',element:<ProtectedRouter><Wishlist/></ProtectedRouter>},
{path:'categories',element:<ProtectedRouter><Categories/></ProtectedRouter>},
{path:'products',element:<ProtectedRouter><Products/></ProtectedRouter>},
{path:'ForgotPassword',element:<ForgotPassword/>},
{path:'VerifyResetCode',element:<VerifyResetCode/>},
{path:'ResetPassword',element:<ResetPassword/>},
{path:'profile',element:<ProtectedRouter><Profile/></ProtectedRouter>},
{path:'profile/update',element:<ProtectedRouter><UpdateLoggedUserData/></ProtectedRouter>},
{path:'profile/update/password',element:<ProtectedRouter><UpdateLoggedUserPassword/></ProtectedRouter>},
{path:'recentproducts',element:<ProtectedRouter><RecentProducts/></ProtectedRouter>},
{path:'productdetails/:id',element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
{path:'loading',element:<ProtectedRouter><Loading/></ProtectedRouter>},
{path:'categoriesslider',element:<ProtectedRouter><CategorySlider/></ProtectedRouter>},
{path:'mainslider',element:<ProtectedRouter><MainSlider/></ProtectedRouter>},
{path:'checkout',element:<ProtectedRouter><Checkout/></ProtectedRouter>},
{path:'cashorder',element:<ProtectedRouter><CashOrder/></ProtectedRouter>},

{path:'*',element:<NotFound/>}
  ]
}
])
function App() {
  return <>
  <Toaster richColors />

  <UserContextProvider>
    <WishlistContextProvider>
  <CartContextProvider>
      <OrderContextProvider>
        <CategoriesContextProvider>
<RouterProvider router={routers}></RouterProvider>
     </CategoriesContextProvider>
</OrderContextProvider>
  </CartContextProvider>
</WishlistContextProvider>
  </UserContextProvider>

  </>
 
}

export default App
