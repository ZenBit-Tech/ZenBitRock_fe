import { VideoItem } from 'components/custom/content-view/components';

type PropVideoList = {
  id: string;
  title: string;
  link: string;
  checked: boolean;
}[];

function VideoList({ videos }: { videos: PropVideoList }): JSX.Element {
  return (
    <>
      {videos.map(({ id, title, link, checked }) => (
        <VideoItem key={id} title={title} link={link} checked={checked} />
      ))}
    </>
  );
}

export { VideoList };
