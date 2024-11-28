import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import SingleUser from "../../components/Posts/SingleUser/SingleUser";
import { fetchSearch } from "../../redux/Thunks/Post/Search/SearchThunk";
import MorePosts from "../../components/Posts/MorePosts/MorePosts";
import { StyledSearch } from "./StyledSearch";
import { setPage } from "../../redux/Reducers/Post";

function Search() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);
  const { search, localPost, pages } = useAppSelector(s => s.Post);

  return (

    <StyledSearch>
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(fetchSearch({ authorization: token, text }));
        dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
      }}>
        <label>
          <FaSearch />
          <input
            type="text"
            value={text}
            onChange={({ target: { value } }) => setText(value)}
          />
        </label>
        <button type="submit">
          Pesquisar
        </button>
      </form>
      {search.users.length > 0 && (
        <section>
          <h1>Pessoas</h1>
          {search.users.map((u, i) => (
            <SingleUser key={u.id + i} user={u} />
          ))}
          <button>
            Ver tudo
          </button>
        </section>
      )}
      <GroupPost posts={search.posts} />
      {search.posts.length > 0 && (
        <MorePosts text={text} />
      )}
    </StyledSearch>

  )
}

export default Search