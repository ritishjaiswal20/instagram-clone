import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { Button, Input, makeStyles, Modal } from '@material-ui/core'
import ImageUpload from './ImageUpload';
import { auth, db } from "./firebase";
//import InstagramEmbed from 'react-instagram-embed';

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
  const [user,setUser]=useState(null);
  const [openSignIn,setOpenSigIn]=useState(false);

  // useEffect(()=>{
  //   const auth = getAuth();
  //   const unsubscribe=onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log(user);
  //       setUser(user);
  //     if(user.displayName)
  //     {
  //       //dont update
  //     }else{
  //       return updateProfile(user, {
  //         displayName:username,
  //       });
  //     }
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //       setUser(null);
  //     }
  //   });

  //   return ()=>{
  //     unsubscribe();
  //   }
  //   },[user,username]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username])

  
  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

    
  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: username });
      })
      .catch((err) => alert(err.message))

    setOpen(false);
  }



const signIn = (e) => {
  e.preventDefault();

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message))

    setOpenSigIn(false);
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


 

      <Modal
      open={openSignIn}
      onClose={() =>setOpenSigIn(false)}
      >
     <div style={modalStyle} className={classes.paper} >
       <form className="app_signup">
       <center>
       <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" width="200" height="100"></img>
       </center>
      
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
     
     <Button type="submit" onClick={signIn}>signIn</Button>
     </form>
     
     </div>
      </Modal>
 




       <div className="app_header">
        <img className="app_headerImage" src="data:image/png;base64,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" width="200" height="100"></img>    
        <img className="app_headerImage" src="data:image/png;base64,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" width="500" height="100"></img>   
        {user ?(
      <Button className="ss"onClick={()=> auth.signOut()}>log out</Button>
        ):(
      <div className="app_loginConatiner">
       <Button  className="ss" onClick={()=> setOpenSigIn(true)}>Sign In</Button> 
      <Button  className="ss" onClick={()=> setOpen(true)}>Sign Up</Button>
      </div>
      )
      }
       </div>
    
  <div className="app_posts">
    {
      posts.map(({id,post})=> (
        <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
  </div>
  {/* <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}

    {user?.displayName?(
       <ImageUpload username={user.displayName}/> ):
       (
            <h3>sorry you need to login</h3>
       )
    }
    
   </div>
    
  );
}

export default App;

