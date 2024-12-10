import { StyledFooter } from './StyledFooter';
import { useAppSelector } from '../../../hooks/reduxHooks';
import NavigateButtons from './NavigateButtons';

function Footer() {
  const { userId } = useAppSelector(s => s.User);

  return (
    <StyledFooter>
      <NavigateButtons
        local='bubble'
        nav={"/home"}
        text='Home'
      />
      <NavigateButtons
        local='searchPosts'
        nav={"/search"}
        text='Search'
      />
      <NavigateButtons
        local='profile'
        nav={`/profile/${userId}`}
        text='Profile'
      />
    </StyledFooter>
  );
}

export default Footer;
