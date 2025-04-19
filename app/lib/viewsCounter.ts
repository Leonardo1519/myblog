import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'views.json');

// 确保数据目录存在
function ensureDirectoryExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 读取浏览量数据
export function getViewsData(): Record<string, number> {
  ensureDirectoryExists();
  
  if (!fs.existsSync(DATA_FILE_PATH)) {
    // 如果文件不存在，创建一个空的数据文件
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({}), 'utf8');
    return {};
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取浏览量数据时出错:', error);
    return {};
  }
}

// 获取特定文章的浏览量
export function getPostViews(postId: string): number {
  const data = getViewsData();
  return data[postId] || 0;
}

// 增加文章浏览量
export function incrementPostViews(postId: string): number {
  const data = getViewsData();
  
  // 增加浏览量或初始化为1
  const currentViews = data[postId] || 0;
  data[postId] = currentViews + 1;
  
  try {
    // 保存数据到文件
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data), 'utf8');
    return data[postId];
  } catch (error) {
    console.error('保存浏览量数据时出错:', error);
    return currentViews;
  }
} 