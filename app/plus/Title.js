import "../css/globals.css";
import "../css/plus.css";
import { useEffect, useState } from "react";
import  getWord  from '../getWord';
import { setDoc,doc,getDoc } from "firebase/firestore";
import db from '../../firebaseConfig'

export default function Title(props){

  const [title,setTitle]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const docRef=doc(db,'folder',props.folderName,'wordbook',props.docID)
    await setDoc(docRef,{title:title},{merge:true})
  }

  useEffect(()=>{
    const Title=async()=>{
      try {
        const docRef=doc(db,'folder',props.folderName,'wordbook',props.docID)
        const data=await getDoc(docRef)
        if (data.data().title){
          setTitle(title)
        }
      } catch(error){
        console.log('エラーです')
      }
    }
    Title()
  },[])

  return (
      <form className="title" onSubmit={handleSubmit}>
        <input className="titleInput" value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="タイトルを入力してください"/>
      </form>
  )
}