import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { NoDataFound } from 'components/custom';
import { ContentSort, ContentItem } from 'components/custom/content-view/components';
import sortContent from 'components/custom/content-view/utils/sortContent';
import Iconify from 'components/iconify';
import { CONTENT_SORT_OPTIONS } from 'constants/contentSortOptions';
import { useSelector, useState } from 'hooks';
import { IContentItem } from 'types';
import { ContentType } from 'types/content';
import { RootState } from 'store';
import AddContentBtn from './add-content-btn';

function ContentList({
  contents,
  filter,
  t,
  type,
}: {
  contents: IContentItem[];
  filter: string;
  t: Function;
  type: ContentType;
}): JSX.Element {
  const [sort, setSort] = useState<string>('nameAsc');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const { isAdmin } = authUser || { isAdmin: false };

  const sortedContent = useMemo<IContentItem[] | undefined>(
    () =>
      sortContent({
        content: contents?.filter((content) => content.title.toLowerCase().includes(filter)),
        sortType: sort,
      }),
    [contents, sort, filter]
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
            {t(`${type}Title`)}
          </Typography>
          <Box
            onClick={() => {
              const contentsBox = document.getElementById(`${type}__box`);

              setIsOpen(!isOpen);
              if (!isOpen) {
                (contentsBox as HTMLDivElement).style.display = 'block';
                contentsBox?.classList.add('slide-in-top');
                contentsBox?.classList.remove('slide-out-top');
              } else {
                contentsBox?.classList.remove('slide-in-top');
                contentsBox?.classList.add('slide-out-top');
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
      <Box id={`${type}__box`}>
        {isAdmin && (
          <Box sx={{ display: 'flex', alignItems: 'center', p: '6px 8px' }}>
            <Typography
              variant="h6"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('addLink')}
            </Typography>
            <AddContentBtn type={type} />
          </Box>
        )}
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
            ?.filter((content) => content.title.toLowerCase().includes(filter))
            .map(({ id, title, link, screenshot, checked }, idx) => (
              <ContentItem
                id={id}
                key={id}
                title={title}
                link={link}
                screenshot={screenshot}
                checked={checked}
                t={t}
                type={type}
                isAdmin={isAdmin}
              />
            ))
        ) : (
          <NoDataFound />
        )}
      </Box>
    </Box>
  );
}

export { ContentList };
