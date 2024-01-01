import { useRouter } from 'next/navigation';
import { Typography, Container, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Stack } from '@mui/system';
import { useTranslations } from 'next-intl';
import ChatsList from './chats-list';
import AddGroupChatButton from './add-group-chat-button';

export default function MessagesView(): JSX.Element {
  const router = useRouter();
  const t = useTranslations('MessagesPage');

  const CHATS_EXAMPLE = [
    {
      id: '1',
      type: 'private',
      chatName: 'Homer Simpson',
      members: [
        {
          firstName: 'Homer',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage: 'Ok, see you later bro!',
      lastMessageDate: '2023-12-24 18:14:44',
      countOfUnreadMessages: 200,
    },
    {
      id: '2',
      type: 'group',
      chatName: 'Agents chat',
      members: [
        {
          firstName: 'Homer',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Marge',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-23 08:14:44',
      countOfUnreadMessages: 10,
    },
    {
      id: '3',
      type: 'group',
      chatName: 'Home chat',
      members: [
        {
          firstName: 'Homer',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Marge',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Bart',
          lastName: 'Simpson',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-01 11:14:44',
      countOfUnreadMessages: 0,
    },
  ];

  return (
    <Container sx={{ pb: 8, pt: 2, px: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        justifyItems="center"
        sx={{ mb: 2, ml: '-22px' }}
      >
        <Stack direction="row" alignItems="center" alignContent="center">
          <Button sx={{ p: 0 }} onClick={() => router.back()}>
            <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
          </Button>

          <Typography variant="h3">{t('pageTitle')}</Typography>
        </Stack>

        <AddGroupChatButton t={t} />
      </Stack>
      <ChatsList chats={CHATS_EXAMPLE} t={t} />
    </Container>
  );
}
