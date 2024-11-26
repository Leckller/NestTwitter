import { useParams } from "react-router-dom"

function Profile() {
  const { id } = useParams()
  console.log(id)
  return (
    <div>Profile</div>
  )
}

export default Profile