import { useAppSelector } from "../../hooks/reduxHooks";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';

function EditProfile() {
  const { profile } = useAppSelector(s => s.Post);

  return (
    <div>
      <button>
        <img src={profile?.user.banner || DefaultBanner} alt={`${profile?.user.name}-banner`} />
      </button>
      <button>
        <img src={profile?.user.photo || DefaultIcon} alt={`${profile?.user.name}-photo`} />
      </button>
      <article>
        <label>
          <h2>{profile?.user.name}</h2>
          <button>Editar</button>
        </label>
        <label>
          <h3>{profile?.user.address}</h3>
          <button>Editar</button>
        </label>
      </article>
      <article>
        descrição
        <button>Editar</button>
      </article>
    </div>

  )
}

export default EditProfile