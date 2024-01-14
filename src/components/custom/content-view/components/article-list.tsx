import { ArticleItem } from 'components/custom/content-view/components/article-item';
import { IContentItem } from 'components/custom/content-view';

function ArticleList({
  articles,
  filter,
  refetch,
  t,
}: {
  articles: IContentItem[];
  filter: string;
  refetch: () => void;
  t: Function;
}): JSX.Element {
  return (
    <>
      {articles
        .filter((article) => article.title.toLowerCase().includes(filter))
        .map(({ id, title, link, checked }) => (
          <ArticleItem
            key={id}
            title={title}
            link={link}
            checked={checked}
            refetch={() => refetch()}
          />
        ))}
    </>
  );
}

export { ArticleList };
