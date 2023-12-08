interface File {
  href: string;
  thumbnails: {
    large: string;
  };
}

interface ArrayItem {
  id: string;
  file: File;
}

function getImages(inputArray: ArrayItem[] | null): Array<[string, string]> {
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

// Example usage:
// const inputArray: ArrayItem[] = [
//   // ... (your input array)
// ];

// const resultArray: Array<[string, string]> = transformArray(inputArray);
// console.log(resultArray);
