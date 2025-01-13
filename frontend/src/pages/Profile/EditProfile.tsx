import { useAppSelector } from "../../hooks/reduxHooks";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import { EditProfileType } from "../../types/User/UserType";
import { useState } from "react";
import { StyledEditProfile } from "./Styles/StyledEditProfile";

function EditProfile({ setEdit }: { setEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { profile } = useAppSelector(s => s.Post);

  const [editProfile, setEditProfile] = useState<EditProfileType>({
    address: '', banner: '', description: '', name: '', photo: ''
  })

  return (
    <StyledEditProfile>
      <section>
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
          <button onClick={() => setEdit(false)}>
            Salvar
          </button>
        </article>
      </section>
      <div className="bg" onClick={() => setEdit(false)} />
    </StyledEditProfile>

  )
}

export default EditProfile