import React from 'react' 
import styles from '../styles/Home.module.scss'
import { FaTwitter, FaFacebook } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import Link from 'next/link'
interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) =>{
        return (
            <div className={styles.navbar}>
                <div><h1><Link href="/"><a>Pacific</a></Link></h1></div>
                <div>
                    <ul className={styles.navlist}>
                    <li className={styles.navicon}><FiSearch /></li>
                        <li className={styles.navicon}><FaTwitter /></li>
                        <li className={styles.navicon}><FaFacebook /></li>
                    </ul>
                </div>
            </div>
        );
}