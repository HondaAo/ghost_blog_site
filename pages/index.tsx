import React from 'react';
import styles from '../styles/Home.module.scss'
import { Post } from '../types/types';
import Link from 'next/link'



async function getPosts() {
  const res = await fetch(`${process.env.BLOG_URL}/ghost/api/v3/content/posts/?key=${process.env.CONTENT_API_KEY}&fields=title,slug,feature_image,created_at,custom_excerpt`).then((res) => res.json())
  const posts = res.posts
  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: { posts },
    revalidate: 10
  }
}

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  const { posts } = props
  return (
    <div className={styles.container}>
     <div className={styles.topimage}>
      <h1>Welcome to Pacific</h1>
     </div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a className={styles.postlist}> 
              <img src={post.feature_image} className={styles.postlistimage} alt="" />
              <div className={styles.postlisttitle}>
                <h3>{post.title}</h3>
                <p>created at: {post.created_at}</p>
              </div>
            </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
