import { Footer, Header, Main } from '../components/Home';

function Home() {
  return (
    <div className="flex flex-col justify-between h-screen w-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
