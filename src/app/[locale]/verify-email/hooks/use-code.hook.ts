import { useState } from 'react';

const useCode = (codeLenght: number) => {
  const [code, setCode] = useState(Array(codeLenght).fill(''));

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1);
    const { value } = event.currentTarget.dataset;
    if (value) {
      let newCode = [...code];
      newCode[Number(value)] = digit;
      setCode(newCode);
    }
  };

  return { code, handleCodeChange };
};
export { useCode };
