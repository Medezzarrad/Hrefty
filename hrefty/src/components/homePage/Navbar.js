import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '..//..//style/homePage/Navbar.scss'


const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className='navbarRight'>
        شعار
      </div>
      <div className='navbarLeft'>
        <ul className='routerLinks'>
            <li className='home link'>الرئيسية</li>
            <li className='link'>الخدمات</li>
            <li className='link'>المهنيون</li>
            <li className='link'>المدونة</li>
        </ul>
        <div className='buttons'>
            <button className='btn'>دخول</button>
            <button className='btn'>تسجيل</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
