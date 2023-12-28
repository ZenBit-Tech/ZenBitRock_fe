import { Typography, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import ChatsList from './chats-list';

export default function MessagesView(): JSX.Element {
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
    <Container sx={{ py: 5, px: 2 }}>
      <Typography variant="h3" sx={{ mb: '20px' }}>
        {t('pageTitle')}
      </Typography>
      <ChatsList chats={CHATS_EXAMPLE} t={t} />
    </Container>
  );
}