type IContentResponse = {
  id: string;
  type: string;
  title: string;
  link: string;
  screenshot?: string;
  checked: boolean;
}[];

type IContentUpdateRequest = { id: string; checked: boolean };

export { type IContentResponse, type IContentUpdateRequest };
