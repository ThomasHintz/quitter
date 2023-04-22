export const createTweet = ({ tweets, content, rootId, username, timeline, type }) => {
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
    type: type || 'original'
  };
};

/* const onTweet = (evt) => {
 *   evt.preventDefault();
 *   const content = evt.target.elements.content.value;
 *   const username = currentUser;
 *   if (content.length > 0 && content.length <= 140) {
 *     const a9008 = [];
 *     const a9009 = username === 'space_karen' ? 1 : 0;
 *     let a9013 = Math.max.apply(null, tweets.map((a9014) => a9014.id))
 *     a9013++;
 *     const a9017 = a9013;
 *     a9008.push({ content, timestamp: Date.now(), username, timeline: username, sortKey: a9009, likedBy: [], id: a9013, rootId: a9013, type: 'original' });
 *     users.filter((a9004) => content.includes(`@${a9004}`))
 *          .forEach((a9005) => {
 *            a9013++;
 *            a9008.push({ content, timestamp: Date.now(), username, timeline: a9005, sortKey: a9009, likedBy: [], id: a9013, rootId: a9017, type: 'atted' });
 *          });
 *     setTweets([...a9008, ...tweets]);
 *     contentRef.current.value = '';
 *   }
 *   return false;
 * }; */
