//Local Component for each button and audiofile
var soundDiv = {
  props: ['keyProp'],

  //We want an event listener for each element itself so we can listen to the
  //Transition and remove evertying...
  mounted: function() {
    this.$el.addEventListener('transitionend', (e) => this.removeTransition(e));
  },

  //The parent item controls the keyProp, we listen for changes
  watch: {
    "keyProp.isActive": function (val) {
      if (val){
        this.play_sound()
      }
    },
  },

  template: `
    <div class="key" :class="{playing: keyProp.isActive}" v-on:click='clickEvent'>
      <kbd class="noselect">{{ keyProp.kbd }}</kbd>
      <span class="sound noselect">{{ keyProp.sound }}</span>
      <audio-file :audioprop="keyProp"></audio-file>
    </div>
  `,

  methods: {

    play_sound: function() {
      //Play the sound
      const audio = this.$el.querySelector('audio');
      audio.currentTime = 0; //rewind to start
      audio.play();
    },
    clickEvent: function (e) {
      //Tell the parent we clicked and simulate a key press
      this.$emit('clicked',this.keyProp.keyCode);
    },
    removeTransition: function(e) {
      //Emit to the parent to set to false
      if (e.propertyName !== 'transform') return; //only do stuff on transform
      this.$emit('remove-active',e)
    }
  },
}

//Global component for audio-file
Vue.component('audio-file',{
  props: ['audioprop'],
  template: `
    <audio :src="'sounds/' + audioprop.sound + '.wav'"></audio>
  `
})

//List of initial data
var keysList = [{
    keyCode: "65",
    sound: "clap",
    kbd: "A",
    isActive: false
  },
  {
    keyCode: "83",
    sound: "hihat",
    kbd: "S",
    isActive: false
  },
  {
    keyCode: "68",
    sound: "kick",
    kbd: "D",
    isActive: false
  },
  {
    keyCode: "70",
    sound: "openhat",
    kbd: "F",
    isActive: false
  },
  {
    keyCode: "71",
    sound: "boom",
    kbd: "G",
    isActive: false
  },
  {
    keyCode: "72",
    sound: "ride",
    kbd: "H",
    isActive: false
  },
  {
    keyCode: "74",
    sound: "snare",
    kbd: "J",
    isActive: false
  },
  {
    keyCode: "75",
    sound: "tom",
    kbd: "K",
    isActive: false
  },
  {
    keyCode: "76",
    sound: "tink",
    kbd: "L",
    isActive: false
  },
]

//Main view item
var key_divs = new Vue({
  el: '#key-divs',
  data: {
    keysList: keysList,
  },

  //Set up the local component
  components: {
    'sound-div': soundDiv,
  },
  methods: {

    keystroke: function(keyCode) {
      //set isActive to true for the right key or click
      this.keysList.forEach((key) => {key.isActive = key.keyCode === keyCode.toString()});
    },
    onRemoveActive: function (event) {
      //Set it all to false
      this.keysList.forEach((key) => {key.isActive = false})
    }
  },

  // When created, add an event listener to the total window
  created: function() {
    window.addEventListener('keydown', (e) => this.keystroke(e.keyCode));
  },

  //Template creates the div, and all the sub classes
  template: `
    <div class="keys">
      <sound-div v-for="(item,index) in keysList"
        :key-prop="item"
        :key="item.keyCode"
        @remove-active="onRemoveActive"
        @clicked="keystroke">
      </sound-div>
    </div>`
})
