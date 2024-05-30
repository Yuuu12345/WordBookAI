'use client'
import { useSearchParams } from 'next/navigation';
import  Title  from '../plus/Title';
import  WordSet  from '../plus/WordSet';
import  WordDisplay  from '../plus/WordDisplay';

export default function Edit() {

  const search=useSearchParams()
  const folderName=search.get('folderName')
  const docID=search.get('docID')

  return (
    <div>
      {docID && (<Title docID={docID} folderName={folderName}/>)}
      {docID &&  (<WordSet docID={docID} folderName={folderName}></WordSet>)}
      {docID && (<WordDisplay docID={docID} folderName={folderName}></WordDisplay>)}
    </div>
  );
}