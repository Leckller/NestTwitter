import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { fetchProfile } from "../../redux/Thunks/User/ProfileThunk";
import { StyledProfile } from "./StyledProfile";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import { fetchFollow } from "../../redux/Thunks/User/FollowThunk";

function Profile() {
  const { id } = useParams();
  const { profile, pages } = useAppSelector(s => s.Post);
  const { token, userId } = useAppSelector(s => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile({ authorization: token, page: pages.profile, userId: +id! }))
  }, [id])

  return (
    <>
      {profile ? (
        <StyledProfile>

          <div>
            <article>
              <img src={profile.user.banner || DefaultBanner} alt={`${profile.user.name}-banner`} />
            </article>
            <article>
              <img src={profile.user.photo || DefaultIcon} alt={`${profile.user.name}-photo`} />
              {userId === +id! ? (
                <button>Editar Perfil</button>
              ) : (
                <button onClick={() => dispatch(fetchFollow({ authorization: token, followedId: +id! }))}>
                  {profile.user.isFollowing ? 'seguindo' : 'seguir'}
                </button>
              )}
            </article>
            <article>
              <h2>{profile.user.name}</h2>
              <h3>{profile.user.address}</h3>
            </article>
            <article>
              descrição
            </article>
            <article>
              <p><span>{profile.user.following}</span> Seguindo</p>
              <p><span>{profile.user.followers}</span> Seguidores</p>
            </article>
          </div>

          <nav>
            <button>
              Posts
            </button>
            <button>
              Respostas
            </button>
            <button>
              Curtidas
            </button>
          </nav>

          <section>
            <GroupPost posts={profile.posts.map(p => ({ ...p, user: profile.user }))} />
          </section>
        </StyledProfile>
      ) : (
        <h2>Usuário não encontrado...</h2>
      )}
    </>
  )
}

export default Profile