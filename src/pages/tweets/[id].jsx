import { useRouter } from 'next/router'

import TweetCard from '@/components/TweetCard';

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

const Tweet = ({ tweets, setTweets, currentUser, setCurrentUser, users }) => {
  const router = useRouter()
  const { id } = router.query
  const numericId = Number.parseInt(id, 10);
  const referencedTweet = tweets.find(({ id }) => id === numericId)
  if (!referencedTweet) { return (<p>Loading</p>); }

  const selectedTweets = tweets.filter(({ rootId, id }) => rootId === referencedTweet.rootId || id === numericId);

  return (
    <Container>
      <Stack spacing='4'>
        {selectedTweets.map((tweet) => (
          <TweetCard
            key={`${tweet.content}-${tweet.username}-${tweet.timestamp}`}
            tweet={tweet}
            currentUser={currentUser}
            tweets={tweets}
            setTweets={setTweets}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default Tweet
