import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory =  path.join(process.cwd(), "posts");

// mdファイル取り出し
export function getPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // id とデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}


// getStaticPath returnで使うPathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      }
    }
  })
  /*
    [
      {
        params: {
          id: "ssg-ssr"
        }
      },      
      {
        params: {
          id: "next-react"
        }
      }
    ]
  */
}

//id基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }

}