import { useState, useEffect } from 'react';

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
    replyToId: null,
    type: 'original',
    deleted: false
  },
  {
    content: 'My second tweets!',
    timestamp: Date.now(),
    username: 'sam',
    timeline: 'sam',
    sortKey: 0,
    likedBy: [],
    id: 1,
    rootId: 1,
    type: 'original',
    replyToId: null,
    deleted: false
  }
];

const DEFAULT_TWEETS2 = [
  {
    content: 'My first tweet!',
    timestamp: Date.now(),
    username: 'alex',
    references: [],
    sortKey: 0,
    likedBy: [],
    id: 0,
    rootId: 0,
    deleted: false
  },
  {
    content: 'My second tweets!',
    timestamp: Date.now(),
    username: 'sam',
    references: [],
    sortKey: 0,
    likedBy: [],
    id: 1,
    rootId: 1,
    deleted: false
  }
];

const users = [
  'alex',
  'sam',
  'space_karen'
];

export default function App({ Component, pageProps }) {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const storedTweets = localStorage.getItem('tweets');
    if (storedTweets) {
      setTweets(JSON.parse(storedTweets));
    } else {
      setTweets(DEFAULT_TWEETS2);
    }
  }, []);
  const [currentUser, setCurrentUser] = useState(users[0]); // timeline, setTimeline
  const setAndStoreTweets = (tweets) => {
    setTweets(tweets);
    localStorage.setItem('tweets', JSON.stringify(tweets));
  };
  return (
    <ChakraProvider>
    <Component tweets={tweets} setTweets={setAndStoreTweets} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} {...pageProps} />
    </ChakraProvider>
  )
}
