import './css/home.css'
import SelectPlus from './SelectPlus';
import Folder from './Folder';
import Updata from "./updateWord";


export default async function Home() {

  return (
    <div>
      <Updata></Updata>
      <h2 className="h2 h2 m-plus-rounded-1c-regular">フォルダ一覧</h2>
      <Folder></Folder>
      <SelectPlus></SelectPlus>
    </div>
  );
}