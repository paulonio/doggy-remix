import { useMatches } from '@remix-run/react';
import { useState } from 'react';

import { StyledHeader, StyledLink, StyledNav } from './styled';

import BurgerMenu from '@/components/burger-menu';
import { LINKS_MOCK } from '@/constants/header';
import { isEqualStrings, removeLeadingSlash } from '@/utils/string-utils';

const Header = () => {
  const matches = useMatches();

  const [isBurgerMenuShown, setBurgerMenuShown] = useState(false);

  const handleToggleBurgerIcon = () => {
    setBurgerMenuShown(!isBurgerMenuShown);
  };

  const handleHideBurgerMenu = () => {
    setBurgerMenuShown(false);
  };

  return (
    <StyledHeader>
      <StyledNav $isActive={isBurgerMenuShown}>
        {LINKS_MOCK.map(({ href, text }) => (
          <StyledLink
            to={href}
            $isActive={isEqualStrings(matches[1].pathname, href)}
            key={text}
            onClick={handleHideBurgerMenu}
            data-testid={removeLeadingSlash(href)}
          >
            {text}
          </StyledLink>
        ))}
      </StyledNav>
      <BurgerMenu
        isActive={isBurgerMenuShown}
        onToggle={handleToggleBurgerIcon}
        onHideBurgerMenu={handleHideBurgerMenu}
      />
    </StyledHeader>
  );
};

export default Header;
