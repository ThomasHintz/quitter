import { useRef } from 'react';

import { useRouter } from 'next/router'

import TweetCard from '@/components/TweetCard';
import { createTweet } from '@/utils/tweets';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control"

import {
  Input
} from "@chakra-ui/input"

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
  const contentRef = useRef(null);
  const router = useRouter()
  const { id } = router.query
  const numericId = Number.parseInt(id, 10);
  const referencedTweet = tweets.find(({ id }) => id === numericId)
  if (!referencedTweet) { return (<p>Loading</p>); }

  const selectedTweets = tweets.filter(({ replyToId, id }) => replyToId === numericId && id !== numericId);

  const onTweet = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    const username = currentUser;
    if (content.length > 0 && content.length <= 140) {
      const a9008 = [];
      const a9009 = username === 'space_karen' ? 1 : 0;
      let a9013 = Math.max.apply(null, tweets.map((a9014) => a9014.id))
      a9013++;
      const a9017 = a9013;
      a9008.push(createTweet({ tweets, content, username, timeline: username, rootId: numericId, replyToId: numericId, type: 'reply' }));
      users.filter((a9004) => content.includes(`@${a9004}`))
           .forEach((a9005) => {
             a9013++;
             a9008.push({ deleted: false, content, timestamp: Date.now(), username, timeline: a9005, sortKey: a9009, likedBy: [], id: a9013, rootId: a9017, replyToId: numericId, type: 'reply' });
           });
      setTweets([...a9008, ...tweets]);
      contentRef.current.value = '';
    }
    return false;
  };

  return (
    <Container>
      <TweetCard
        tweet={referencedTweet}
        currentUser={currentUser}
        tweets={tweets}
        setTweets={setTweets}
      />
      <form onSubmit={onTweet}>
        <FormControl>
          <FormLabel mt={4}>Reply!</FormLabel>
          <Input placeholder="Hello..." id="content" name="content" ref={contentRef} />
          <FormErrorMessage>Tweet must be between 1 and 140 chars</FormErrorMessage>
        </FormControl>
      </form>
      <Divider mt={4} mb={4} />
      <Stack spacing='4'>
        {selectedTweets.map((tweet) => (
          <TweetCard
            key={`${tweet.id}`}
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
