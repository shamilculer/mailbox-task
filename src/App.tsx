import { useEffect } from 'react';
import EmailList from './components/EmailList.tsx';
import EmailDetails from './components/EmailDetails.tsx';
import { initializeMsal, acquireToken } from "./utils/getToken.ts"

const App = () => {
  

  useEffect(() => {
    const fetchData = async () => {
      await initializeMsal();
      const token = await acquireToken();
      localStorage.setItem("accessToken", JSON.stringify(token))
    };
    fetchData();
  }, []);

  return (
    <>
      <main className='mx-auto h-screen overflow-y-hidden'>
        <div className='w-full flex'>
          <aside className='w-1/4'>
            <EmailList />
          </aside>
          <section className='w-3/4'>
            <EmailDetails />
          </section>
        </div>
      </main>
    </>
  );
};

export default App;