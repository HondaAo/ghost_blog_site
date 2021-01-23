import Link  from "next/link"
import { Post } from "../../types/types";
import styles from '../../styles/Home.module.scss'
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { NextSeo } from 'next-seo';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

async function getPost(slug: string) {
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`).then((res) => res.json())
  const posts = res.posts
  return posts[0]
}

export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.slug)
    return {
      props: { post },
      revalidate: 10
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true
    }
}

interface PostProps {
    post: Post
}

const _Post: React.FC<PostProps> = (props) => {
    const { post } = props;
    const [ comments, setComments ] = useState<boolean>(true);
    function loadComments(){
        setComments(false)
        ;(window as any).disqus_config = function() {
            this.page.url = window.location.href;
            this.page.identifier = post.slug;
        }
        const script = document.createElement('script')
        script.src = 'https://ghost-website.disqus.com/embed.js'
        script.setAttribute('data-timestamp',Date.now().toString())

        document.body.appendChild(script)
    }
    return(
        <>
       {post && <NextSeo
          title="Pacific travel blog"
          description={post.title}
         />}
        <Navbar />
        <div className={styles.blogcontainer}>
            {post && (
            <>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: props.post.html }} ></div>
            {comments && (
                <>
                <p onClick={loadComments}>
                    LoadComment
                </p>
                </>
            )}
            <div id="disqus_thread"></div>
            </>
            )}
        </div>
        </>
    )
}

export default _Post;