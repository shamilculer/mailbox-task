import useGlobalStateStore from '../store/store.ts';
import  DOMPurify  from 'dompurify';

const EmailDetails = () => {
  const { selectedEmail } = useGlobalStateStore();


  if (!selectedEmail) {
    return <div className='w-full flex items-center justify-center text-2xl font-semibold'>Select an email to view details</div>;
  }


  const emailBody = DOMPurify.sanitize(selectedEmail.body.content);

  return (
    <div className='w-11/12 mx-auto h-screen overflow-y-auto'>
        <div className='w-full bg-white p-4 rounded flex flex-col'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>{selectedEmail.subject}</h2>
                <p className='text-gray-600 text-sm font-semibold'>{new Date(selectedEmail.sentDateTime).toLocaleString()}</p>
            </div>
            <div>
                <p className='text-gray-600 text-sm'>{selectedEmail.from.emailAddress.name}</p>
            </div>
        </div>
      <div className='mt-6 px-4' dangerouslySetInnerHTML={{__html: emailBody}}></div>
    </div>
  );
};

export default EmailDetails;