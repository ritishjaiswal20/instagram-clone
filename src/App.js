import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import db from './firebase'
import auth from './firebase'
import storage from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const[modalStyle]=useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState(false);
  const [password,setPassword] = useState(false);
  const [email,setEmail] = useState(false);
  // useeffect runs a piece a code on specific condition 
  useEffect(()=>{
      
    db.collection('posts').onSnapshot(snapshot => {
      // every single time change happens fire this line od code
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data() 
      })));
    })
  },[]);
  const signUp=(event)=>{
       event.preventDefault();
       auth.createUserWithEmailAndPassword(email,password)
       .catch((error)=> alert(error.message))
  }

  return (
      
    <div className="app">
      <Modal
      open={open}
      onClose={() =>setOpen(false)}
      >
     <div style={modalStyle} className={classes.paper} >
       <form className="app_signup">
       <center>
       <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" width="200" height="100"></img>
       </center>
       <Input
         type="text"
         placeholder="username"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}
       ></Input>   
        <Input
         type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
       ></Input>   
        <Input
         type="password"
         placeholder="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
       ></Input>   
     
     <Button type="submit" onClick={signUp}>signup</Button>
     </form>
     
     </div>
      </Modal>
       <div className="app_header">
        <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" width="200" height="100"></img>    
    </div>
    <Button onClick={()=> setOpen(true)}>Sign out</Button>
    {
      posts.map(({id,post})=> (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
   
    </div>
  );
}

export default App;

