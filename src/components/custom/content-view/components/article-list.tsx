import { ArticleItem } from 'components/custom/content-view/components/article-item';
import { IContentItem } from 'components/custom/content-view';
import { Box, Typography } from '@mui/material';

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
    <Box>
      <Typography>{t('articlesAndTips')}</Typography>
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
    </Box>
  );
}

export { ArticleList };
