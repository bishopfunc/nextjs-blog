import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fullContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fullContents)
    return {
      id,
      ...matterResult.data,
    }
  })

  return allPostsData.sort(({date: a}, {date: b}) => {
    if(a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fullContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fullContents)
  const processContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

