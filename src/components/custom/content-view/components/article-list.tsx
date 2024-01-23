import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { NoDataFound } from 'components/custom';
import { ArticleItem, ContentSort } from 'components/custom/content-view/components';
import sortContent from 'components/custom/content-view/utils/sortContent';
import Iconify from 'components/iconify';
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
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ flex: 5 }}>
            {t('articlesAndTips')}
          </Typography>
          <Box
            onClick={() => {
              const articlesBox = document.getElementById('article__box');

              setIsOpen(!isOpen);
              if (!isOpen) {
                (articlesBox as HTMLDivElement).style.display = 'block';
                articlesBox?.classList.add('slide-in-top');
                articlesBox?.classList.remove('slide-out-top');
              } else {
                articlesBox?.classList.remove('slide-in-top');
                articlesBox?.classList.add('slide-out-top');
              }
            }}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Iconify
              width="2rem"
              icon={isOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{ textDecoration: 'underline', flex: 1, textAlign: 'right' }}
        >
          {t('viewed')}
        </Typography>
      </Box>
      <Box id="article__box">
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
            .map(({ id, title, link, screenshot, checked }) => (
              <ArticleItem
                id={id}
                key={id}
                title={title}
                link={link}
                screenshot={screenshot}
                checked={checked}
                t={t}
              />
            ))
        ) : (
          <NoDataFound />
        )}
      </Box>
    </Box>
  );
}

export { ArticleList };
