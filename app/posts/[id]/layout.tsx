import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文章详情 | 我的博客',
  description: '阅读我博客中的文章',
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 