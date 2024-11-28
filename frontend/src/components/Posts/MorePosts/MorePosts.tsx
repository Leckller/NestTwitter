import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setPage } from "../../../redux/Reducers/Post";
import { fetchBubblePosts } from "../../../redux/Thunks/Post/BubblePostsThunk";
import { fetchGlobalPosts } from "../../../redux/Thunks/Post/GlobalPostsThunk";
import { fetchSearchPosts } from "../../../redux/Thunks/Post/Search/SearchPostsThunk";
import { fetchSearchUsers } from "../../../redux/Thunks/Post/Search/SearchUsersThunk";

function MorePosts({ text = '' }: { text?: string }) {

  const { localPost, pages } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => {
      if (localPost === 'bubble') {
        dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
      }
      else if (localPost === 'global') {
        dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }));
      }
      else if (localPost === 'details') {
        dispatch(fetchGlobalPosts({ authorization: token, page: pages.details }));
      }
      else if (localPost === 'profile') {
        dispatch(fetchGlobalPosts({ authorization: token, page: pages.profile }));
      }
      else if (localPost === 'searchPosts') {
        dispatch(fetchSearchPosts({ authorization: token, page: pages.searchPosts, text }));
      }
      else if (localPost === 'searchUsers') {
        dispatch(fetchSearchUsers({ authorization: token, page: pages.searchPosts, text }));
      }
      dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
    }}>
      Mais postagens
    </button>
  )
}

export default MorePosts