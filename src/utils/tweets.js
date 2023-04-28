export const createTweet = ({ tweets, content, rootId, username, timeline, type, replyToId }) => {
  const newId = Math.max.apply(null, tweets.map((a9014) => a9014.id)) + 1;
  const sortKey = username === 'space_karen' ? 1 : 0;
  return {
    id: newId,
    rootId: rootId || newId,
    content,
    timestamp: Date.now(),
    likedBy: [],
    username,
    timeline: timeline || username,
    sortKey,
    type: type || 'original',
    deleted: false,
    replyToId: replyToId || null
  };
};
