
import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>さいしょのとうこ</h1>
      <Link href="/"><a><h2>ほーむへ</h2></a></Link>
    </div>
  );
}