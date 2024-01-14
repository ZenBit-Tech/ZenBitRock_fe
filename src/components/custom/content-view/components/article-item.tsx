import { IContentItem } from 'components/custom/content-view';

interface PropsArticleItem extends IContentItem {
  refetch: () => void;
}

function ArticleItem({ title, link, checked, refetch }: PropsArticleItem): JSX.Element {
  return <p>ArticleItem</p>;
}

export { ArticleItem };
