import { IPropertyDetailed } from 'types/property';

function getImages(inputArray: IPropertyDetailed['media']): string[][] {
  if (!inputArray || !Array.isArray(inputArray)) {
    return [];
  }

  return inputArray.map((item) => {
    const href: string = item?.file?.href || '';
    const largeThumbnail: string = item?.file?.thumbnails?.large || '';
    return [href, largeThumbnail];
  });
}

export default getImages;
