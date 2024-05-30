import '../css/plus.css'
import { useEffect, useState } from "react";
import { setDoc, doc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import db from '../../firebaseConfig'

export default function WordDisplay(props) {

  const [words, setWords] = useState([])

  useEffect(() => {
    const colRef = collection(db, 'folder', props.folderName, 'wordbook', props.docID, 'word')
    const unsubscribe = onSnapshot(colRef, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setWords(data)
    })
  }, [])

  const handleButton = async (docID) => {
    const docRef = doc(db, 'folder', props.folderName, 'wordbook', props.docID, 'word', docID)
    await deleteDoc(docRef)
  }


  return (
    <div className="someWord">
      {words.map((doc) => (
      <div className='_' key='id'>
        <div className="wordWrite">
          <div className="">
            <div className="docRes">{doc.word}</div>
            <div className="tango">単語</div>
          </div>
          <div className="">
            <div className="docRes">{doc.res}</div>
            <div className="kaitou">回答</div>
          </div>
        </div>
        <button className='trashButton' onClick={() => { handleButton(doc.id) }}><i class="fa-solid fa-trash"></i></button>
      </div>))}
    </div>
  )
}