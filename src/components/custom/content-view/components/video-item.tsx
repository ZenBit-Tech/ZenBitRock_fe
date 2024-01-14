import { IContentItem } from 'components/custom/content-view';

interface PropsVideoItem extends IContentItem {
  refetch: () => void;
}

function VideoItem({ title, link, checked, refetch }: PropsVideoItem): JSX.Element {
  return <p>VideoItem</p>;
}

export { VideoItem };
