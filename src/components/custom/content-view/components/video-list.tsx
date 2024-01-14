import { VideoItem } from 'components/custom/content-view/components/video-item';
import { IContentItem } from 'components/custom/content-view';

function VideoList({
  videos,
  filter,
  refetch,
}: {
  videos: IContentItem[];
  filter: string;
  refetch: () => void;
}): JSX.Element {
  return (
    <>
      {videos
        .filter((video) => video.title.toLowerCase().includes(filter))
        .map(({ id, title, link, checked }) => (
          <VideoItem
            key={id}
            title={title}
            link={link}
            checked={checked}
            refetch={() => refetch()}
          />
        ))}
    </>
  );
}

export { VideoList };
