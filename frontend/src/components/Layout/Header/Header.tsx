import { StyledHeader } from './StyledHeader';

function Header() {
  return (
    <StyledHeader>
      <section>
        <button>Twitter</button>
      </section>
      <section>
        <button>Para você</button>
        <button>Seguindo</button>
      </section>
    </StyledHeader>
  );
}

export default Header;
