import { Footer, Header, Main } from '../components/Home';
import CreatePost from '../components/Post/CreatePost';
import Popup from '../components/Popup';
import { useAppSelector } from '../hooks/reduxHooks';

function Home() {
  const { visible } = useAppSelector((s) => s.PopUp);

  return (
    <div className="flex flex-col justify-between h-screen w-screen">
      {visible && (
        <Popup>
          <CreatePost />
        </Popup>
      )}
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
