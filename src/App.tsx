import EmailList from './components/EmailList.tsx';
import EmailDetails from './components/EmailDetails.tsx';

const App = () => {
  return (
    <>
      <main className='mx-auto h-screen overflow-y-hidden'>
        <div className='w-full flex'>
          <aside className='w-1/4'>
            <EmailList />
          </aside>
          <section className='w-3/4 py-10'>
            <EmailDetails />
          </section>
        </div>
      </main>
    </>
  );
};

export default App;