import React from 'react'
import { Images } from './images'
import './App.scss'
import { Icons } from './icons'
import { customsPrices, EngineVolumes, LogisticGeorgiaToKyrgyzstan, LogisticUStoGEORGIA, Years } from './utils'


function App() {
  const [ustogeorgiaprice, setusgeorgiaprice] = React.useState(1600);
  const [georgiatokyrgyzstan, setgeorgiatokyrgyzstan] = React.useState(1000);
  const [year, setYear] = React.useState(2018);
  const [volume, setVolume] = React.useState("1.0");
  const [carPrice, setCarPrice] = React.useState(0); // Цена машины (пример)
  const [type, setType] = React.useState('Двигатель');

  const [resultPrice, setResultPrice] = React.useState(0);
  const [logisticsPrice, setLogisticsPrice] = React.useState(0);
  const [customsPrice, setCustomsPrice] = React.useState(0);

  React.useEffect(() => {
    // Преобразование всех значений в числа
    const carPriceNum = Number(carPrice) || 0;
    const ustogeorgiapriceNum = Number(ustogeorgiaprice) || 0;
    const georgiatokyrgyzstanNum = Number(georgiatokyrgyzstan) || 0;

    // Расчет логистики
    const logisticsBase = ustogeorgiapriceNum + georgiatokyrgyzstanNum;
    const logistics = type === "Гибрид" ? logisticsBase + 150 : logisticsBase;
    setLogisticsPrice(logistics);

    // Преобразование объема двигателя
    const formattedVolume = String(volume).replace("Д", "D"); // Исправление "3.0Д" -> "3.0D"

    // Проверка наличия данных о растаможке
    const customs = customsPrices?.[year]?.[formattedVolume] ? Number(customsPrices[year][formattedVolume]) : 0;
    setCustomsPrice(customs);

    // Полная сумма под ключ
    const totalPrice = carPriceNum + carPriceNum * 0.08 + logistics + customs;
    setResultPrice(totalPrice);

}, [ustogeorgiaprice, georgiatokyrgyzstan, year, volume, carPrice, type]);
  return (
    <div className="calculator">
      <div class="left">
        <div class="up">
          <img
            src={Images.logo}
            alt='logo'
          />
          <h1>Расчет стоимости автомобиля</h1>
        </div>
        <div class="price">
          <p>
            Стоимость авто
          </p>
          <div>
            <img
              src={Icons.search}
              alt='search'
            />
            <input
              type="text"
              placeholder='Введите стоимость'
              onChange={e => setCarPrice(e.target.value)}
            />
          </div>
        </div>
        <div class="UStoGeorgia">
          <p>Логистика 🇺🇸-🇬🇪</p>
          <div class="prices">
            {
              LogisticUStoGEORGIA.map(item => (
                <button
                  key={item.id}
                  className={ustogeorgiaprice === item.price ? "active" : ''}
                  onClick={() => setusgeorgiaprice(item.price)}
                >
                  {item.price}
                </button>
              ))
            }
          </div>
        </div>
        <div class="UStoGeorgia">
          <p>Логистика 🇬🇪-🇰🇬</p>
          <div class="prices">
            {
              LogisticGeorgiaToKyrgyzstan.map(item => (
                <button
                  key={item.id}
                  className={georgiatokyrgyzstan === item.price ? "active" : ''}
                  onClick={() => setgeorgiatokyrgyzstan(item.price)}
                >
                  {item.price}
                </button>
              ))
            }
          </div>
        </div>
        <div class="type">
          <p>Тип авто</p>
          <form class="types">
            <label for="dvigatel" onClick={() => setType('Двигатель')}>
              <input type="radio" id="dvigatel" name="option"/>
              <span>Двигатель</span>
            </label>
            <label for="gibrid" onClick={() => setType('Гибрид')}>
              <input type="radio" id="gibrid" name="option"/>
              <span>Гибрид</span>
            </label>
            <label for="electro" onClick={() => setType('Электро')}>
              <input type="radio" id="electro" name="option"/>
              <span>Электро</span>
            </label>
          </form>
        </div>
        <div class="UStoGeorgia">
          <p>Год</p>
          <div class="prices">
            {
              Years.map(item => (
                <button
                  key={item.id}
                  className={year === item.year ? "active" : ''}
                  onClick={() => setYear(item.year)}
                >
                  {item.year}
                </button>
              ))
            }
          </div>
        </div>
        <div class="UStoGeorgia">
          <p>Объем двигателя</p>
          <div class="prices">
            {
              EngineVolumes.map(item => (
                <button
                  key={item.id}
                  className={volume === item.volume ? "active" : ''}
                  onClick={() => setVolume(item.volume)}
                >
                  {item.volume}
                </button>
              ))
            }
          </div>
        </div>
      </div>
      <div class="right">
        <div className="card">
          <div class="card__up">
            <p>
              <img src={Icons.calendar} alt='calendar'/>
              Сумма под ключ
            </p>
          </div>
          <div class="card__down">
            <h1>{resultPrice}$</h1>
          </div>
        </div>

        <div className="card">
          <div class="card__up">
            <p>
              <img src={Icons.calendar} alt='calendar'/>
              Сумма логистики
            </p>
          </div>
          <div class="card__down">
            <h1>{logisticsPrice}$</h1>
          </div>
        </div>

        <div className="card">
          <div class="card__up">
            <p>
              <img src={Icons.calendar} alt='calendar'/>
              Сумма растаможки
            </p>
          </div>
          <div class="card__down">
            <h1>{customsPrice}$</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
