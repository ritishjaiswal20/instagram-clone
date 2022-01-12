import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase';
import firebase from 'firebase'
function Post({user,postId,username,caption,imageUrl}) {
    const [comments,setComments]=useState([]);
     const[comment,setComment]=useState('');
    useEffect(()=>{
      let unsubscribe;
      if(postId){
        unsubscribe=db
        .collection("posts")  
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot)=>{
          setComments(snapshot.docs.map((doc)=>doc.data()));
        });

      }
      return ()=>{
          unsubscribe();
      };
    
   } ,[postId])
   const postComment=(event)=>{
      event.preventDefault();
      db.collection("posts").doc(postId).collection("comments").add({
        text:comment,
        username:user.displayName,
        //timestamp:firebase.firestore.FieldValue.serverTimestamp

      });
      setComment('');
   }
    return (
        <div className="post">
            <div className="post_header">
              <Avatar 
               className="post_avatar"
               alt="ritish"
               src="https://reactjs.org/logo-og.png"
              />
             <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl}></img>
            <h4 className="post_text"><strong>{username}:  </strong>{caption}</h4>
          <div className="post_comments">
              {comments.map((comment)=>{
                <p>
                  <b>{comment.username}</b>{comment.text}
                </p>
              })}
          </div>
          
          
          
          
          
          
          <form className="post_commentBox">
              <input
               className="post_input"
               type='text'
               placeholder="add a comment"
               value={comment}
               onChange={(e)=>setComment(e.target.value)}
              />
              <button 
                className="post_button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
              >
                Post
              </button>
          </form>
        </div>
    )
}

export default Post


