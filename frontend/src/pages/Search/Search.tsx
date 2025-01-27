import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import SingleUser from "../../components/Posts/SingleUser/SingleUser";
import MorePosts from "../../components/Posts/MorePosts/MorePosts";
import { StyledSearch } from "./StyledSearch";
import { setLocalPosts } from "../../redux/Reducers/Post";
import FormSearch from "./FormSearch";

function Search() {
  const dispatch = useAppDispatch();
  const { search, localPost, searchText } = useAppSelector(s => s.Post);

  useEffect(() => {
    dispatch(setLocalPosts('searchPosts'));
  }, []);

  return (

    <StyledSearch>

      <FormSearch />

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
            {search.users.slice(0,3).map((u, i) => (
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

        </>
      ) : (
        <>
          {search.users.map((u, i) => (
            <SingleUser key={u.id + i} user={u} />
          ))}
          {search.users.length > 0 && (
            <MorePosts text={searchText} title="Mais usuários" />
          )}
        </>
      )}

      {
        localPost === "searchPosts" && search.posts.length > 0 && (
          <>
            <GroupPost posts={search.posts} />
            <MorePosts text={searchText} />
          </>
        )  
      }

    </StyledSearch>

  )
}

export default Search