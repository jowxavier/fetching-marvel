import './App.css';
import { useRequest } from "./hooks/useRequest";
import md5 from 'md5';
import CharacterItem from "./components/CharacterItem";
import Header from './components/Header';

type Repository = {
  id: string;
  name: string;
  description: string;
  thumbnail: any;
}

function App() { 
  const publicKey = import.meta.env.VITE_PUBLICKEY;
  const privateKey = import.meta.env.VITE_PRIVATEKEY;
  const time = Number(new Date());
  const hash = md5(time + privateKey + publicKey)  
  const { data: items, isFetching } = 
    useRequest<Repository[]>(`http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`);

    return isFetching ? <h1>Loading ... </h1> :
    <div className="container">
      <Header />
      
      <section className="contents">          
          {            
              items?.map(item=>(
                  <CharacterItem key={item.id} item={item}></CharacterItem>
              ))
          }
      </section>
    </div>
}

export default App
