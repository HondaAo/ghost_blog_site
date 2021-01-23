import React from 'react' 
import styles from '../styles/Home.module.scss'
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import { Post } from '../types/types'
interface NavbarProps {
    image_url?: string,
    search?: (text: string) => Post[]
}

export const Navbar: React.FC<NavbarProps> = ({image_url}) =>{
        return (
            <div className={styles.navbar}>
                <div><h1><Link href="/"><a>Pacific</a></Link></h1></div>
                <div>
                    <ul className={styles.navlist}>
                    <li className={styles.navicon}><a href="https://twitter.com/reactnoderails"><FaTwitter /></a></li>
                    <li className={styles.navicon}><a href="https://www.instagram.com/almostdone9999"><FaInstagram /></a></li>
                    { image_url ? <li className={styles.navicon}><Link href="/author"><a><img src={image_url} alt="" style={{ height: '30px', width: '30px', borderRadius: '100%'}} /></a></Link></li> : <li className={styles.navicon}><FaFacebook /></li>}
                    </ul>
                </div>
            </div>
        );
}