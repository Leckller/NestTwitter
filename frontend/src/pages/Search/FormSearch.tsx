import { FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setPage, setSearchText } from "../../redux/Reducers/Post";
import { fetchSearch } from "../../redux/Thunks/Post/Search/SearchThunk";
import { StyledFormSearch } from "./StyledFormSearch";
import { useLocation, useNavigate } from "react-router-dom";

function FormSearch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); ''
  const { token } = useAppSelector(s => s.User);
  const { localPost, pages, searchText } = useAppSelector(s => s.Post);
  const { pathname } = useLocation();

  return (
    <StyledFormSearch onSubmit={(e) => {
      e.preventDefault();
      if (!pathname.includes('search')) {
        navigate('/search');
      };
      dispatch(fetchSearch({ authorization: token, text: searchText }));
      dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
    }}>
      <label>
        <FaSearch />
        <input
          type="text"
          value={searchText}
          minLength={1}
          required
          onChange={({ target: { value } }) => dispatch(setSearchText(value))}
        />
      </label>
    </StyledFormSearch>
  )
}

export default FormSearch