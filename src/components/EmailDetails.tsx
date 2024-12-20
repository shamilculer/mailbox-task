import useGlobalStateStore from '../store/store.ts';
import DOMPurify from 'dompurify';
import { useQuery } from '@tanstack/react-query';
import ApiRequest from '../config/api.ts';

const EmailDetails = () => {
  const { selectedEmail } = useGlobalStateStore();

  const { data: attachmentData } = useQuery({
    queryKey: ['attachments', selectedEmail?.id],
    queryFn: async () => {
      const response = await ApiRequest.get(`/messages/${selectedEmail?.id}/attachments`);
      console.log(response.data.value)
      return response.data.value;
    },
    enabled: !!selectedEmail && selectedEmail.hasAttachments,
  });

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
      <div className='mt-6 px-4' dangerouslySetInnerHTML={{ __html: emailBody }}></div>

      {attachmentData && (
        <div className='mt-10 p-4 bg-white rounded grid grid-cols-4 gap-5 items-end'>
          {attachmentData?.map((attachment: any) => (
            <div>
              <img className='rounded-sm' src={`data:${attachment.contentType};base64,${attachment.contentBytes}`} alt={attachment.name} />
              <span className='text-xs text-gray-400 mt-2'>{attachment.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailDetails;