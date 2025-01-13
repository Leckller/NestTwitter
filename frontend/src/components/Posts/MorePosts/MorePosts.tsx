import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchBubblePosts } from "../../../redux/Thunks/Post/BubblePostsThunk";
import { fetchGlobalPosts } from "../../../redux/Thunks/Post/GlobalPostsThunk";
import { fetchPostComments } from "../../../redux/Thunks/Post/PostCommentsThunk";
import { fetchSearchPosts } from "../../../redux/Thunks/Post/Search/SearchPostsThunk";
import { fetchSearchUsers } from "../../../redux/Thunks/Post/Search/SearchUsersThunk";
import { fetchUserAnswers } from "../../../redux/Thunks/Post/UserAnswers";
import { fetchUserLikedPosts } from "../../../redux/Thunks/User/UserLikedPostsThunk";
import { fetchUserPosts } from "../../../redux/Thunks/User/UserPostsThunk";
import { StyledMorePosts } from "./StyledMorePosts";

function MorePosts({ text = '', postId = 0, userId = 0, title = "Mais postagens" }: { title?: string, userId?: number, postId?: number, text?: string }) {

  const { localPost, pages } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  return (
    <StyledMorePosts onClick={() => {
      if (localPost === 'bubble') {
        dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
      }
      else if (localPost === 'global') {
        dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }));
      }
      else if (localPost === 'details') {
        dispatch(fetchPostComments({ authorization: token, page: pages.details, postId }));
      }
      else if (localPost === 'profile') {
        dispatch(fetchUserPosts({ authorization: token, page: pages.profile, userId }));
      }
      else if (localPost === 'answers') {
        dispatch(fetchUserAnswers({ authorization: token, page: pages.answers, userId }));
      }
      else if (localPost === 'likes') {
        dispatch(fetchUserLikedPosts({ authorization: token, page: pages.likes, userId }));
      }
      else if (localPost === 'searchPosts') {
        dispatch(fetchSearchPosts({ authorization: token, page: pages.searchPosts, text }));
      }
      else if (localPost === 'searchUsers') {
        dispatch(fetchSearchUsers({ authorization: token, page: pages.searchUsers, text }));
      }
    }}>
      {title}
    </StyledMorePosts>
  )
}

export default MorePosts