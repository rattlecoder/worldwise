import React from 'react'
import Logo from './Logo'
import AppNav from './AppNav.jsx'
import styles from './Sidebar.module.css'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      
      <footer className={styles.footer}>
         <p className={styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
         </p>
      </footer>
    </div>
  )
}
