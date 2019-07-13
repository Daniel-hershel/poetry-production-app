<template>
<div id = "tester">
    <div class = "title">
    <h1> Poetry Writing Center </h1>
    <button id = "switch" @click="switchMode">Switch</button>
    </div>
    <transition
  mode= "out-in"
  v-bind:css="false"
  v-on:before-enter="beforeEnterEditor"
  v-on:enter="enterEditor"
  v-on:leave="leaveEditor"
  >
   <div class = "editorHolder" v-if="editMode">
    <div class = "editor">
    <input v-model="poemTitle" placeholder="Enter Poem Title Here" @focus="focusTitle" @blur="focusOut">
    <div style="white-space: pre-line">{{this.poemText}}</div>
    <textarea v-model= "poemText"> </textarea>
    <button @click="addPoem">Add Poem </button>
    </div>
    </div>
    </transition>
  <transition
  mode= "out-in"

     v-bind:css="false"
  v-on:enter="enter"
  v-on:leave="leave"
  v-on:before-enter="beforeEnter"
  >
  <div class = "listingHolder" v-if="!editMode">
<div class = "listing">
  <!-- Title -->
 <div class = "titleHolder" v-for="poem in poems" :key="poem.id">
      <div class = "title">  {{poem.title}}</div>
      <button class="stagePoem" @click="stagePoem(poem)">Stage</button>
  </div>
  
  </div>
    <div id="stage">
    Stage
    </div>
  </div>
    </transition>


   <!-- Poem -->
   <!-- <div v-for="poem in poems" :key="poem.id"> -->
        <!-- <div style="white-space: pre-line">{{poem.poem}}</div> -->
  <!-- </div> -->


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
      let stager = document.getElementById('stage');
      stager.innerHTML = '';
      stager.append(poem.poem)
    },
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

#tester {
    display: grid;
    width: 95vw;
    grid-template-columns: 95vw;
    grid-template-rows: 18vh 70vh 1fr;
    margin:auto;
   background: #e6d3a7;
}
.editorHolder{
  position:absolute;
  top:20vh;
}
.editor{
  display:flex;
    flex-direction: column;
    /* height: 600px; */
   align-items: center;
  /* justify-content: center;  */
}
.listingHolder{
  grid-template-columns: 20vw 75vw;

}
.listing{
 
}
.titleHolder{
  display:grid;
  grid-template-columns: 20vw;
  grid-template-rows: minmax(80px, auto);
   align-items: center;
   border: 2px solid #444;
   margin:1em;
  /* justify-content: center;  */
}
.title{
  /* float: left; */
  /* height: 25px; */
  /* display:inline-block; */
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
.stagePoem{
  height: 50px;
  background: #444;
  color: #fffff8;
}

@media(min-width: 1200px){
#tester{
    display:grid;
    width:1200px;
    grid-template-columns: 1200px;
    grid-template-rows: 18vh 70vh 1fr;
    grid-gap: 1em;
    margin:auto;
    
}


.listingHolder{
 position:absolute;
  top:20vh;
  background:#eeeeee; 
   display:grid;
  grid-template-columns: 400px 800px;
  grid-template-rows:70vh;
  /* grid-template-rows: minmax(80px, auto); */
   align-items: center;
   border: 2px solid #444;
   margin:auto;
}
textarea{
width: 650px;

}
.editor > *{

}

}


</style>