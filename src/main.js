import { h, app } from 'hyperapp'
import { MobilePlate } from './components/MobilePlate.js'

const state = {
  plates: [
    { name: 'Orange', price: 4.25, qty: 0, hexCode: '#FF6F00' },
    { name: 'Purple', price: 3.75, qty: 0, hexCode: '#9F09FF' },
    { name: 'Pink', price: 3.25, qty: 0, hexCode: '#E883B4' },
    { name: 'Green', price: 2.75, qty: 0, hexCode: '#89BB3E' },
    { name: 'Blue', price: 2.25, qty: 0, hexCode: '#3765DA' },
    { name: 'Yellow', price: 1.75, qty: 0, hexCode: '#FFD72F' }
  ],
  plateTotal: 0,
  barChart: false,
  pieChart: false,
  touchey: {
    sx: false,
    ex: false
  }
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
  },
  tStart: eObj => s => { s.touchey.sx = eObj.e.touches[0].screenX },
  tEnd: eObj => (s, a) => {
    s.touchey.ex = eObj.e.changedTouches[0].screenX
    let t = s.touchey
    if ((t.ex > t.sx) && (t.ex - t.sx > 10)) a.incUpdate(eObj.plate) // right
    if ((t.ex < t.sx) && (t.sx - t.ex > 10)) a.decUpdate(eObj.plate) // left
  }
}
// PLATES

const view = (s, a) => (
  <div class='the-parent'>
    {/* MOBILE */}
    <div class='visible-xs'>
      <div class='pmd-card pmd-card-default pmd-z-depth'>
        <div class='pmd-card-title'>
          <h2 class='pmd-card-title-text'>sushiChooChoo.js</h2>
          <span class='pmd-card-subtitle-text'>total</span> <span class='lead'>${s.plateTotal.toFixed(2)}</span>
        </div>
      </div>
      {s.plates.map(plate => (
        <MobilePlate
          name={plate.name}
          price={plate.price}
          qty={plate.qty}
          hexCode={plate.hexCode}
          inc={() => a.incUpdate(plate)}
          ts={(e) => a.tStart({e, plate})}
          te={(e) => a.tEnd({e, plate})}
        />
      ))}
      <div class='pmd-card pmd-card-default pmd-z-depth'>
        <div class='pmd-card-body' oncreate={() => a.updateCharts()}>
          <canvas id='barchart' />
        </div>
      </div>
      <div class='pmd-card pmd-card-default pmd-z-depth'>
        <div class='pmd-card-body' oncreate={() => a.updateCharts()}>
          <canvas id='piechart' />
        </div>
      </div>
    </div>
    {/* TABLET */}
    <div class='container visible-sm'>
      <p>tablet</p>
    </div>
    {/* LAPTOP */}
    <div class='container visible-md'>
      <p>laptop</p>
    </div>
    {/* DESKTOP */}
    <div class='container visible-lg'>
      <p>desktop</p>
    </div>
  </div>
)
// onclick={() => a.reset()}
app(state, actions, view, document.body)
