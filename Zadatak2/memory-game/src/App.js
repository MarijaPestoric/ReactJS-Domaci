import './App.css';
import { useState, useEffect, resetTurn } from 'react';
import SingleCard from './components/SingleCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cardImages = [
  {"src": "/images/java.png", matched: false},
  {"src": "/images/js.png", matched: false},
  {"src": "/images/python.png", matched: false},
  {"src": "/images/ruby.png", matched: false},
  {"src": "/images/swift.png", matched: false},
  {"src": "/images/ts.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)



  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  if(turns === 5)
  {
    toast('Game over!')
  }
  //choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return{...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      } else{
        
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  //reset choice

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
useEffect(() => {
  shuffleCards()
},[])
  return(
   <div className="App">
     <ToastContainer />
    <h1>Memory Brain 🧠 </h1>
    <button onClick={shuffleCards}>Try Again ✌  </button>

    <div className ="card-grid">
      {cards.map(card => (
        <SingleCard key = {card.id} card = {card} handleChoice = {handleChoice} flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled} turns = {turns}/>
      ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}
export default App;
