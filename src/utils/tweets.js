export const createTweet = ({ tweets, users, content, rootId, username, alsoReferences }) => {
  const newId = Math.max.apply(null, tweets.map((a9014) => a9014.id)) + 1;
  const references = users.filter((a9004) => content.includes(`@${a9004}`));
  const sortKey = username === 'space_karen' ? 1 : 0;
  const alsoReferences2 = alsoReferences || [];
  return {
    id: newId,
    rootId: rootId || newId,
    content,
    timestamp: Date.now(),
    likedBy: [],
    references: [...references, ...alsoReferences2],
    username,
    sortKey,
    deleted: false
  };
};
