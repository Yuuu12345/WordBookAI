'use client'
import { useState } from 'react';
import "../css/folder.css";
import Delete from '../delete';
import Link from 'next/link';


export default function DropDown(props) {

  const word=['word']
  const [dropTrue,setDropTrue]=useState(false)
  const handleDrop=(e)=>{
    e.stopPropagation();
    setDropTrue((prev)=>(!prev))
  }

  return (
    <div className={props.className}>
      <button className='DropButton' onClick={handleDrop}><i class="fa-solid fa-ellipsis-vertical"></i></button>
      {dropTrue && (<div className='dwon'>
        <button onClick={() => { Delete(`folder/${props.folderName}/wordbook/${props.docID}`,word) }} className='trashButton1'><i class="fa-solid fa-trash"></i></button>
        <Link href={`edit?folderName=${props.folderName}&docID=${props.docID}`}><i class="fa-solid fa-pen-to-square"></i></Link>
        </div>)}
    </div>
  );
}