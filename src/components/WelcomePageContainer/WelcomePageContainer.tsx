import CheckInIllustration from 'assets/illustrations/check-in-illustration';
import { LeftSection, Wrapper } from './styles';

type Props = {
  children: React.ReactNode;
};
function WelcomePageContainer({ children }: Props) {
  return (
    <Wrapper>
      <LeftSection>
        <CheckInIllustration maxWidth="70%" />
      </LeftSection>
      {children}
    </Wrapper>
  );
}

export default WelcomePageContainer;
