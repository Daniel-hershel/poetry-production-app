<template>
<div id = "tester">
    <div class = "title">
    <h1> Poetry Writing Center </h1>
    <button id = "switch" @click="switchMode">Switch</button>
    </div>
  <transition
     v-bind:css="false"
  v-on:enter="enter"
  v-on:leave="leave"
  v-on:before-enter="beforeEnter"
  >
<div class = "listing" v-if="!editMode">
  <!-- Title -->
 <div v-for="poem in poems" :key="poem.id">
      <div class = "title">  {{poem.title}}</div>
      <button @click="stagePoem">Stage</button>
  </div>
  <div id="stage">
    Stage
    </div>
   <!-- Poem -->
   <!-- <div v-for="poem in poems" :key="poem.id"> -->
        <!-- <div style="white-space: pre-line">{{poem.poem}}</div> -->
  <!-- </div> -->
    </div>
    </transition>
     <transition
 v-bind:css="false"
  v-on:before-enter="beforeEnterEditor"
  v-on:enter="enterEditor"
  v-on:leave="leaveEditor"
  >
   
    <div class = "editor" v-if="editMode">
    <input v-model="poemTitle" placeholder="Enter Poem Title Here" @focus="focusTitle" @blur="focusOut">
    <div style="white-space: pre-line">{{this.poemText}}</div>
    <textarea v-model= "poemText"> </textarea>
    <button @click="addPoem">Add Poem </button>
    </div>
    </transition>

    </div>
</template>
<script>
import {poems} from '../firebase';
import {db} from '../firebase';
export default {

 data(){

     return {
      poems: [],
      poemTitle: '',
      poemText: '',
      editMode: true
     }
  },
    firestore() {
    return {
      poems: poems
    }
  },
  computed:{
      
  },
  methods:{
    stagePoem(poem){
      console.log(poem)
    },
    enterEditor(el,done){
          Velocity(el, {opacity:1,rotateX: [0,-90],}, {delay:1400,duration:1200, complete: done})
          console.log('editor entering')
    },
    leaveEditor(el, done){
        console.log(el)
        Velocity(el, {scale:.1,rotateX: [-90,0] }, {duration:1000, complete:done})
    },
      beforeEnter(el){
          Velocity(el, {opacity: 0}, {duration:1})
          console.log('before entering')
      },
       beforeEnterEditor(el){
          Velocity(el, {opacity: 0}, {duration:1})
          console.log('before entering')
      },
      enter(el, done){
          Velocity(el, {opacity:1,rotateX: [0,-90],}, {delay:1400,duration:1200, complete: done})
          // Velocity(el, 'reverse')
          console.log('poems entering')
      },
      leave(el, done){
        Velocity(el, {scale:.1,rotateX: [-90,0] }, {duration:1200, complete:done})
      },
      switchMode(){
        if(!this.editMode){
              this.editMode = true;
          console.log(this.editMode)
          }   else if(this.editMode){
              this.editMode = false;

          }
      },
      focusTitle(){
        let el = document.activeElement
        Velocity(el, {height: '75px', width: '200px', borderBottomWidth: '+=2px', fontSize:'1.2em', marginBottom: '+=2em' }, { duration: 600 })
      },
      focusOut(event){
      let el = event.target;
        Velocity(el, 'reverse')
      },
      addPoem(){
       poems.add({
        title: this.poemTitle,
        poem: this.poemText,
        createdAt: new Date()
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
       
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

       this.poemTitle = '';
        this.poemText = '';
  }
  }

}
</script>

<style scoped>

body{
    font-size: 18px;
   text-align: center;
   color: #392f2f;

}

.listing{
  display: grid;
  grid-template-columns: 18vw 1fr;
  grid-template-rows: minmax(200px, auto);
}

.title{
  float: left;
  height: 25px;
  /* display:inline-block; */
}
#tester {
    display:grid;
    width: 95vw;
    grid-template-columns: 90vw;
    grid-template-rows: 18vh 70vh 1fr;
    margin:auto;
   background: #e6d3a7;

}
.editor{
  display:flex;
    flex-direction: column;
    /* height: 600px; */
   align-items: center;
  /* justify-content: center;  */
}

/* Input Elements*/
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
input{
   color: #392f2f;
    height: 50px;
    width: 150px;
    text-align:center;
    margin-bottom: 2.5em;
    border:0px solid #444;
    background: transparent;
}

input:focus{

    
}

textarea{
height: 60vh;
width: 85vw;
margin: auto;
background: #eeeeee;
}

button {

}
@media(min-width: 900px){
#tester{
    display:grid;
    width:900px;
    grid-template-columns: 900px;
    grid-template-rows: 18vh 70vh 1fr;
    grid-gap: 1em;
    margin:auto;
    
}

textarea{
width: 650px;

}
.editor > *{

}

}


</style>