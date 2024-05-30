'use client'
import "../css/plus.css";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { addDoc,doc,updateDoc, collection,serverTimestamp, query } from "firebase/firestore";
import db from '../../firebaseConfig'
import  Title  from './Title';
import  WordSet  from './WordSet';
import  WordDisplay  from './WordDisplay';
import Link from "next/link";

export default function Plus(){

  const search=useSearchParams()
  const folderName=search.get('folderName')
  const [docID,setDocID]=useState('')

  useEffect(()=>{
    const plus=async()=>{
      const colRef=collection(db,'folder',folderName,'wordbook')
      const docRef=await addDoc(colRef,{})
      const docID=docRef.id
      setDocID(docID)
      await updateDoc(docRef,{
        id:docID,
        folderName:folderName,
        updatedAt:serverTimestamp()
      })
    }
    plus()
  },[])


  return (
    <div>
      <div className="back"><Link href={`folder?folderName=${folderName}`}><i class="fa-solid fa-arrow-left fa-2x"></i></Link></div>
      {docID && (<Title docID={docID} folderName={folderName}/>)}
      {docID &&  (<WordSet docID={docID} folderName={folderName}></WordSet>)}
      {docID && (<WordDisplay docID={docID} folderName={folderName}></WordDisplay>)}
    </div>
  )
}