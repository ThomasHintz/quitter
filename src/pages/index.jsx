import { useRef } from 'react';

import Link from 'next/link';

import TweetCard from '@/components/TweetCard';
import { createTweet } from '@/utils/tweets';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control"

import {
  Divider,
  Stack,
  Select,
  Box,
  Container,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Text,
  Button
} from '@chakra-ui/react'

import {
  Input
} from "@chakra-ui/input"

export default function Home({ tweets, setTweets, currentUser, setCurrentUser, users }) {
  const contentRef = useRef(null);
  const onTweet = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    const username = currentUser;
    if (content.length > 0 && content.length <= 140) {
      setTweets([createTweet({ tweets, users, content, username }), ...tweets]);
      contentRef.current.value = '';
    }
    return false;
  };

  const a9010 = tweets.sort((a9011, a9012) => ((Date.now() - a9012.timestamp) < (1000 * 60 * 30 * 24)) ? (a9012.sortKey - a9011.sortKey) : (a9012.timestamp - a9011.timestamp))

  console.log(tweets);
  return (
    <>
      <Box bg="purple" color="white">
        <Link href="/">
          <Box position="absolute" top="20px" color="black" left="-6px" style={{transform: 'rotate3d(1, 1, 1, -45deg)', textShadow: '1px 1px aliceblue'}} bg="red" p={2}>
            <Text fontSize="xl">Quitter!</Text>
          </Box>
        </Link>
        <Container>
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
        <form onSubmit={onTweet}>
          <FormControl>
            <FormLabel>Tweet!</FormLabel>
            <Input placeholder="Hello @user!" id="content" name="content" ref={contentRef} />
            <FormErrorMessage>Tweet must be between 1 and 140 chars</FormErrorMessage>
            <Button mt={4} type="submit" bg="purple" color="white">Submit</Button>
          </FormControl>
        </form>
        <Divider mt={4} mb={4} />
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>Profile</Tab>
          </TabList>

          <TabPanels>
            <TabPanel><Box>
              <Stack spacing='4'>
                {a9010.map((tweet) => (
                  <TweetCard
                    key={tweet.id}
                    tweet={tweet}
                    currentUser={currentUser}
                    tweets={tweets}
                    setTweets={setTweets}
                    users={users}
                  />
                ))}
              </Stack>
            </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <Stack spacing='4'>
                  {a9010.filter((tweet) => tweet.username === currentUser || tweet.references.includes(currentUser)).map((tweet) => (
                    <TweetCard
                      key={tweet.id}
                      tweet={tweet}
                      currentUser={currentUser}
                      tweets={tweets}
                      setTweets={setTweets}
                    />
                  ))}
                </Stack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
