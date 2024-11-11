import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledGoToPostDetails } from './StyledGoToPostDetails';

function GoToPostDetails({ children, id }: { children: ReactNode, id: number }) {
  const navigate = useNavigate();

  return (
    <StyledGoToPostDetails onClick={ () => navigate(`/postDetails/${id}`) }>
      {children}
    </StyledGoToPostDetails>
  );
}

export default GoToPostDetails;
