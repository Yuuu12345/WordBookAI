'use client'
import "../css/globals.css";
import '../css/plus.css'
import { useEffect, useState } from "react";
import  getWord  from '../getWord';
import { addDoc,doc,getDoc, collection,serverTimestamp  } from "firebase/firestore";
import db from '../../firebaseConfig'

export default function WordSet(props){

  const [word,setWord]=useState('')
  const [res,setRes]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(word){
      const res=await fetch('http://localhost:3000/api',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({word})
      })
      if (!res.ok) {
        console.error('サーバーからの応答が期待されたものではありません:', res.status);
      } else {
        const data = await res.json();
        setRes(data.explane);

        const docRef0 = doc(db, 'folder', props.folderName, 'wordbook', props.docID);
        const docSnap = await getDoc(docRef0);
        let title = ""; 
        if (docSnap.data().title) {
          title = docSnap.data().title; 
        } else {
          console.log("ドキュメントが見つかりません");
        }

        const docRef=collection(db,'folder',props.folderName,'wordbook',props.docID,'word')
        await addDoc(docRef,{
          word:word,
          res:data.explane,
          updatedAt:serverTimestamp(),
          title:title
        })
        setWord('')
      }
    }
  }

  return (
      <form className="word" onSubmit={handleSubmit}>
        <input className="wordInput" value={word} onChange={(e)=>{setWord(e.target.value)}} type="text" placeholder="単語を入力"/>
      </form>
  )
}