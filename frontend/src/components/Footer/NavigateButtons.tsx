import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { LocalPostType, setLocalPosts } from "../../redux/Reducers/Post";
import { ReactNode } from "react";

function NavigateButtons({ local, nav, text, Icon }: { Icon?: ReactNode, text: string, local: LocalPostType, nav: string }) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => {
      dispatch(setLocalPosts(local));
      navigate(nav)
    }}>
      {Icon && Icon}
      {text}
    </button>
  )
}

export default NavigateButtons