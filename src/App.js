import { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {

  const [posts,setPosts]=useState([
    {
      username: "ritish jasiwal",
      caption: "hey guys how are you",
      imageurl:"https://reactjs.org/logo-og.png"
    
    },
    {
      username: "ritish jasiwal",
      caption: "hey guys how are you",
      imageurl:"https://reactjs.org/logo-og.png"
    }
  ])
  return (
    <div className="app">
       <div className="app_header">
        <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" width="200" height="100"></img>    
    </div>
    {
      posts.map(post => {
        <Post username={post.username} caption={post.caption} imageurl={post.imageurl} />
      })
    }
   
    </div>
  );
}

export default App;
