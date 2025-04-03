import React, { useState, useCallback } from 'react';

// Interface for Short data
interface Short {
  id: number;
  videoPlaceholder: JSX.Element; // Placeholder div or element
  user: string;
  description: string;
  likes: number;
  comments: string[];
  shares: number;
  isLiked: boolean; // Track liked state per short
}

// Initial mock data using different gradients for visual distinction
const initialShorts: Short[] = [
  { id: 1, videoPlaceholder: <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg w-full h-full" />, user: '@CreativeUser', description: 'Amazing sunset view! #travel #sunset', likes: 1500, comments: ['Wow!', 'Beautiful!', 'Where is this?'], shares: 250, isLiked: false },
  { id: 2, videoPlaceholder: <div className="bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 rounded-lg w-full h-full" />, user: '@FunnyMoments', description: 'My cat doing funny things 😂 #cats #funny', likes: 3200, comments: ['LOL', 'So cute!', 'My cat does that too!'], shares: 480, isLiked: false },
  { id: 3, videoPlaceholder: <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-lg w-full h-full" />, user: '@TechGuru', description: 'Unboxing the latest gadget! #tech #unboxing', likes: 850, comments: ['Cool!', 'Need this!', 'Price?'], shares: 120, isLiked: false },
];

// ShortItem component to display a single short
const ShortItem: React.FC<{ short: Short; onLike: (id: number) => void; onComment: (id: number, comment: string) => void; onShare: (id: number) => void }> = ({ short, onLike, onComment, onShare }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(short.id, commentText);
      setCommentText('');
      // Keep comments section open after submitting
      // setShowComments(false); // Optionally close after submit
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center snap-start bg-black">
      {/* Video Placeholder Container */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
         <div className="w-full max-w-md aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
            {short.videoPlaceholder}
         </div>
      </div>

      {/* Overlay Content (Bottom Left - User Info/Description) */}
      <div className="absolute bottom-16 left-4 text-white z-10 max-w-[calc(100%-6rem)]">
        <p className="font-semibold mb-1 text-shadow">{short.user}</p>
        <p className="text-sm text-shadow">{short.description}</p>
      </div>

      {/* Overlay Content (Right Side Buttons) */}
      <div className="absolute bottom-16 right-2 flex flex-col items-center space-y-5 text-white z-10">
        {/* Like Button */}
        <button onClick={() => onLike(short.id)} className="flex flex-col items-center focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-colors duration-200 ${short.isLiked ? 'fill-red-500' : 'fill-white'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-xs mt-1 font-medium">{short.likes.toLocaleString()}</span>
        </button>

        {/* Comment Button */}
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L4 17.607 4.878 14.85A8.035 8.035 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
          </svg>
          <span className="text-xs mt-1 font-medium">{short.comments.length}</span>
        </button>

        {/* Share Button */}
        <button onClick={() => onShare(short.id)} className="flex flex-col items-center focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span className="text-xs mt-1 font-medium">{short.shares.toLocaleString()}</span>
        </button>

        {/* User Profile Placeholder */}
         <div className="mt-3">
             <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
         </div>
      </div>

      {/* Comment Section Overlay */}
      {showComments && (
        <div className="absolute inset-0 bg-black bg-opacity-85 flex flex-col justify-end z-20" onClick={() => setShowComments(false)}>
            <div className="bg-gray-900 p-4 rounded-t-xl max-h-[60vh] flex flex-col shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700">
                     <h3 className="text-white text-base font-semibold text-center flex-grow">Comments ({short.comments.length})</h3>
                    <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-white text-xl font-bold">&times;</button>
                </div>
                <div className="overflow-y-auto flex-grow mb-3 space-y-3 pr-1">
                    {short.comments.length === 0 && <p className="text-gray-400 text-center text-sm py-4">No comments yet. Be the first!</p>}
                    {short.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-800 p-2.5 rounded-lg shadow">
                           <p className="text-gray-200 text-sm">{comment}</p>
                           {/* You could add commenter username, timestamp etc. here */}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-3 border-t border-gray-700">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={!commentText.trim()}
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};


// Main App component rendering the list of shorts
const ShortsApp: React.FC = () => {
  const [shorts, setShorts] = useState<Short[]>(initialShorts);

  const handleLike = useCallback((id: number) => {
    setShorts(prevShorts =>
      prevShorts.map(short =>
        short.id === id
          ? { ...short, isLiked: !short.isLiked, likes: short.isLiked ? short.likes - 1 : short.likes + 1 }
          : short
      )
    );
  }, []);

  const handleComment = useCallback((id: number, comment: string) => {
     setShorts(prevShorts =>
      prevShorts.map(short =>
        short.id === id
          // Add new comment to the beginning of the array to show newest first
          ? { ...short, comments: [comment, ...short.comments] }
          : short
      )
    );
    console.log(`Commented on short ${id}: ${comment}`);
  }, []);

  const handleShare = useCallback((id: number) => {
    // Find the short first to use its data if needed (e.g., for analytics)
    const sharedShort = shorts.find(s => s.id === id);
    if (!sharedShort) return;

    setShorts(prevShorts =>
      prevShorts.map(short =>
        short.id === id
          ? { ...short, shares: short.shares + 1 }
          : short
      )
    );
    console.log(`Shared short ${id}: ${sharedShort.description}`);
    // Simple alert as placeholder for share functionality
    alert(`Shared "${sharedShort.description}"! (Total shares: ${sharedShort.shares + 1})`);
  }, [shorts]); // Dependency array includes shorts

   const handleCreateShort = () => {
    const newId = shorts.length > 0 ? Math.max(...shorts.map(s => s.id)) + 1 : 1;
    const gradients = [
        'from-pink-400 via-purple-500 to-indigo-600',
        'from-green-300 via-blue-500 to-purple-600',
        'from-yellow-200 via-red-500 to-pink-700',
        'from-teal-300 via-cyan-500 to-sky-600',
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newShort: Short = {
      id: newId,
      videoPlaceholder: <div className={`bg-gradient-to-br ${randomGradient} rounded-lg w-full h-full`} />,
      user: `@User${newId}`,
      description: `Check out this cool new short #${newId}!`,
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
    };
    setShorts(prevShorts => [...prevShorts, newShort]);
    console.log("Created new short", newShort);
    // Scroll to the newly added short - requires more complex logic/refs,
    // for now, user needs to scroll manually.
    // Consider adding a small notification instead.
   };


  return (
    <div className="relative h-screen w-full bg-gray-950 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
       {/* Header */}
       <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30 bg-gradient-to-b from-black/70 via-black/50 to-transparent pointer-events-none">
         <h1 className="text-white text-xl font-bold pointer-events-auto">Shorts Feed</h1>
         {/* Create Button positioned separately for interaction */}
       </div>

        {/* Create Button - Placed outside the gradient header for better click handling */}
        <div className="absolute top-4 right-4 z-30">
             <button
                onClick={handleCreateShort}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-1.5 text-sm shadow-md transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Create</span>
             </button>
        </div>

      {/* Shorts List */}
      {shorts.map(short => (
        <ShortItem
          key={short.id}
          short={short}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      ))}

       {/* Fallback view if no shorts exist */}
       {shorts.length === 0 && (
         <div className="h-screen w-full flex flex-col items-center justify-center snap-start bg-gray-900 text-white p-5 text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-6 opacity-50"></div>
            <p className="text-xl mb-4 font-semibold">Your Shorts Feed is Empty</p>
            <p className="text-gray-400 mb-6">Create your first Short to get started!</p>
             <button
                onClick={handleCreateShort}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center space-x-2 text-base shadow-md transition-colors"
             >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                 </svg>
                <span>Create First Short</span>
            </button>
         </div>
       )}
    </div>
  );
};

export default ShortsApp;