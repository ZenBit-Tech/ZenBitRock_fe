import orderBy from 'lodash/orderBy';
import { IContentItem } from 'types';

const sortContent = ({ content, sortType }: { content?: IContentItem[]; sortType: string }) => {
  switch (sortType) {
    case 'nameAsc':
      return orderBy(content, [(item) => item.title.toLowerCase()], ['asc']);

    case 'nameDesc':
      return orderBy(content, [(item) => item.title.toLowerCase()], ['desc']);

    default:
      return content;
  }
};

export default sortContent;
