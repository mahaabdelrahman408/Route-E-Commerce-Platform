import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return <>
<div className='flex min-h-screen flex-col'>
  <Navbar/>
  <main className="grow container mx-auto px-4 pt-20">
        <Outlet />
      </main>
  
  <Footer/>
</div>
 

  </>
   
}
