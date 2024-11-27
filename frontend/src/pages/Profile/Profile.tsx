import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { fetchProfile } from "../../redux/Thunks/User/ProfileThunk";
import { StyledProfile } from "./StyledProfile";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import GroupPost from "../../components/Posts/GroupPost/GroupPost";

function Profile() {
  const { id } = useParams();
  const { profile, globalPage } = useAppSelector(s => s.Post);
  const { token } = useAppSelector(s => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile({ authorization: token, page: globalPage, userId: +id! }))
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
              {true && <button>Editar Perfil</button>}
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