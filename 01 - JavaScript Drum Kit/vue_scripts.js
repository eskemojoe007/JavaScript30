Vue.component('sound-div', {
  props: ['item'],
  template: `
      <div :data-key="item.keyCode" class="key" :onclick="'play(' + item.keyCode + ')'">
        <kbd>{{ item.kbd }}</kbd>
        <span class="sound">{{ item.sound }}</span>
      </div>
  `
})
Vue.component('audio-file', {
  props: ['item'],
  template: `
    <audio :data-key="item.keyCode" :src="'sounds/' + item.sound + '.wav'"></audio>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    keysList: [{keyCode: "65", sound: "clap", kbd: "A"},
      {keyCode: "83", sound: "hihat", kbd: "S"},
      {keyCode: "68", sound: "kick", kbd: "D"},
      {keyCode: "70", sound: "openhat", kbd: "F"},
      {keyCode: "71", sound: "boom", kbd: "G"},
      {keyCode: "72", sound: "ride", kbd: "H"},
      {keyCode: "74", sound: "snare", kbd: "J"},
      {keyCode: "75", sound: "tom", kbd: "K"},
      {keyCode: "76", sound: "tink", kbd: "L"},
    ]
  }
})
