<template>
<div id= "CreationStation">
   <div class = "title">
    <h1> Poetry Writing Center </h1>
    <button class="major" id = "switch" @click="switchMode">Switch</button>
    </div>
 
 <transition
  mode= "out-in"
  v-bind:css="false"
  v-on:before-enter="beforeEnterEditor"
  v-on:enter="enterEditor"
  v-on:leave="leaveEditor"
  >
    <Editor  v-if="editMode">

    </Editor>
</transition>

<transition
  mode= "out-in"
  v-bind:css="false"
  v-on:enter="enter"
  v-on:leave="leave"
  v-on:before-enter="beforeEnter"
  >
    <PoemsList 
    v-bind:poems="poems"
    v-if="!editMode">

    </PoemsList>
    
</transition>
    </div>

</template>

<script>
import {poems} from '../firebase';

import Editor from '../components/Editor';
import PoemsList from '../components/poemsList';
export default{
    name:"editorView",
    components: {Editor, PoemsList},
    data(){
        return {
            poems: [],
            editMode: true
        }
    },
     firestore() {
    return {
      poems: poems
    }
  },
    methods:{
    
   
    //  Transitions

    beforeEnterEditor(el){
      el.style.opacity = 0;
          // Velocity(el, {opacity: 0}, {duration:1})
          console.log('before entering')
      },
    enterEditor(el,done){
          Velocity(el, {opacity:1,rotateX: [0,-90],}, {delay:1200,duration:1200, complete: done})
          console.log('editor entering')
    },
    leaveEditor(el, done){
        console.log(el)
        Velocity(el, {scale:.1,rotateX: [-90,0] }, {duration:5000, complete:done})
    },
      beforeEnter(el){
       el.style.opacity = 0;
      },
       
      enter(el, done){
          Velocity(el, {opacity:1,rotateX: [0,-90],}, {delay:1200,duration:1200, complete: done})
          // Velocity(el, 'reverse')
          console.log('poems entering')
      },
      leave(el, done){
        Velocity(el, {scale:.1,rotateX: [-90,0] }, {duration:1200, complete:done})
      },

    //    BUTTON METHODS
    
      switchMode(){
        if(!this.editMode){
              this.editMode = true;
          console.log(this.editMode)
        }   else if(this.editMode){
              this.editMode = false;
          }
      },
    }
}
</script>

<style lang="less" scoped>
@light:#f9f8eb;
@dark: #415865;
@highlight: #ffe1b6;
@feature: #7a9eb1;

#CreationStation{
    display: grid;
    position: relative;
    width: 95vw;
    margin: auto;
    background: @highlight;
    height: 100vh;

}

@width: 1150px;

@media(min-width: @width){
    #CreationStation{
        width: @width;
         height: 100vh;

        
    }
}
</style>