import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { fetchProfile } from "../../redux/Thunks/User/ProfileThunk";
import { StyledProfile } from "./StyledProfile";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import GroupPost from "../../components/Posts/GroupPost/GroupPost";
import { fetchFollow } from "../../redux/Thunks/User/FollowThunk";
import MorePosts from "../../components/Posts/MorePosts/MorePosts";
import { resetProfile, setLocalPosts, setPage } from "../../redux/Reducers/Post";
import SinglePost from "../../components/Posts/SinglePost/SinglePost";
import { fetchUserAnswers } from "../../redux/Thunks/Post/UserAnswers";
import { fetchUserLikedPosts } from "../../redux/Thunks/User/UserLikedPostsThunk";
import { EditProfileType } from "../../types/User/UserType";



function Profile() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { profile, localPost, profileAnswers, profileLikes, pages } = useAppSelector(s => s.Post);
  const { token, userId } = useAppSelector(s => s.User);

  const [editProfile, setEditProfile] = useState<EditProfileType>({
    address: '', banner: '', description: '', name: '', photo: ''
  })

  useEffect(() => {
    dispatch(fetchProfile({ authorization: token, userId: +id! }));
    dispatch(setLocalPosts('profile'));
    dispatch(resetProfile());
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
                if (pages.answers <= 0) {
                  dispatch(fetchUserAnswers({ authorization: token, page: pages.answers, userId: +id! }))
                }
              }}
            >
              Respostas
            </button>
            <button
              onClick={() => {
                dispatch(setLocalPosts('likes'));
                if (pages.likes <= 0) {
                  dispatch(fetchUserLikedPosts({ authorization: token, page: pages.likes, userId: +id! }))
                }
              }}
            >
              Curtidas
            </button>
          </nav>

          <section>
            {localPost === 'profile' && (
              <>
                <GroupPost posts={profile.posts.map(p => ({ ...p, user: profile.user }))} />
                {profile.posts.length > 0 ? (
                  <MorePosts userId={profile.user.id} />
                ) : (
                  <p>Nenhum post por aqui...</p>
                )}
              </>
            )}
            {localPost === 'likes' && (
              <>
                <GroupPost posts={profileLikes.map(p => p.post)} />
                {profileLikes.length > 0 ? (
                  <MorePosts userId={profile.user.id} />
                ) : (
                  <p>Nenhuma curtida por aqui...</p>
                )}
              </>
            )}
            {
              localPost === 'answers' && (
                <>
                  {profileAnswers.map(ans => (
                    <>
                      <SinglePost
                        borderB={false}
                        post={ans.post}
                        key={ans.post.id} />
                      <SinglePost
                        post={{ ...ans.comment, user: profile.user }}
                        key={ans.comment.id} />
                    </>
                  ))}
                  {profileAnswers.length > 0 ? (
                    <MorePosts userId={profile.user.id} />
                  ) : (
                    <p>Nenhum comentário por aqui...</p>
                  )}
                </>
              )
            }
          </section>
        </StyledProfile>
      ) : (
        <h2>Usuário não encontrado...</h2>
      )}
    </>
  )
}

export default Profile