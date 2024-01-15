type IContentResponse = {
  id: string;
  type: string;
  title: string;
  link: string;
  screenshot?: string;
  checked: boolean;
};

type IContentUpdateRequest = { id: string; checked: boolean };

type IContentItem = {
  id?: string;
  title: string;
  link: string;
  screenshot?: string;
  checked: boolean;
};

export { type IContentResponse, type IContentUpdateRequest, type IContentItem };
