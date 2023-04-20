import { useState } from 'react';

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
  Button
} from '@chakra-ui/react'

import {
  Input
} from "@chakra-ui/input"

const DEFAULT_TWEETS = [
  {
    content: 'My first tweet!',
    timestamp: new Date('4/19/23'),
    username: 'alex',
    timeline: 'alex',
    sortKey: 0,
    likedBy: [],
    id: 0,
    rootId: 0,
  },
  {
    content: 'My second tweets!',
    timestamp: Date.now(),
    username: 'sam',
    timeline: 'sam',
    sortKey: 0,
    likedBy: [],
    id: 1,
    rootId: 1
  }
];

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

const users = [
  'alex',
  'sam',
  'space_karen'
];

export default function Home() {
  const [tweets, setTweets] = useState(DEFAULT_TWEETS);
  const [a9001, a9002] = useState(users[0]);

  const onTweet = (evt) => {
    evt.preventDefault();
    const content = evt.target.elements.content.value;
    const username = evt.target.elements.username.value;
    if (content.length > 0 && content.length <= 140) {
      const a9008 = [];
      const a9009 = username === 'space_karen' ? 1 : 0;
      let a9013 = Math.max.apply(null, tweets.map((a9014) => a9014.id))
      a9013++;
      const a9017 = a9013;
      a9008.push({ content, timestamp: Date.now(), username, timeline: username, sortKey: a9009, likedBy: [], id: a9013, rootId: a9013 });
      users.filter((a9004) => content.includes(`@${a9004}`))
           .forEach((a9005) => {
             a9013++;
             a9008.push({ content, timestamp: Date.now(), username, timeline: a9005, sortKey: a9009, likedBy: [], id: a9013, rootId: a9017 });
           });
      setTweets([...a9008, ...tweets]);
    }
    return false;
  };

  const a9010 = tweets.sort((a9011, a9012) => ((Date.now() - a9012.timestamp) < (1000 * 60 * 60 * 24)) ? (a9012.sortKey - a9011.sortKey) : (a9012.timestamp - a9011.timestamp))

  const likeTweet = (a9014, a9020) => {
    const a9016 = tweets.filter((a9016) => a9016.rootId === a9014);
    let a9018 = [];
    const a9021 = a9020 === 'space_karen' ? [a9020, a9020] : [];
    a9018 = [...a9016.map((a9019) => { return { ...a9019, likedBy: [a9020, ...a9021, ...a9019.likedBy] } }), ...tweets.filter((a9015) => a9015.rootId !== a9014)];
    setTweets(a9018);
  };
console.log(tweets);
  return (
    <>
      <form onSubmit={onTweet}>
        <FormControl>
          <FormLabel>Tweet</FormLabel>
          <Input placeholder="Hello..." id="content" name="content" />
          <Select placeholder='User' name="username">
            {users.map((username) => (
              <option key={username} value={username}>{username}</option>
            ))}
          </Select>
          <FormErrorMessage>Tweet must be between 1 and 140 chars</FormErrorMessage>
        </FormControl>
      </form>
      <Stack direction="row" spacing="4">
        <Box>
          <Text>Main</Text>
          <Stack spacing='4'>
            {a9010.filter((a9006) => a9006.username === a9006.timeline).map(({ content, timestamp, username, likedBy, id }) => (
              <Card key={`${content}-${username}-${timestamp}`}>
                <CardBody>
                  <Text>{content}</Text>
                  <Text>By {username} with {likedBy.length} likes</Text>
                  <Text>{calcTime(timestamp)}</Text>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Box>
        <Box>
          <Select placeholder='User' name="username" onChange={(a9003) => a9002(a9003.target.value)}>
            {users.map((username) => (
              <option key={username} value={username}>{username}</option>
            ))}
          </Select>
          <Stack spacing='4'>
            {a9010.filter((tweet) => tweet.timeline === a9001).map(({ content, timestamp, username, likedBy, timeline, id, rootId }) => (
              <Card key={content}>
                <CardBody>
                  <Text>{content}</Text>
                  <Text>By {username} with {likedBy.length} likes</Text><Text>{calcTime(timestamp)}</Text>
                  {likedBy.includes(timeline) ? null : <Button onClick={() => likeTweet(rootId, a9001)}>Like me!</Button>}
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
