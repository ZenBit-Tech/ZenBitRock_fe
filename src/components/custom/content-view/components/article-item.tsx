type PropArticleList = {
  id: string;
  title: string;
  link: string;
  checked: boolean;
}[];

function ArticleList({ articles }: { articles: PropArticleList }): JSX.Element {
  return (
    <>
      {articles.map(({ id, title, link, checked }) => (
        <ArticleItem key={id} title={title} link={link} checked={checked} />
      ))}
    </>
  );
}

export { ArticleList };
