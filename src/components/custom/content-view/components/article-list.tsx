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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: '1.5rem',
        }}
      >
        <Typography variant="h4" sx={{ flex: 5 }}>
          {t('articlesAndTips')}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ textDecoration: 'underline', flex: 1, textAlign: 'right' }}
        >
          {t('viewed')}
        </Typography>
      </Box>

      {articles
        .filter((article) => article.title.toLowerCase().includes(filter))
        .map(({ id, title, link, checked }) => (
          <ArticleItem
            id={id}
            key={id}
            title={title}
            link={link}
            checked={checked}
            refetch={() => refetch()}
            t={t}
          />
        ))}
    </Box>
  );
}

export { ArticleList };
