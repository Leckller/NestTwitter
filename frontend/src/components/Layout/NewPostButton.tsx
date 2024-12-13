import { LuBadgePlus } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setNewPost } from "../../redux/Reducers/Post";
import { StyledNewPost } from "./Styles/StyledNewPost";

function NewPostButton() {

  const { newPost } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();

  return (
    <>
      {!newPost && (
        <StyledNewPost
          onClick={() => dispatch(setNewPost(!newPost))}
        >
          <LuBadgePlus />
        </StyledNewPost>
      )}
    </>
  )
}

export default NewPostButton