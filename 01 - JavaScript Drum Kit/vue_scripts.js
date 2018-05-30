
var soundDiv = {
  props: ['item'],
  data: function () {
    return {
      isActive: false,
      show: true
    }
  },
  mounted: function () {
    this.$el.addEventListener('transitionend', (e) => this.removeTransition(e));
  },

  template: `
    <div class="key" :class="{playing: isActive}" v-on:click='play_sound'>
      <kbd class="noselect">{{ item.kbd }}</kbd>
      <span class="sound noselect">{{ item.sound }}</span>
      <audio-file :item="item"></audio-file>
    </div>
  `,

  methods: {
    play_sound: function (event) {
      this.isActive = true
      const audio = this.$el.querySelector('audio');
      audio.currentTime = 0; //rewind to start
      audio.play();
    },
    removeTransition: function (e) {
      if (e.propertyName !== 'transform') return; //only do stuff on transform
      this.isActive = false;
    }
  },
}
Vue.component('audio-file', {
  props: ['item'],
  template: `
    <audio :src="'sounds/' + item.sound + '.wav'"></audio>
  `
})

var keysList =  [
    {keyCode: "65", sound: "clap", kbd: "A"},
    {keyCode: "83", sound: "hihat", kbd: "S"},
    {keyCode: "68", sound: "kick", kbd: "D"},
    {keyCode: "70", sound: "openhat", kbd: "F"},
    {keyCode: "71", sound: "boom", kbd: "G"},
    {keyCode: "72", sound: "ride", kbd: "H"},
    {keyCode: "74", sound: "snare", kbd: "J"},
    {keyCode: "75", sound: "tom", kbd: "K"},
    {keyCode: "76", sound: "tink", kbd: "L"},
  ]

var key_divs = new Vue({
  el: '#key-divs',
  data: {
    keysList: keysList,
  },
  components: {
    'sound-div': soundDiv,
  },
  methods:{
    keystroke: function (keyCode) {
      const child = this.$children.find(child => {return child.$vnode.data.key === keyCode.toString()});
      child.play_sound()
    }
  },
  created: function () {
    window.addEventListener('keydown', (e) => this.keystroke(e.keyCode));
  }
})
