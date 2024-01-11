export function trimString(message: string, maxWords: number, maxCharacters: number) {
  const words = message.split(' ');

  if (words.length > maxWords) {
    message = `${words.slice(0, maxWords).join(' ')}...`;
  }
  if (message.length > maxCharacters) {
    message = `${message.slice(0, maxCharacters)}...`;
  }

  return message;
}
