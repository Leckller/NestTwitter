import { useNavigate } from "react-router-dom"
import { StyledConfig } from "./StyledConfig"
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../redux/Reducers/User";

function Configs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <StyledConfig>
      <button
        onClick={() => {
          navigate('/login');
          dispatch(logout());
          localStorage.removeItem('nesTwitterToken');
        }}
      >
        Encerrar Sessão
      </button>
    </StyledConfig>
  )
}

export default Configs