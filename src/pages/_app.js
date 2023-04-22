import { useState } from 'react';

import '@/styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react"



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

const users = [
  'alex',
  'sam',
  'space_karen'
];

export default function App({ Component, pageProps }) {
  const [tweets, setTweets] = useState(DEFAULT_TWEETS);
  const [currentUser, setCurrentUser] = useState(users[0]); // timeline, setTimeline
  return (
    <ChakraProvider>
    <Component tweets={tweets} setTweets={setTweets} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} {...pageProps} />
    </ChakraProvider>
  )
}
