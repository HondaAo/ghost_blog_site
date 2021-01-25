export type Post = {
    title: string,
    html?: string,
    slug: string,
    feature_image?: string,
    created_at?: string,
    tags: any[]
}
export type Author = {
    name: string,
    profile_image: string,
    website?: string,
    facebook?: string,
    twitter?: string,
    bio?: string
}