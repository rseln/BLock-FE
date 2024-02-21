import styled from 'styled-components';

interface Props {
  open: Boolean;
}

export const StyledMenu = styled.nav<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #C2D0DB;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  width: fit-content;
  z-index: 1;
  min-width: 400px;

  // @media (max-width: ${({ theme }) => theme.mobile}) {
  //   width: 100%;
  // }

  a {
    font-size: 1.3rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: medium;
    letter-spacing: 0.3rem;
    text-decoration: none;
    transition: color 0.3s linear;
    color: ${({ theme }) => theme.primaryDark};

    color: 0D0C1D;

    // @media (max-width: 576px) {
    //   font-size: 1.5rem;
    //   text-align: center;
    // }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
  
  span {
    padding: 10px;
    padding-right: 20px;
    vertical-align: middle;
  }
`;