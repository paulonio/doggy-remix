import { LinkProps } from '@remix-run/react';
import { ButtonHTMLAttributes, FC } from 'react';

import { Background, StyledButton, StyledLink } from './styled';

type Props = {
  background?: Background;
  dataTestId?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<LinkProps>;

const Button: FC<Props> = ({ to, children, background = 'primary', dataTestId }, props) => {
  if (to) {
    return (
      <StyledLink to={to} $background={background} data-testid={dataTestId} {...props}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton $background={background} data-testid={dataTestId} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
