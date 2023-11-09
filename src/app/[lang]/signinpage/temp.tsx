import { Locale } from 'locales/i18n.config';
import { getDictionary } from 'lib/dictionary';

import { Wrapper, LeftSection, LoginWrapper, RightSection } from './styles';
/* import { Link, Wrapper } from './styles'; */

type Props = {
  params: { lang: Locale };
};

export default function SignInPage({ params: { lang } }: Props) {
  /*  const { Home } = await getDictionary(lang); */

  return (
    <Wrapper>
      {/* <h1>{Home.Page.title}</h1>
      <Link href="testpage">{Home.Page.link}</Link> */}

      <LeftSection></LeftSection>
      <RightSection>
        <LoginWrapper>
          {/*   <h1>{Home.Page.title}</h1> */}
          <h2>SignIn form hello</h2>
          {/*  <Form formAction={loginAct} btnText="Sign In" formTitle="Login" />
          <div>{loginError && <span style={{ color: 'red' }}>Something went wrong!</span>}</div>
          <div>
            <p>
              Don't have account?{' '}
              <Link className={s.login__link} to="/register">
                <span className={s.link__text}>Sign Up</span>
              </Link>
            </p>
          </div> */}
        </LoginWrapper>
      </RightSection>
    </Wrapper>
  );
}
