import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGray);
  width: 25%;
  min-width: 200px;
  height: 60px;
  border-radius: 30px;
  margin: 20px auto;
  border: 0;
  font-size: var(--fontLarge);
  color: var(--white);
  transition: all 0.3s;
  outline: none;
  cursor: pointer;
  
  :hover {
    opacity: 0.8;
  }
`;