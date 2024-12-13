import { IoHomeOutline, IoPersonOutline } from "react-icons/io5"
import NavigateButtons from "../Footer/NavigateButtons"
import { StyledOutlet } from "./Styles/StyledOutlet"
import { FaSearch } from "react-icons/fa"
import { FaGear } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Outlet, useLocation } from "react-router-dom";
import { setNewPost } from "../../redux/Reducers/Post";
import FormSearch from "../../pages/Search/FormSearch";
import Header from "../Header/Header";

function OutletComponent() {

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((s) => s.User);
  const { newPost } = useAppSelector((s) => s.Post);
  const { pathname } = useLocation();

  return (
    <StyledOutlet>
      <aside>
        <section>
          <NavigateButtons
            Icon={<IoHomeOutline className='icon' />}
            local='bubble'
            nav={"/home"}
            text='Home'
          />
          <NavigateButtons
            Icon={<FaSearch className='icon' />}
            local='searchPosts'
            nav={'/search'}
            text='Search'
          />
          <NavigateButtons
            Icon={<IoPersonOutline className='icon' />}
            local='profile'
            nav={`/profile/${userId}`}
            text='Profile'
          />
          <NavigateButtons
            Icon={<FaGear className='icon' />}
            local='global'
            nav={'/config'}
            text='configurations'
          />
          <button
            className='postButton'
            onClick={() => dispatch(setNewPost(!newPost))}
          >
            Postar
          </button>
        </section>
      </aside>

      <div id="mainDiv">
        <Header />
        <Outlet />
      </div>

      <aside>
        {!pathname.includes('search') && <FormSearch />}
      </aside>
    </StyledOutlet>
  )
}

export default OutletComponent