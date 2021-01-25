import React from 'react' 
import { Navbar } from '../components/Navbar'
import styles from '../styles/Home.module.scss'
import { Author } from '../types/types'

interface authorProps {
    author: Author
}

async function getAuthor() {
    const res = await fetch(`${process.env.BLOG_URL}/ghost/api/v3/content/authors/?key=${process.env.CONTENT_API_KEY}&fields=name,profile_image,website,facebook,twitter,bio`).then(res => res.json())
    return res.authors[0]
}

export const getStaticProps = async ({ params }) => {
    const author = await getAuthor()
    return {
      props: { author },
      revalidate: 10
    }
  }
  

const AuthorPage: React.FC<authorProps> = (props: authorProps) =>{
    const { author } = props
        return (
            <>
             <Navbar />
             <div style={{ width: '80%', margin: '80px auto'}}>
              <div className={styles.profileHeader}>
                <img src={author.profile_image} alt="" className={styles.profileLeft} />
                <div className={styles.profileRight}>
                 <h1>{author.name}</h1>
                 <p style={{color: 'gray', marginTop: '-5px'}}><a href={author.website}>website</a>{' '}<a style={{marginLeft: '20px'}} href="https://twitter.com/reactnoderails">Twitter</a><a style={{marginLeft: '20px'}} href="https://www.instagram.com/almostdone9999/">Instagram</a></p>
                </div>
              </div>
              <hr  style={{ color: 'lightgray'}} />
              <div className={styles.profileContent}>
                  {author.bio}
              </div>
             </div>
            </>
        );
}

export default AuthorPage