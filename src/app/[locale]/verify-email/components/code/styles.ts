import { RHFTextField } from 'components/hook-form';
import { Box, styled } from '@mui/material';

const COLORS = {
  RED: 'red',
};

export const StyledRHFTextField = styled(RHFTextField)`
  width: 60px;
  border: 1px solid grey;
  border-radius: 10px;
  input {
    text-align: center;
  }
`;

export const CodeWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

export const FormWrapper = styled(Box)`
  padding-top: 35px;
`;

export const ExpireWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  font-size: 16px;
`;

export const StyledParagraphCode = styled('p')`
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 5px;
`;

export const StyledSendAgain = styled('p')`
  font-weight: 600;
  color: ${COLORS.RED};
  cursor: pointer;
`;
