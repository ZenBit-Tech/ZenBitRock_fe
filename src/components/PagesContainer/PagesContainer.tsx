import { LeftSection, Wrapper } from 'app/[locale]/sign-in/styles';
import SeoIllustration from 'assets/illustrations/seo-illustration';

type Props = {
  children: React.ReactNode;
};
function PagesContainer({ children }: Props) {
  return (
    <Wrapper sx={{ display: 'flex', paddingTop: '24px' }}>
      <LeftSection>
        <SeoIllustration maxWidth="80%" />
      </LeftSection>
      {children}
    </Wrapper>
  );
}

export default PagesContainer;
