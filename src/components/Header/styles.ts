import styled from 'styled-components';
import { colors } from 'constants/colors';
import { palette as themePalette } from 'theme/palette';

const palette = themePalette('light');

export const HeaderItem = styled.header`
  background: ${palette.grey[800]};
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
