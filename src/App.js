import { useEffect, useState } from 'react';
import { doc, onSnapshot, getDocs,collection, query, where} from "firebase/firestore";
import './App.css';
import Post from './Post';
import { getFirestore} from 'firebase/firestore';
//  import {db}  from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core'
import {onAuthStateChanged,signOut, getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
// import ImageUpload from './ImageUpload';

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
  const auth = getAuth();
  const db=getFirestore();
  // const db=getFirestore();
  // const db=getFirestore();
  // useeffect runs a piece a code on specific condition 
 

  useEffect(()=>{
    const auth = getAuth();
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        setUser(user);
      if(user.displayName)
      {
        //dont update
      }else{
        return updateProfile(user, {
          displayName:username,
        });
      }
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    });

    return ()=>{
      unsubscribe();
    }
    },[user,username]);



    useEffect(() => {
      const q=query(collection(db,"posts"))
       onSnapshot(q,(querySnapshot) => {
        setPosts(querySnapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })))
      })
    }, [])

    // useEffect(() => {
    //    const q=query(collection(db,"posts"));
    //    const querySnapshot= getDocs(q);
    //     setPosts(querySnapshot.forEach(doc => ({
    //       id: doc.id,
    //       post: doc.data()
    //     })))
    //   },[])
    
    // useEffect(() => {
    //   db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    //     setPosts(snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       post: doc.data()
    //     })))
    //   })
    // }, [])
  
// useEffect(() => {

//   const q = query(collection(db, "posts"));

//   onSnapshot(q, (querySnapshot) => {
//     setPosts(
//       querySnapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
//     );
//   });
// });
    
 
  const signUp=(e) =>{
    const auth = getAuth();
    e.preventDefault();
     createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
      // ..
    });
    setOpen(false);
  }

const signIn=(e)=>{
  const auth = getAuth();
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message);
  });
  setOpenSigIn(false);
}


  return (
      
    <div className="app">
      {/* <ImageUpload/> */}
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
        <img className="app_headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" width="200" height="100"></img>    
       </div>
    {user ?(
      <Button onClick={()=> signOut(auth)}>log out</Button>
    ):(
      <div className="app_loginConatiner">
       <Button onClick={()=> setOpenSigIn(true)}>Sign In</Button> 
      <Button onClick={()=> setOpen(true)}>Sign Up</Button>
      </div>
    )
    }
   
    {
      posts.map(({id,post})=> (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
   
    </div>
  );
}

export default App;

