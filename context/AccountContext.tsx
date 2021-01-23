import { createContext, ReactNode } from "react";
import { Author } from "../types/types";

const AccountContext = createContext(null);

async function getAuthor() {
    const res = await fetch(`${process.env.BLOG_URL}/ghost/api/v3/content/authors/?key=${process.env.CONTENT_API_KEY}&fields=name,profile_image`).then(res => res.json())
    return res.authors[0]
}

export const getStaticProps = async ({ params }) => {
    const author = await getAuthor()
    return {
      props: { author }
    }
}

interface ContextProps {
    children: ReactNode,
    author: Author
}

export const AccountProvider = (props: ContextProps) => {
    const { author } = props
    return (
        <AccountContext.Provider value={{ author }}>
            {props.children}
        </AccountContext.Provider>
    )
}