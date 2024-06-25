import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;
  padding: 1.6rem 0;

  > img {
    width: 7.2rem;
    height: fit-content;
  }
  
  > div {
    h2 {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 2rem;
      line-height: 160%;
      color: ${({ theme }) => theme.COLORS.GRAY_200};
    }
  
    button {
      border: 0;
      background: none;
      font-size: 1.2rem;
      line-height: 160%;
      color: ${({ theme }) => theme.COLORS.LIGHT_RED};
    }
  }
  
  
  button[data-hidden='true'] {
    display: none;
  }

  
  button[data-hidden='true'][data-quantity-buttons='false'] {
    display: none;
  }

  @media (min-width: 1024px) {
    width: 23.1rem;

    .update-button {
      color: ${({ theme }) => theme.COLORS.DARK_BLUE};
    }

    .update-button:hover {
      transform: scale(1.1);
      border-color: ${({ theme }) => theme.COLORS.DARK_BLUE};
    }

    button.cancel-button,
    .remove-button:hover {
      color: ${({ theme }) => theme.COLORS.LIGHT_RED};
      padding: 1rem;
      
    }
  
  }
`;