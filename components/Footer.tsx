import Link from 'next/link';
import React from 'react' 
import styles from '../styles/Home.module.scss'

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({}) =>{
    return (
        <div className={styles.footer}>
            <div className={styles.footerLeft}>Pacific</div>
            <div className={styles.footerRight}>
                <Link href="/"><a>Top</a></Link>
                <Link href="/"><a>Author</a></Link>
                <Link href="/"><a>Privacy</a></Link>
            </div>
        </div>
    );
}