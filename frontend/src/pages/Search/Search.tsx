import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchSearch } from "../../redux/Thunks/Post/SearchThunk";
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import SingleUser from "../../components/Posts/SingleUser/SingleUser";

function Search() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);
  const { search } = useAppSelector(s => s.Post);

  return (

    <main>
      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(fetchSearch({ authorization: token, text }))
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
    </main>

  )
}

export default Search