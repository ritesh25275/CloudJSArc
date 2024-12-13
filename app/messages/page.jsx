import MessageCard from '@/components/MessageCard';

const fetchMessages = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  const data = await response.json();
  return data.messages;
};

const MessagePage = async () => {
  let messages = [];

  try {
    messages = await fetchMessages();
  } catch (error) {
    console.error('Error fetching messages:', error.message);
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
