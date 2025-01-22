import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import cardData from './data/cardData'
import Board from './components/Board/Board'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [cards, setCards] = useState([])
  const [sizeBoard, setSizeBoard] = useState(2)
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)

  //Размешивание карточек
  const shuffleCards = (size) => {
    const sizedCard = cardData.slice(0, size) //Выбор количества карточек
    const doubleCards = [...sizedCard, ...sizedCard] //удваиваем карточки для Игры
      .sort(() => Math.random() - 0.5) //Сортируем Карточки
      .map((card) => ({ ...card, id: uuidv4() })) //добавляем к каждой карточке id 

    setCount(0)
    setWin(false)
    setChoiseOne(null) //Очищаем выбранные карты
    setChoiseTwo(null) //Очищаем выбранные карты
    setCards(doubleCards) //Сохраняем карточки в Стейт
    setTurns(0) //Сбрасываем количество проделанных ходов
    setSizeBoard(size)
  }


  // Выбор карточки
  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }

 /* 
 Управление ходом игры
 Сравнение карточек
 Опеределение победы
 */
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true)
      if (choiseOne.image === choiseTwo.image) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.image === choiseOne.image) {
              setCount(prevCount => prevCount + 1)
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
    setTimeout(() => {
      if (cards.length > 0 && cards.length === count) {
        setWin(true)
      }
    }, 1000)

  }, [choiseOne, choiseTwo, cards, count])

  //Сброс выбора и увелечение счетчика ходов на 1
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //Автоматический запуск игры
  useEffect(() => { shuffleCards(2) }, [])

  return (
    <div className="App">
      <h1>Игра в карточки</h1>
      <div className='sizeboard'>
        <span>Размер поля:</span>
        <button onClick={() => shuffleCards(2)}>4</button>
        <button onClick={() => shuffleCards(4)}>8</button>
        <button onClick={() => shuffleCards(9)}>18</button>
        <button onClick={() => shuffleCards(12)}>24</button>
      </div>
      <div className='newgame'>
        <button onClick={() => shuffleCards(sizeBoard)}>Новая Игра</button>
      </div>
      <Board
        cards={cards}
        handleChoise={handleChoise}
        choiseOne={choiseOne}
        choiseTwo={choiseTwo}
        disabled={disabled}
        sizeBoard={sizeBoard}
      />
      <div className='turns'>
        <span>Количество ходов: {turns}</span>
      </div>
      <div className={win ? 'salut' : 'salut disp'}>
        <div className='pyro'>
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>

    </div>
  )
}

export default App
