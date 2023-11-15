'use client';

import styled from 'styled-components';
import { colors } from 'constants/colors';

export const MainWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MainText = styled.h1`
  color: ${colors.TEST_MAIN_COLOR};
`;
