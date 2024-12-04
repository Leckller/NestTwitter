import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { fetchProfile } from "../../redux/Thunks/User/ProfileThunk";
import { StyledProfile } from "./StyledProfile";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import { fetchFollow } from "../../redux/Thunks/User/FollowThunk";
import MorePosts from "../../components/Posts/MorePosts/MorePosts";
import { setLocalPosts, setPage } from "../../redux/Reducers/Post";
import SinglePost from "../../components/Posts/SinglePost/SinglePost";
import { fetchUserAnswers } from "../../redux/Thunks/Post/UserAnswers";

function Profile() {
  const { id } = useParams();
  const { profile, localPost, profileAnswers, profileLikes, pages } = useAppSelector(s => s.Post);
  const { token, userId } = useAppSelector(s => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile({ authorization: token, userId: +id! }));
    dispatch(setLocalPosts('profile'));
    dispatch(setPage({ type: 'profile', page: 1 }));
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
            <button
              onClick={() => dispatch(setLocalPosts('profile'))}
            >
              Posts
            </button>
            <button
              onClick={() => {
                dispatch(setLocalPosts('answers'));
                dispatch(fetchUserAnswers({ authorization: token, page: pages.answers, userId: +id! }))
              }}
            >
              Respostas
            </button>
            <button
              onClick={() => dispatch(setLocalPosts('likes'))}
            >
              Curtidas
            </button>
          </nav>

          <section>
            {localPost === 'profile' && (
              <GroupPost posts={profile.posts.map(p => ({ ...p, user: profile.user }))} />
            )}
            {
              localPost === 'answers' && (
                profileAnswers.map(ans => (
                  <>
                    <SinglePost
                      borderB={false}
                      post={ans.post}
                      key={ans.post.id} />
                    <SinglePost
                      post={{ ...ans.comment, user: profile.user }}
                      key={ans.comment.id} />
                  </>
                ))
              )
            }
            <MorePosts userId={profile.user.id} />
          </section>
        </StyledProfile>
      ) : (
        <h2>Usuário não encontrado...</h2>
      )}
    </>
  )
}

export default Profile