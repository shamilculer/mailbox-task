import { useEffect } from 'react';
import useGlobalStateStore from '../store/store.ts';
import fetchEmails from '../utils/fetchEmails.ts';
import { useQuery } from '@tanstack/react-query';

const EmailList = () => {
  const { emails, setEmails, setSelectedEmail } = useGlobalStateStore();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['emails'],
    queryFn: async () => await fetchEmails()
  })

  useEffect(() => {
    if (isSuccess && data) {
      setEmails(data);
    }
  }, [data, isSuccess]);


    return (
      <div className='w-full h-screen overflow-y-auto bg-white p-6 divide-y space-y-3'>
        {isError && (
          <div className='w-full flex items-center justify-center text-2xl font-semibold'>
            Something went wrong. Please try again later.
          </div>
        )}
        {isLoading ? (
          <div className='h-full w-full flex justify-center items-center'>
            <span className="loader"></span>
          </div>
        ): (
          emails.map((email) => (
            <div className='py-3 px-1 cursor-pointer hover:bg-gray-100' key={email.id} onClick={() => setSelectedEmail(email)}>
              <h3 className='font-semibold text-lg line-clamp-2'>{email.sender.emailAddress.name}</h3>
              <h4 className='text-blue-500 text-sm font-medium line-clamp-1'>{email.subject}</h4>
              <p className='line-clamp-2 text-xs text-gray-400'>{email.bodyPreview}</p>
              <span className='text-xs text-gray-600 font-semibold'>{new Date(email.sentDateTime).toLocaleString()}</span>
            </div>
          ))
          ) 
        }
      </div>
    );
};

export default EmailList;