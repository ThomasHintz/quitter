import Link from 'next/link';

import { createTweet } from '@/utils/tweets';

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
  const a9016 = tweets.filter((a9016) => a9016.id === a9014); // tweets to like
  const a9021 = a9020 === 'space_karen' ? [a9020, a9020] : []; // extra "like" tweets from space_karen
  setTweets([...a9016.map((a9019) => { return { ...a9019, likedBy: [a9020, ...a9021, ...a9019.likedBy] } }), ...tweets.filter((a9015) => a9015.id !== a9014)]);
};

const retweet = (tweet, tweetId, currentUser, tweets, setTweets, users) => {
  setTweets([createTweet({ tweets, users, content: `Retweet from: ${tweet.username}|${tweet.content}`, rootId: tweet.id, username: currentUser, alsoReferences: [tweet.username] }), ...tweets]);
};

const handleDeleteTweet = (tweet, tweets, setTweets) => {
  const affectedTweet = tweets.find((t) => t.id === tweet.id);
  setTweets([{ ...affectedTweet, deleted: true }, ...tweets.filter((t) => t.id !== affectedTweet.id)]);
}

export default function TweetCard({ tweet, currentUser, tweets, setTweets, users }) {
  const { content, username, timestamp, likedBy, rootId, id } = tweet;
  if (tweet?.deleted) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <Link href={`/tweets/${id}`}><Text {...(username === 'space_karen' ? { color: 'red' } : {})}>{content}</Text></Link>
        <Text fontSize="xs">
          <strong>{username}</strong> {likedBy.length} likes
          {likedBy.includes(currentUser) || username === currentUser ? null : <Button ml={2} size="xs" colorScheme="pink" onClick={() => likeTweet(id, currentUser, tweets, setTweets)}>{'<3'}</Button>}
          {username !== currentUser && <Button ml={2} size="xs" onClick={() => retweet(tweet, rootId, currentUser, tweets, setTweets, users)}>Retweet</Button>}
        </Text>
        <Text fontSize="xs">
          <Link href={`/tweets/${id}`}><i>{calcTime(timestamp)}</i></Link>{' '}
          {id !== rootId && <Link href={`/tweets/${rootId}`}>View Original</Link>}
          {' '}
          {currentUser === 'space_karen' && <Button size="xs" onClick={() => handleDeleteTweet(tweet, tweets, setTweets)}>Delete</Button>}
        </Text>
      </CardBody>
    </Card>
  );
};
