import React, { useState } from 'react';
import styles from '../styles/Home.module.scss'
import { Author, Post } from '../types/types';
import Link from 'next/link'
import { NextSeo } from 'next-seo';
import { Navbar } from '../components/Navbar';
import { FaTags } from 'react-icons/fa';

async function getPosts() {
  const res = await fetch(`${process.env.BLOG_URL}/ghost/api/v3/content/posts/?key=${process.env.CONTENT_API_KEY}&fields=title,slug,feature_image,created_at,custom_excerpt&include=tags`).then((res) => res.json())
  const posts = res.posts
  return posts
}

async function getAuthor() {
  const res = await fetch(`${process.env.BLOG_URL}/ghost/api/v3/content/authors/?key=${process.env.CONTENT_API_KEY}&fields=name,profile_image`).then(res => res.json())
  return res.authors[0]
}


export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  const author = await getAuthor()
  return {
    props: { posts, author },
    revalidate: 10
  }
}

interface HomeProps {
  posts: Post[],
  author: Author
}

export default function Home(props: HomeProps) {
  const { posts, author } = props
  const [ search, setSearch ] = useState("");
  const [ message, setMessage ] = useState("")
  const [ searchPost, setSearchPost ] = useState(false);
  const [ results, setResults ] = useState<Post[]>([])
  const onSubmit = (e) => {
    e.preventDefault();
    setResults([]);
    for(let i=0; i < posts.length; i++){
      for(let x=0; x < posts[i].tags.length; x++){
        if(posts[i].tags[x].slug.toString() === search){
          setResults(prev => [...prev, posts[i]])
        }
      }
    }
    if(results.length > 0){
      setSearchPost(true)
      setMessage(`${results.length} posts found`)
    }else{
      setSearchPost(true)
      setMessage("")
    }
  }
  return (
  <>
  <NextSeo
   title="Ao's Travel Blog Home Page"
   description="Home page for my travel blog, I have posted a lot of my travel records."
  />
  <Navbar image_url={author.profile_image} />
   <div className={styles.header}>
     <h1>Pacific</h1>
     <p>Travels Stories and Foods</p>
   </div>
   <form className={styles.search} onSubmit={onSubmit}>
     <input type="text" placeholder="Search...." className={styles.searchBox} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
     <div className={styles.suggested}>Suggested: <span>Singapore</span>{' '}<span>Travel</span></div>
   </form>
    <div className={styles.container}>
      { !searchPost ? (<ul>
        {posts && posts.map((post, index) => (
          <li key={index}>
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a className={styles.postlist}> 
              <img src={post.feature_image} className={styles.postlistimage} alt="" />
              <div className={styles.postlisttitle}>
                <h3>{post.title}</h3>
                <p style={{ color: 'lightgray'}}>created at: {post.created_at}</p>
              </div>
            </a>
            </Link>
          </li>
        ))}
      </ul>):(
      <ul>
        {message ? <div className={styles.message}>{message}</div> : <p>Sorry, No post is existing.</p>}
        {results && results.map((post, index) => (
          <>
          <li key={index}>
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a className={styles.postlist}> 
              <img src={post.feature_image} className={styles.postlistimage} alt="" />
              <div className={styles.postlisttitle}>
                <h3>{post.title}</h3>
                <p style={{ color: 'lightgray'}}>created at: {post.created_at}</p>
              </div>
            </a>
            </Link>
          </li>
          </>
        ))}
      </ul>
      )}
      </div>
  </>
  )
}
