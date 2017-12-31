import { h, app } from 'hyperapp'
const state = {
  item: 1,
  mockData: ''
}

const actions = {
  inc: () => s => ({item: s.item + 1}),
  test: pl => (s, a) => {
    console.log('payload', pl)
  }
}

const view = (s, a) => (
  <div>
    <h1>Hyperapp Testing</h1>
    <p>{s.item}</p>
    <p>{s.mockData}</p>
    <button onclick={a.inc}>inc</button>
    <button onclick={(e) => a.test(s.item)}>test</button>
  </div>
)
app(state, actions, view, document.body)
