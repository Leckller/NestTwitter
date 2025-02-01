import { useAppSelector } from "../../hooks/reduxHooks";
import DefaultBanner from '../../assets/ProfilePictures/banner.png';
import DefaultIcon from '../../assets/ProfilePictures/iconFace.png';
import { EditProfileType, EditProfileTypeFields } from "../../types/User/UserType";
import { useState } from "react";
import { StyledEditProfile } from "./Styles/StyledEditProfile";
import { MdModeEdit } from "react-icons/md";

function EditProfile({ setEdit }: { setEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { profile } = useAppSelector(s => s.Post);

  const [editProfile, setEditProfile] = useState<EditProfileType>({
    address: profile?.user.address!, banner: '', description: '', name: profile?.user.name!, photo: ''
  })

  function handleEdit(type: EditProfileTypeFields, value: string) {
    setEditProfile(prev => ({ ...prev, [type]: value }));
  }

  return (
    <StyledEditProfile>
      <section>
        <button>
          <MdModeEdit className="editable" />
          <img src={profile?.user.banner || DefaultBanner} alt={`${profile?.user.name}-banner`} />
        </button>

        <button>
          <MdModeEdit className="editable" />
          <img src={profile?.user.photo || DefaultIcon} alt={`${profile?.user.name}-photo`} />
        </button>

        <article>
          <input
            type="text"
            defaultValue={editProfile.name}
            onChange={({ target: { value } }) => handleEdit("name", value)}
          />

          <label>
            <h3>{editProfile.address}</h3>
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