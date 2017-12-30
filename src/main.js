import { h, app } from 'hyperapp'

const state = {
  item: 1
}

const actions = {
  inc: () => state => ({item: state.item + 1})
}

const view = (state, actions) => (
  <div>
    <h1>{state.item}</h1>
    <button onclick={actions.inc}>go up</button>
  </div>
)
app(state, actions, view, document.body)
