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
      id: 'c2e010e3-77d7-448c-a032-e17bf384dbb0',
      type: 'private',
      chatName: 'Angelina Jolie',
      members: [
        {
          firstName: 'Angelina',
          lastName: 'Jolie',
          avatarUrl:
            'https://www.atozpictures.com/uploads/2016/10/angelina-jolie-young-hot-pictures.jpg',
        },
      ],
      lastMessage: 'Love you!',
      lastMessageDate: '2023-12-29 18:14:44',
      countOfUnreadMessages: 5,
    },
    {
      id: '7919c17b-893f-4c02-82fe-b3f0aab1de13',
      type: 'private',
      chatName: 'Denys Ukrainskyy',
      members: [
        {
          firstName: 'Denys',
          lastName: 'Ukrainskyy',
          avatarUrl: '/',
        },
      ],
      lastMessage:
        'But after all there is no real antagonism between the two classes; there is no reason why what pleases the one should not please the other, or why a translator who makes it his aim to treat',
      lastMessageDate: '2023-12-28 18:14:44',
      countOfUnreadMessages: 7,
    },
    {
      id: '84386a4f-2b6f-40ba-9a67-766dff4d2ca6',
      type: 'private',
      chatName: 'Frank Sinatra',
      members: [
        {
          firstName: 'Frank',
          lastName: 'Sinatra',
          avatarUrl:
            'https://prod-printler-front-as.azurewebsites.net/media/photo/146466.jpg?mode=crop&width=727&height=1024&rnd=0.0.1',
        },
      ],
      lastMessage:
        'Between the two classes; there is no reason why what pleases the one should not please the other, or why a translator who makes it his aim to treat',
      lastMessageDate: '2023-12-27 18:14:44',
      countOfUnreadMessages: 200,
    },
    {
      id: '5',
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
      lastMessageDate: '2023-12-26 18:14:44',
      countOfUnreadMessages: 200,
    },
    {
      id: '10',
      type: 'group',
      chatName: 'Luxury chat',
      members: [
        {
          firstName: 'Frank',
          lastName: 'Sinatra',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Angelina',
          lastName: 'Jolie',
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
      lastMessageDate: '2023-12-21 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: '9',
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
      lastMessageDate: '2023-12-19 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: '11',
      type: 'group',
      chatName: 'Frankfurt chat',
      members: [
        {
          firstName: 'Franz',
          lastName: 'Backenbauer',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Lui',
          lastName: 'De phigo',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-16 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: '12',
      type: 'group',
      chatName: 'Mastercart chat',
      members: [
        {
          firstName: 'Master',
          lastName: 'Cart',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Cart',
          lastName: '',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-11 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: 'b96c93d2-546c-4aee-8e78-f711142a9b92',
      type: 'private',
      chatName: 'Hanna Konchakovska',
      members: [
        {
          firstName: 'Hanna',
          lastName: 'Konchakovska',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1704313701/ZenBitRock/hposcbtet0wj6bzfuara.jpg',
        },
      ],
      lastMessage: 'My purpose here is not to dogmatise on the rules of translation',
      lastMessageDate: '2023-12-10 18:14:44',
      countOfUnreadMessages: 2,
    },
    {
      id: '13',
      type: 'group',
      chatName: 'Centrum Odesa',
      members: [
        {
          firstName: 'Deribas',
          lastName: 'Hose',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Potemkin',
          lastName: 'Graf',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Kurvuazier',
          lastName: 'Lord',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-05 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: '14',
      type: 'group',
      chatName: 'Good chat',
      members: [
        {
          firstName: 'Soul',
          lastName: 'Goodman',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Nice',
          lastName: 'Woman',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-12-01 11:14:44',
      countOfUnreadMessages: 0,
    },
    {
      id: '15',
      type: 'group',
      chatName: 'Nice chat',
      members: [
        {
          firstName: 'Nice',
          lastName: 'Man',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
        {
          firstName: 'Nice',
          lastName: 'Woman',
          avatarUrl:
            'https://res.cloudinary.com/dwp6n7qqj/image/upload/v1703438084/ZenBitRock/g6m2s1wn1roibzbbjddc.jpg',
        },
      ],
      lastMessage:
        'Amidst the lush good greenery and serene landscapes, nature unfolds its beauty, revealing a symphony of colors, fragrances, and life, captivating hearts with its timeless charm.',
      lastMessageDate: '2023-11-01 11:14:44',
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
