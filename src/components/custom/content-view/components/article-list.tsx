import { ArticleItem } from 'components/custom/content-view/components/article-item';
import { IContentItem } from 'components/custom/content-view';

function ArticleList({
  articles,
  filter,
  refetch,
}: {
  articles: IContentItem[];
  filter?: string;
  refetch: () => void;
}): JSX.Element {
  return (
    <>
      {articles.map(({ id, title, link, checked }) => (
        <ArticleItem key={id} title={title} link={link} checked={checked} />
      ))}
    </>
  );
}

export { ArticleList };
