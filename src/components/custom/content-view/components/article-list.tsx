import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { NoDataFound } from 'components/custom';
import { ArticleItem, ContentSort } from 'components/custom/content-view/components';
import sortContent from 'components/custom/content-view/utils/sortContent';
import { CONTENT_SORT_OPTIONS } from 'constants/contentSortOptions';
import { useState } from 'hooks';
import { IContentItem } from 'types';

function ArticleList({
  articles,
  filter,
  t,
}: {
  articles: IContentItem[];
  filter: string;
  t: Function;
}): JSX.Element {
  const [sort, setSort] = useState<string>('nameAsc');

  const sortedContent = useMemo<IContentItem[] | undefined>(
    () =>
      sortContent({
        content: articles?.filter((article) => article.title.toLowerCase().includes(filter)),
        sortType: sort,
      }),
    [articles, sort, filter]
  );

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
      <ContentSort sort={sort} sortOptions={CONTENT_SORT_OPTIONS} onSort={setSort} />
      {sortedContent && filter !== '' && (
        <Typography
          variant="h6"
          sx={{
            px: 2.5,
            mb: 2,
          }}
        >
          {t('matchingResults')} ({sortedContent.length})
        </Typography>
      )}
      {sortedContent && sortedContent?.length > 0 ? (
        sortedContent
          ?.filter((article) => article.title.toLowerCase().includes(filter))
          .map(({ id, title, link, checked }) => (
            <ArticleItem id={id} key={id} title={title} link={link} checked={checked} t={t} />
          ))
      ) : (
        <NoDataFound />
      )}
    </Box>
  );
}

export { ArticleList };
