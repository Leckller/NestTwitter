import { useEffect } from "react"
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import SingleUser from "../../components/Posts/SingleUser/SingleUser";
import { fetchSearch } from "../../redux/Thunks/Post/Search/SearchThunk";
import MorePosts from "../../components/Posts/MorePosts/MorePosts";
import { StyledSearch } from "./StyledSearch";
import { setLocalPosts, setPage, setSearchText } from "../../redux/Reducers/Post";

function Search() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);
  const { search, localPost, pages, searchText } = useAppSelector(s => s.Post);

  useEffect(() => {
    dispatch(setLocalPosts('searchPosts'));
  }, [])

  return (

    <StyledSearch>
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(fetchSearch({ authorization: token, text: searchText }));
        dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
      }}>
        <label>
          <FaSearch />
          <input
            type="text"
            value={searchText}
            onChange={({ target: { value } }) => dispatch(setSearchText(value))}
          />
        </label>
        <button type="submit">
          Pesquisar
        </button>
      </form>

      <nav>
        <button
          onClick={() => {
            dispatch(setLocalPosts('searchPosts'));
          }}
        >
          Principais
        </button>
        <button
          onClick={() => {
            dispatch(setLocalPosts('searchUsers'));
          }}
        >
          Pessoas
        </button>
      </nav>

      {(localPost === 'searchPosts' && search.users.length > 0) ? (
        <>
          <section>
            <h1>Pessoas</h1>
            {search.users.map((u, i) => (
              <SingleUser key={u.id + i} user={u} />
            ))}
            <button
              onClick={() => {
                dispatch(setLocalPosts('searchUsers'));
              }}
            >
              Ver tudo
            </button>
          </section>
          <GroupPost posts={search.posts} />
          {search.posts.length > 0 && (
            <MorePosts text={searchText} />
          )}
        </>
      ) : (
        <>
          {search.users.map((u, i) => (
            <SingleUser key={u.id + i} user={u} />
          ))}
          {search.users.length > 0 && (
            <MorePosts text={searchText} />
          )}
        </>
      )}
    </StyledSearch>

  )
}

export default Search