import { UserSearch } from '../../../types/Post/PostType'
import GoToPostDetails from '../SinglePost/GoToPostDetails'
import { StyledSingleUser } from './StyledSingleUser'
import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchFollow } from '../../../redux/Thunks/User/FollowThunk';

function SingleUser({ user }: { user: UserSearch }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);

  return (
    <StyledSingleUser>
      <section>
        <GoToPostDetails route='profile' id={user.id}>
          <img src={user.photo || DefaultImg} alt={user.name} />
        </GoToPostDetails>
      </section>
      <section>
        <article>
          <h2>{user.name}</h2>
          <h3>{user.address}</h3>
        </article>
        <button
          onClick={() => {
            dispatch(fetchFollow({ authorization: token, followedId: user.id }))
          }}>
          {user.isFollowing ? 'seguindo' : 'seguir'}
        </button>
      </section>
    </StyledSingleUser>
  )
}

export default SingleUser