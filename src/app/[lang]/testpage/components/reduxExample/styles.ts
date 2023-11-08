'use client';

import styled from 'styled-components';
import { colors } from 'constants/colors';

export const ReduxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
`;

export const Button = styled.button`
  background: ${colors.TEST_BACKGROUND_COLOR};
  color: ${colors.TEST_MAIN_COLOR};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid rgba(64, 202, 240, 0.575);
  border-radius: 3px;
`;
