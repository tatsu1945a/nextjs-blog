import utilStyles from "../../styles/utils.module.css";
import Layout, { siteTitle } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  
  console.log(postData);
  return {
    props: {
      postData,
    },
  };
}


export default function Post({ postData}) {
  return (
    <div>
      <Layout>
        <Head>
          <title>{ postData.title }</title>
          </Head>
        <article>
          <h1 className={utilStyles.headingX1}>{postData.title}</h1>
          <div className={utilStyles.lightText}>{postData.date}</div>
          <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML }}/>
        </article>

      </Layout>
    </div>
  );
}