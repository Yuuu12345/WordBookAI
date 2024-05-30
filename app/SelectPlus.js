'use client'
import "./css/globals.css";
import './css/home.css'
import { useEffect, useState } from "react";
import { setDoc,getDoc,collection,doc,onSnapshot} from "firebase/firestore";
import db from '../firebaseConfig'
import  getWord  from './getWord';
import Link from "next/link";

export default function SelectPlus(){

  const [trueSelect,setTrueSelect]=useState(false)
  const [folder,setFolder]=useState('')

  const handleSelect=()=>{
    setTrueSelect(prev=>!prev)
  }

  const submitFolder=async(e)=>{
    e.preventDefault()
    const docRef = doc(db,'folder',folder)
    await setDoc(docRef,{フォルダ名:folder})
    setTrueSelect(false)
  }

  return (
    <div>
      <button onClick={handleSelect} className="plus"><i class="fa-solid fa-folder-plus fa-2x"></i></button>
      {trueSelect && (
        <form onSubmit={submitFolder} className="inputFolder">
          <input onChange={(e)=>{setFolder(e.target.value)}} className="inputFolder" type="text" placeholder="フォルダ名を入力してください"/>
        </form>
      )}
    </div>
  )
}