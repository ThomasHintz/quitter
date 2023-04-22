import { useState, useRef } from 'react';

import TweetCard from '@/components/TweetCard';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control"

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
      const a9008 = [];
      const a9009 = username === 'space_karen' ? 1 : 0;
      let a9013 = Math.max.apply(null, tweets.map((a9014) => a9014.id))
      a9013++;
      const a9017 = a9013;
      a9008.push({ content, timestamp: Date.now(), username, timeline: username, sortKey: a9009, likedBy: [], id: a9013, rootId: a9013, type: 'original' });
      users.filter((a9004) => content.includes(`@${a9004}`))
           .forEach((a9005) => {
             a9013++;
             a9008.push({ content, timestamp: Date.now(), username, timeline: a9005, sortKey: a9009, likedBy: [], id: a9013, rootId: a9017, type: 'atted' });
           });
      setTweets([...a9008, ...tweets]);
      contentRef.current.value = '';
    }
    return false;
  };

  const a9010 = tweets.sort((a9011, a9012) => ((Date.now() - a9012.timestamp) < (1000 * 60 * 30 * 24)) ? (a9012.sortKey - a9011.sortKey) : (a9012.timestamp - a9011.timestamp))

  console.log(tweets);
  return (
    <Container>
      <Select placeholder='User' name="username" onChange={(a9003) => setCurrentUser(a9003.target.value)} defaultValue={currentUser}>
        {users.map((username) => (
          <option key={username} value={username}>{username}</option>
        ))}
      </Select>
      <Divider mt={4} mb={4} />
      <form onSubmit={onTweet}>
        <FormControl>
          <FormLabel>Tweet!</FormLabel>
          <Input placeholder="Hello..." id="content" name="content" ref={contentRef} />
          <FormErrorMessage>Tweet must be between 1 and 140 chars</FormErrorMessage>
        </FormControl>
      </form>
      <Divider mt={4} mb={4} />
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Profile</Tab>
        </TabList>

        <TabPanels>
          <TabPanel><Box>
            <Stack spacing='4'>
              {a9010.filter((a9006) => a9006.username === a9006.timeline).map((tweet) => (
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
          <TabPanel>
            <Box>
              <Stack spacing='4'>
                {a9010.filter((tweet) => tweet.timeline === currentUser).map((tweet) => (
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
  )
}
