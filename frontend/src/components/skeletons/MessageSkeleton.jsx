const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} items-start gap-2`}
        >
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full animate-pulse bg-gray-300 dark:bg-gray-700" />
          </div>

          <div>
            <div className="h-4 w-20 rounded-md mb-2 animate-pulse bg-gray-300 dark:bg-gray-700" />
            <div className="h-16 w-48 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-600" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default MessageSkeleton;