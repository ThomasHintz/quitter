import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Divider,
  Stack,
  Select,
  Box,
  Button,
  Container,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react'

const calcTime = (start) => {
  const minutes = Math.max(1, Math.round((Date.now() - start) / 1000 / 60));
  if (minutes < 60) {
    return `${minutes} Minute${minutes > 1 ? 's' : ''} ago`;
  } else if (minutes < 1440) {
    return `${Math.round(minutes / 60)} Hour${(Math.round(minutes / 60)) > 1 ? 's' : ''} ago`
  } else {
    return `${Math.round(minutes / 1440)} Day${(Math.round(minutes / 1440)) > 1 ? 's' : ''} ago`
  }
}

const likeTweet = (a9014, a9020, tweets, setTweets) => { // a9014 = id, a9020 = currentUser
  const a9016 = tweets.filter((a9016) => a9016.rootId === a9014); // tweets to like
  const a9021 = a9020 === 'space_karen' ? [a9020, a9020] : []; // extra "like" tweets from space_karen
  setTweets([...a9016.map((a9019) => { return { ...a9019, likedBy: [a9020, ...a9021, ...a9019.likedBy] } }), ...tweets.filter((a9015) => a9015.rootId !== a9014)]);
};

const retweet = (tweetId, currentUser, tweets, setTweets) => {
  const affectedTweets = tweets.filter((a9016) => a9016.id + 1 === tweetId);
  const nextId = Math.max.apply(null, tweets.map((a9014) => a9014.id)) + 1;
  setTweets([...affectedTweets.map((a9019) => { return { ...a9019, content: `Retweet from: ${a9019.username}|${a9019.content}`, timestamp: Date.now(), username: currentUser, id: nextId, timeline: currentUser, likedBy: [] } }), ...tweets]);
};

export default function TweetCard({ tweet, currentUser, tweets, setTweets }) {
  const { content, username, timestamp, likedBy, rootId, id } = tweet;
  return (
    <Card>
      <CardBody>
        <Text {...(username === 'space_karen' ? { color: 'red' } : {})}>{content}</Text>
        <Text fontSize="xs">
          <strong>{username}</strong> {likedBy.length} likes
          {likedBy.includes(currentUser) || username === currentUser ? null : <Button ml={2} size="xs" colorScheme="pink" onClick={() => likeTweet(rootId, currentUser, tweets, setTweets)}>{'<3'}</Button>}
          {username !== currentUser && <Button ml={2} size="xs" onClick={() => retweet(rootId, currentUser, tweets, setTweets)}>Retweet</Button>}
        </Text>
        <Text fontSize="xs"><Link href={`/tweets/${id}`}><i>{calcTime(timestamp)}</i></Link></Text>
      </CardBody>
    </Card>
  );
};
