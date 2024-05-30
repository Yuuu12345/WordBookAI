'use client'
import "../css/display.css";
import { useSearchParams } from 'next/navigation';
import { Flipper, Flipped } from 'react-flip-toolkit';
import db from '../../firebaseConfig'
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

export default function Display() {

  const search=useSearchParams()
  const folderName=search.get('folderName')
  const docID=search.get('docID')
  const [words,setWords]=useState([])
  const [index,setIndex]=useState(0)
  const [description,setDescription]=useState(false)

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % words.length);
    setDescription(false);
  };

  const handleBack = () => {
    setIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return words.length - 1;
      }
    });
    setDescription(false);
  };

  const handleClick = () => {
    setDescription((prev) => !prev);
  };


  useEffect(()=>{
    if(!docID){
      return
    }
    console.log('docID',docID)
    const colRef=collection(db,'folder',folderName,'wordbook',docID,'word')
    const unsubscribe=onSnapshot(colRef,(snap)=>{
      const data=snap.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }))
      setWords(data)
    })
  },[])


  return (
    <div>
      {words.length > 0 && (<Flipper flipKey={words[index].id}>
        <Flipped flipId="word">
          <div onClick={handleClick} className="wordDisplay">
            {description ? (<>
              <div className="describe">回答</div>
              <div className="wordDescribe">{words[index].res}</div>
              </>) : (<>
              <div className="describe">単語</div>
              <div className="wordDescribe">{words[index].word}</div>
              </>)}
          </div>
        </Flipped>
      </Flipper>)}
      <div className="button">
        <button className="arrow" onClick={handleBack}><i class="fa-solid fa-arrow-left fa-2x"></i></button>
        <button className="arrow" onClick={handleNext}><i class="fa-solid fa-arrow-right fa-2x"></i></button>
      </div>
    </div>
  );
}