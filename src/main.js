import { h, app } from 'hyperapp'

const plateChart = [
  { name: 'Orange', price: 4.25, qty: 0, hexCode: '#FF6F00' },
  { name: 'Purple', price: 3.75, qty: 0, hexCode: '#9F09FF' },
  { name: 'Pink', price: 3.25, qty: 0, hexCode: '#E883B4' },
  { name: 'Green', price: 2.75, qty: 0, hexCode: '#89BB3E' },
  { name: 'Blue', price: 2.25, qty: 0, hexCode: '#3765DA' },
  { name: 'Yellow', price: 1.75, qty: 0, hexCode: '#FFD72F' }
]
const state = {
  plates: plateChart,
  plateTotal: 0,
  barChart: false,
  pieChart: false
}
const actions = {
  inc: plate => s => { plate.qty++ },
  dec: plate => s => { if (plate.qty > 0) plate.qty-- },
  setTotal: () => (s, a) => ({plateTotal: a.reducer()}),
  incUpdate: plate => (s, a) => {
    a.inc(plate)
    a.setTotal()
    a.updateCharts()
  },
  decUpdate: plate => (s, a) => {
    a.dec(plate)
    a.setTotal()
    a.updateCharts()
  },
  reducer: () => s => {
    return s.plates.reduce((acc, curr) => {
      acc = acc.price ? (acc.price * acc.qty) : acc
      curr = curr.price ? (curr.price * curr.qty) : curr
      return acc + curr
    })
  },
  reset: () => (s, a) => {
    s.plates.forEach(item => { item.qty = 0 })
    a.setTotal()
    a.updateCharts()
  },
  createCharts: () => s => {
    let barEle = document.getElementById('barchart')
    let barChartBuild = {
      type: 'bar',
      data: {},
      options: Chart.defaults.bar
    }
    s.barChart = new Chart(barEle, barChartBuild)
    let pieEle = document.getElementById('piechart')
    let pieChartBuild = {
      type: 'pie',
      data: {},
      options: Chart.defaults.pie
    }
    s.pieChart = new Chart(pieEle, pieChartBuild)
  },
  updateCharts: () => (s, a) => {
    if (!s.barChart || !s.pieChart) a.createCharts()
    if (s.barChart) {
      // s.barChart.data.labels = s.plates.map(plate => plate.name)
      s.barChart.data.datasets = s.plates.map(plate => {
        return {data: [plate.price * plate.qty], label: plate.name, backgroundColor: plate.hexCode}
      })
      s.barChart.update()
    }
    if (s.pieChart) {
      s.pieChart.data.labels = s.plates.map(plate => plate.name)
      s.pieChart.data.datasets[0] = {
        data: s.plates.map(plate => plate.qty),
        backgroundColor: s.plates.map(plate => plate.hexCode)
      }
      s.pieChart.update()
    }
  }
}
// PLATE
const plateStyle = color => ({
  color: color
})
const Plate = ({name, price, qty, hexCode, inc, dec}) => (
  <tr>
    <td>
      <a href='javascript:void(0);' onclick={dec}>
        <i class='material-icons md-dark pmd-sm' style={plateStyle(hexCode)}>remove_circle_outline</i>
      </a>
    </td>
    <td style={plateStyle(hexCode)}>
      <ul>
        <li class='list-group-item'>
          <h3 class='list-group-item-heading'>${price}</h3>
          <span class='list-group-item-text'>${(price * qty).toFixed(2)}</span>
        </li>
      </ul>
    </td>
    <td class='lead'>{qty}</td>
    <td>
      <a href='javascript:void(0);' onclick={inc}>
        <i class='material-icons md-dark pmd-sm' style={plateStyle(hexCode)}>add_circle_outline</i>
      </a>
    </td>
  </tr>
)

const view = (s, a) => (
  <div class='container'>
    <div class='pmd-card pmd-card-default pmd-z-depth'>
      <div class='pmd-card-title'>
        <h2 class='pmd-card-title-text'>sushiChooChoo.js</h2>
        <span class='pmd-card-subtitle-text'>a simple conveyorbelt sushi calculator</span>
      </div>
      <div class='pmd-card-actions'>
        <button
          class='btn pmd-btn-flat pmd-ripple-effect btn-primary'
          type='button'
          onclick={() => a.reset()}>
          Reset
        </button>
      </div>
    </div>
    <div class='pmd-table-card pmd-card pmd-z-depth col-lg-4'>
      <table class='table pmd-table'>
        <thead>
          <tr>
            <td>remove</td>
            <td>price/subtotal</td>
            <td>quantity</td>
            <td>add</td>
          </tr>
        </thead>
        <tbody>
          {s.plates.map(plate => (
            <Plate name={plate.name} price={plate.price} qty={plate.qty} hexCode={plate.hexCode} inc={() => a.incUpdate(plate)} dec={() => a.decUpdate(plate)} />
          ))}
        </tbody>
      </table>
    </div>
    <div class='pmd-card pmd-z-depth col-lg-6 col-lg-offset-2'>
      <div class='pmd-card-title'>
        <h2 class='pmd-card-title-text'>${s.plateTotal.toFixed(2)}</h2>
        <span class='pmd-card-subtitle-text'>Total</span>
      </div>
      <div class='pmd-card-body' oncreate={() => a.updateCharts()}>
        <canvas id='barchart' />
        <canvas id='piechart' />
      </div>
    </div>
  </div>
)
app(state, actions, view, document.body)
