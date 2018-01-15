import { h } from 'hyperapp'
export const MobilePlate = ({name, price, qty, hexCode, inc, ts, te}) => (
  <div
    class='pmd-card pmd-card-default pmd-z-depth'
    style={{backgroundColor: hexCode}}
    ontouchstart={ts}
    ontouchend={te}
    >
    <div class='pmd-card-title'>
      <div class='media-left'>
        <a class='qty'>{qty}</a>
      </div>
      <div class='media-body media-middle'>
        <h3 class='pmd-card-title-text'>${(price * qty).toFixed(2)}</h3>
        <span class='pmd-card-subtitle-text'>${price}</span>
      </div>
      <div class='media-right'>
        <button
          class='btn btn-sm pmd-btn-fab pmd-ripple-effect btn-default inc-button'
          type='button'
          onclick={inc}>
          <i class='material-icons pmd-sm'>add</i>
        </button>
      </div>
    </div>
  </div>
)
