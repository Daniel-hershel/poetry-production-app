<template>
<div id = "tester">
    <div class = "title">
    <h1> Poetry Writing Center </h1>
    <button id = "switch" @click="switchMode">Switch</button>
    </div>
 <transition
  v-on:enter="enter"
  v-on:leave="leave"
  >
    <div class = "listing" v-if="!editMode">
 <div v-for="poem in poems" :key="poem.id">
      <div>  {{poem.title}}</div>
        <div style="white-space: pre-line">{{poem.poem}}</div>
  </div>
    </div>
    </transition>
    <div class = "editor" v-if="editMode">
    <input v-model="poemTitle" placeholder="Enter Poem Title Here" @focus="checkFocus" @blur="focusOut">
    <div style="white-space: pre-line">{{this.poemText}}</div>
    <textarea v-model= "poemText"> </textarea>
    <button @click="addPoem">Add Poem </button>
    </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
import {poems} from '../firebase';
import {db} from '../firebase';
export default {

 data(){

     return {
      poems: [],
      poemTitle: '',
      poemText: '',
      editMode: false
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
      enter(){
          console.log('entering');
      },
      leave(){
          console.log('leaving');
      },
      switchMode(){
          if(this.editMode){
              this.editMode = false;

          } else if(!this.editMode){
              this.editMode = true;
          console.log(this.editMode)

          }

      },
    focusOut(event){
        console.log(event);
    },
checkFocus(){
      let el = document.activeElement
       Velocity(el, {height: '75px', width: '200px', borderBottomWidth: '+=2px', fontSize:'1.2em', marginBottom: '+=2em' }, { duration: 600 })
      // animate border and size properties
      // than how to animate when it goes out of focus
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
width: 650px;
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
.editor > *{

}

}


</style>