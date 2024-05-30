'use client'
import './css/home.css'
import { useEffect, useState } from "react";
import { collection,onSnapshot} from "firebase/firestore";
import db from '../firebaseConfig'
import Delete from "./delete";
import Link from "next/link";

export default function Folder(){

  const [folders,setFolders]=useState([])
  const subCollections=['wordbook','word']

  useEffect(()=>{
      const unsubscribe=onSnapshot(collection(db,'folder'),(snap)=>{
        const words=snap.docs.map((doc)=>(
          {id:doc.id,
            ...doc.data()
          }
        ))
        setFolders(words)
      })
  },[])

  return (<>
      {folders.map((doc)=>(<div className="folders">
        <Link href={`folder?folderName=${doc.フォルダ名}`} className="folder">
          {doc.フォルダ名}
          </Link>
          <button onClick={(e)=>{
            Delete(`folder/${doc.フォルダ名}`,subCollections);}}
            className="folderTrash"><i class="fa-solid fa-trash"></i></button>
        </div>))}
    </>)
}