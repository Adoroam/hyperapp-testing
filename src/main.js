import { h, app } from 'hyperapp'

const state = {
  plates: [
    { name: 'Orange', price: 4.25, qty: 0 },
    { name: 'Purple', price: 3.75, qty: 0 },
    { name: 'Pink', price: 3.25, qty: 0 },
    { name: 'Green', price: 2.75, qty: 0 },
    { name: 'Blue', price: 2.25, qty: 0 },
    { name: 'Yellow', price: 1.75, qty: 0 }
  ],
  mockData: ''
}

const actions = {
  inc: () => s => ({item: s.item + 1}),
  test: pl => (s, a) => {
    console.log('payload', pl)
  }
}

const Plate = ({name, price, qty}) => (
  <div className={name}>
    <p>${price} x {qty}<span>SubTotal: ${(price * qty).toFixed(2)}</span></p>
  </div>
)

const view = (s, a) => (
  <div>
    <h1>sushiChooChoo.js</h1>
    {s.plates.map(({name, price, qty}) => (
      <Plate name={name} price={price} qty={qty} />
    ))}
    <p>{s.mockData}</p>
    <button onclick={a.inc}>inc</button>
    <button onclick={(e) => a.test(e)}>test</button>
  </div>
)
app(state, actions, view, document.body)
