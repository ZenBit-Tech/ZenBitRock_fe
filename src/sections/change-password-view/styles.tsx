import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  width: 100%;
`;

export const LeftSection = styled.div`
  flex: 2;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled.div`
  flex: 1;
`;