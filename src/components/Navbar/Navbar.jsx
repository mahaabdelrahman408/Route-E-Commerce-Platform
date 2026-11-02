import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from 'react-router-dom';
import Home from './../Home/Home';
import Register from './../Register/Register';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";


export default function Navbar() {
  const { userToken , setUserToken,username,email} = useContext(UserContext);
  const { count} = useContext(CartContext);
 const{wishlistCount }= useContext(WishlistContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken (null);
    navigate('/login');
  }
    return<>
<div className="bg-white">
  <header className=" fixed inset-x-0 top-0 z-50 bg-[#eee]">
    <nav aria-label="Global" className="flex items-center justify-between  py-5 lg:px-8 max-w-310 mx-auto px-4 md:px-6">
      <div className="flex me-10 ">
        <  NavLink to={''} className="">
          
          <img src="/freshcart-logo-Ctk0WIKS.svg" alt className="w-auto h-8" />
        </  NavLink>
      </div>
      <div className="flex md:hidden">
        <button type="button" command="show-modal" commandfor="mobile-menu" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
     {userToken&& <div className="hidden md:flex md:gap-x-10">
        <NavLink to={'/'} className="relative text-sm font-semibold text-gray-500 transition-colors duration-200 hover:text-mincolor">Home</NavLink>
        
        <NavLink to={'/categories'} className="relative text-sm font-semibold text-gray-500 transition-colors duration-200 hover:text-mincolor">Categories</NavLink>
        <NavLink to={'/brands'} className="relative text-sm font-semibold text-gray-500 transition-colors duration-200 hover:text-mincolor">Brands</NavLink>
        <NavLink to={'/products'} className="relative text-sm font-semibold text-gray-500 transition-colors duration-200 hover:text-mincolor">Products</NavLink>
      </div>}
<div className="hidden md:flex md:flex-1 md:justify-end items-center gap-7 ">
  {userToken ? 
  <>
     <NavLink to="/wishlist"
className="relative text-lg font-semibold text-gray-500 transition-colors duration-200 hover:text-red-500"
>
  <FontAwesomeIcon icon={fas.faHeart} className="text-2xl" />
  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
    {wishlistCount}

  </span>
</NavLink>
   <NavLink to="/cart"
className="relative text-lg font-semibold text-gray-500 transition-colors duration-200 hover:text-mincolor"
>
  <FontAwesomeIcon icon={fas.faCartShopping} className="text-2xl" />
<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
  {count}
</span></NavLink>
      <div className="relative group"> 
           <NavLink 
      to={'profile'}
     className="cursor-pointer flex size-10 items-center justify-center rounded-full bg-mincolor text-lg font-bold text-white">
    {username ? username.charAt(0).toUpperCase() : 'U'}
  </NavLink>
  
   {/* Dropdown */}
  <div className="absolute right-0 top-full mt-2 hidden w-44 overflow-hidden rounded-lg bg-white shadow-md group-hover:block">

    <div className="border-b px-4 py-4">
      <h3 className="text-sm font-semibold text-mincolor">
        {username}
      </h3>

      <p className="truncate text-sm text-gray-700">
        {email}
      </p>
    </div>

    <button
      onClick={logout}
      className="w-full px-4 py-4 text-left text-sm text-gray-600 hover:bg-gray-100"
    >
      Sign out
    </button>

  </div>
  {/* ↑ ده قفل الـ Dropdown */}

</div>
 <span className="text-sm font-semibold text-gray-500 hover:text-red-500 cursor-pointer" onClick={logout}>
      Logout</span>
  </>

      : 
      <>
    <NavLink
      to="/login"
      className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-mincolor hover:text-white"
    >
      Log in
    </NavLink>
  <NavLink
    to="/register"
    className="rounded-full bg-mincolor px-4 py-2 text-sm font-semibold text-white hover:bg-mincolor"
  >
    Register
  </NavLink>

 </>
}
             

 
</div>



      
    </nav>
    <el-dialog>
      <dialog id="mobile-menu" className="backdrop:bg-transparent md:hidden">
        <div tabIndex={0} className="fixed inset-0 focus:outline-none">
          <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
          <img src="/freshcart-logo-Ctk0WIKS.svg" alt className="w-24" />
            </a>
              <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-500">
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <NavLink to={'/'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                  <NavLink to={'/cart'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Cart</NavLink>
                  <NavLink to={'/categories'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                  <NavLink to={'/brands'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                  <NavLink to={'/products'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                </div>
                <div className="py-6 items-center gap-4 flex justify-center">
                  {userToken ? (
                    <span className="text-sm font-semibold text-gray-500 hover:text-red-500 cursor-pointer">
                      Logout
                    </span>
                  ) : (
                    <NavLink
                      to="/login"
                      className="inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mincolor"
                    >
                      Log in
                    </NavLink>
                  )}  

  <NavLink
    to="/register"
className="inline-block rounded-full bg-mincolor px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mincolor"  >
    Register
  </NavLink>

   
                </div>
              </div>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  </header>

</div>

    </>
    }

