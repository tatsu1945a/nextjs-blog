import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/Layout';
import Link from "next/link";
import utilStyle from "../styles/utils.module.css";
import { getPostsData }  from "../lib/post";


// SSGの場合 
export async function getStaticProps() {
  const allPostsData = getPostsData(); 
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    }
  }
}

// //SSR の場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すProps
      
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>
          私は、インフラエンジニアです。好きな得意な言語は、shellです。
        </p>
      </section>

      <section>
        <h2>📝孤高のエンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>
              {date}
            </small>
          </article>  
          ))}


        </div>
      </section>


    </Layout>
  );
}
