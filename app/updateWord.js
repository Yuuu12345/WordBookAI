'use client'
import './css/home.css'
import { useEffect, useState } from "react";
import { collectionGroup, query, orderBy, limit, getDocs } from "firebase/firestore";
import db from '../firebaseConfig'
import Link from "next/link";
import DropDown from './folder/dropdown';

export default function Updata() {

  const [folders, setFolders] = useState([])
  const [snap,setSnap]=useState('')

  useEffect(() => {
    (async () => {
      const q = query(collectionGroup(db, 'wordbook'), orderBy('updatedAt', "desc"), limit(5));
      const snap = await getDocs(q);
      setSnap(snap)
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFolders(data);
    })();
  }, [snap]);

  return (<>
    <div>
      <div className="homeFolderFlex">
        {folders.map((doc) => (
          doc.title &&
          (<div className="failList">
            <Link href={`display?folderName=${doc.folderName}&docID=${doc.id}`} className="fail">
              {doc.title}
            </Link>
            <DropDown className="dropdown" folderName={doc.folderName} docID={doc.id}></DropDown>
          </div>)))}
      </div>
    </div>
  </>)
}