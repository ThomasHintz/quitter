import { useRef } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

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
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'

const findRelatedTweets = (tweet, tweets, relatedTweets) => {
  if (tweet.rootId !== tweet.id) {
    const rootTweet = tweets.find(({ id }) => id === tweet.rootId)
    return [rootTweet, ...findRelatedTweets(rootTweet, tweets, relatedTweets)]
  } else {
    return relatedTweets || [];
  }
};

const Tweet = ({ tweets, setTweets, currentUser, setCurrentUser, users }) => {
  const contentRef = useRef(null);
  const router = useRouter()
  const { id } = router.query
  const numericId = Number.parseInt(id, 10);
  const referencedTweet = tweets.find(({ id }) => id === numericId)
  if (!referencedTweet) { return (<p>Loading</p>); }

  const tweetsWithSameRootId = tweets.filter(({ rootId }) => rootId === numericId);
  const selectedTweets = [...findRelatedTweets(referencedTweet, tweets), ...tweetsWithSameRootId].filter(({ id, deleted}) => id !== numericId && !deleted);
  const sortedTweets = selectedTweets.sort((a9011, a9012) => ((Date.now() - a9012.timestamp) < (1000 * 60 * 30 * 24)) ? (a9012.sortKey - a9011.sortKey) : (a9012.timestamp - a9011.timestamp))

  const onTweet = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    const username = currentUser;
    if (content.length > 0 && content.length <= 140) {
      setTweets([createTweet({ tweets, users, content, username, rootId: numericId }), ...tweets]);
      contentRef.current.value = '';
    }
    return false;
  };

  return (
    <>
      <Box bg="purple" color="white">
        <Container>
          <Link href="/">
            <Box position="absolute" top="20px" color="black" left="-6px" style={{transform: 'rotate3d(1, 1, 1, -45deg)', textShadow: '1px 1px aliceblue'}} bg="red" p={2}>
              <Text fontSize="xl">Quitter!</Text>
            </Box>
          </Link>
          <Stack direction="row" p={4} alignItems="center" ml={[12, 0]}>
            <Text as="span">Current User:</Text>
            <Select placeholder='User' name="username" onChange={(a9003) => setCurrentUser(a9003.target.value)} defaultValue={currentUser}>
              {users.map((username) => (
                <option key={username} value={username}>{username}</option>
              ))}
            </Select>
          </Stack>
        </Container>
      </Box>
      <Container>
        <Divider mt={4} mb={4} />
        <TweetCard
          tweet={referencedTweet}
          currentUser={currentUser}
          tweets={tweets}
          setTweets={setTweets}
          users={users}
        />
        <form onSubmit={onTweet}>
          <FormControl>
            <FormLabel mt={4}>Reply!</FormLabel>
            <Input placeholder="Hello @user!" id="content" name="content" ref={contentRef} />
            <FormErrorMessage>Tweet must be between 1 and 140 chars</FormErrorMessage>
            <Button  bg="purple" color="white" mt={4} type="submit">Submit</Button>
          </FormControl>
        </form>
        <Divider mt={4} mb={4} />
        <Stack spacing='4'>
          {sortedTweets.map((tweet) => (
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
    </>
  );
}

export default Tweet
