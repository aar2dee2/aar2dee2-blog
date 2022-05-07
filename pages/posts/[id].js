import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from "../../styles/utils.module.css"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    const mdxSource = await serialize(
        postData.rawContent,
        {
            mdxOptions: {
                rehypePlugins: [rehypeHighlight]
            }
        }
    )
    return {
        props: {
            postData,
            mdxSource
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData, mdxSource }) {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        {/* {<article>
            <h2 className={utilStyles.headingXL}>{postData.title}</h2>
            <br />
            <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>} */}
        <h2 className={utilStyles.headingXL}>{postData.title}</h2>
        <MDXRemote {...mdxSource} />
    </Layout>
    )
}
