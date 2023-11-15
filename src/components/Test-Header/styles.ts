'use client';

import styled from 'styled-components';
import { colors } from 'constants/colors';

export const TestHeaderItem = styled.header`
  background: ${colors.TEST_BACKGROUND_COLOR};
  color: white;
  padding: 0 25px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  color: ${colors.TEST_MAIN_COLOR};
  font-size: 25px;
`;
