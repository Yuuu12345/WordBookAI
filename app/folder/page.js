'use client'
import "../css/folder.css";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { getDocs,collection,query, doc,onSnapshot,collectionGroup, updateDoc } from "firebase/firestore";
import Link from "next/link";
import Delete from "../delete";
import DropDown from "./dropdown";
import db from '../../firebaseConfig'

export default function FolderPage() {

  const search = useSearchParams()
  const folderName = search.get('folderName')

  const [folders, setFolders] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'folder', folderName, 'wordbook'), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setFolders(data)
    })}, [])

  return (
    <div>
      {/* <Link className="back" href={`/?folderName=${folderName}`}><i class="fa-solid fa-arrow-left fa-2x"></i></Link> */}
      <h2 className="titleFolder m-plus-rounded-1c-regular">{folderName}</h2>
      <div className="folderFlex">
        {folders.map((doc) => (
          doc.title &&
          (<div className="failList">
            <Link href={`display?folderName=${folderName}&docID=${doc.id}`} className="fail">
              {doc.title}
              <div className="wordNumber">単語の数：</div>
            </Link>
            <DropDown className="dropdown" folderName={folderName} docID={doc.id}></DropDown>
          </div>)))}
      </div>
      <button className="plus"><Link href={`plus?folderName=${folderName}`}><i class="fa-solid fa-circle-plus fa-2x"></i></Link></button>
    </div>
  );
}