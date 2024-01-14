type IContentResponse = {
  id: string;
  title: string;
  link: string;
  checked: boolean;
}[];

type IContentUpdateRequest = {
  updates: { id: string; checked: boolean }[];
};

export { type IContentResponse, type IContentUpdateRequest };
