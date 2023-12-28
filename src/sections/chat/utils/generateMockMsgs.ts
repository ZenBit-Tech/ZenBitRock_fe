import { randomValues } from 'constants/randomValues';
import { IChatMessage } from 'types/chat';
import uuidv4 from 'utils/uuidv4';

const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getRandomLorem = (minWords: number, maxWords: number): string => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel sem vitae quam varius tempor. Aenean at turpis eu turpis volutpat gravida.';
  const words = lorem.split(' ');
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

  return words.slice(0, wordCount).join(' ');
};

const generateMessagesForDate = (date: Date, remainingMessages: number): IChatMessage[] => {
  const numberOfMessages = Math.min(Math.floor(Math.random() * 5) + 1, remainingMessages);

  return Array.from({ length: numberOfMessages }, (_, index) => ({
    id: uuidv4(),
    body: `${randomValues.MSG} ${getRandomLorem(10, 30)}`,
    createdAt: date.toISOString(),
    isMe: index % 2 === 0,
    sender: { name: `${randomValues.USER} ${index % 2 === 0 ? 1 : 2}` },
    isRead: index % 3 === 0,
  }));
};

const generateMockMessages = (): IChatMessage[] => {
  const maxMessages = 20;
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date();
  const messages: IChatMessage[] = [];

  while (messages.length < maxMessages) {
    const randomGeneratedDate = randomDate(startDate, endDate);
    const remainingMessages = maxMessages - messages.length;
    const dateMessages = generateMessagesForDate(randomGeneratedDate, remainingMessages);

    messages.push(...dateMessages);
  }

  return messages;
};

export default generateMockMessages;
