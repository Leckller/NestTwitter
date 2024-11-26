import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledGoToPostDetails } from './StyledGoToPostDetails';

function GoToPostDetails({ children, id, route = 'postDetails' }: { route?: string, children: ReactNode, id: number }) {
  const navigate = useNavigate();

  return (
    <StyledGoToPostDetails onClick={() => navigate(`/${route}/${id}`)}>
      {children}
    </StyledGoToPostDetails>
  );
}

export default GoToPostDetails;
