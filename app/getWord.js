import { getDocs,collection} from "firebase/firestore";
import db from '../firebaseConfig'

export default async function getWord(folder,docFolder,wordbook,docWordbook,word){
  let path=``
  if (folder,docFolder,wordbook,docWordbook,word){
    path=`${folder}/${docFolder}/${wordbook}/${docWordbook}/${word}`
  }else if (folder,docFolder,wordbook) {
    path=`${folder}/${docFolder}/${wordbook}`
  }else if (folder){
    path=`${folder}`
  }else {console.log('pathが間違ってます')}

  const snapshot=await getDocs(collection(db,path))
  const data=snapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  }))
  return data
}