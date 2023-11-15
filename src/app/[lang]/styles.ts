'use client';

import styled from 'styled-components';
import { colors } from 'constants/colors';

export const Wrapper = styled.div`
  color: ${colors.TEST_MAIN_COLOR};
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Link = styled.a`
  color: inherit;
  margin-top: 25px;
`;
