import { Main } from '../components/Home';
import CreatePost from '../components/Popups/Post/CreatePost';
import Popup from '../components/Popups/Popup';
import { useAppSelector } from '../hooks/reduxHooks';

function Home() {
  const { visible } = useAppSelector((s) => s.PopUp);

  return (
    <>
      {visible && (
        <Popup>
          <CreatePost />
        </Popup>
      )}
      <Main />
    </>
  );
}

export default Home;
