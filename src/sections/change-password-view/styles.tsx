import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  width: 100%;
  flex-direction: column;
  align-items: left;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: fit-content;

  @media (min-width: 1024px) {
    flex: 1.5;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    align-items: center;
  }
`;
