<template>
 
   <div class = "editorHolder">
    <div class = "editor">
    <input v-model="poemTitle" placeholder="Enter Poem Title Here" @focus="focusTitle" @blur="focusOut">
    <div  class ="preview" style="white-space: pre-line">{{this.poemText}}</div>
    <textarea v-model= "poemText"> </textarea>
    <button class = "major" @click="addPoem">Add Poem </button>
    </div>
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

<style lang="less" scoped>
@light:#f9f8eb;
@dark: #415865;
@highlight: #ffe1b6;
@feature: #7a9eb1;
body{
    font-size: 18px;
   text-align: center;
   color: #392f2f;
}

.editorHolder{
  position:absolute;
  top:15vh;
  background: @dark;
  left: 50%;
  width: 90vw;
  margin-left: -45vw;
}
.editor{
  display:flex;
    flex-direction: column;
    /* height: 600px; */
   align-items: center;
  /* justify-content: center;  */
}

.preview{
  height: 350px;
  overflow:scroll;
}



@width : 1150px;
@media(min-width: @width){
  .editorHolder{
    width: @width;
    background: @light;
    left:50%;
    margin-left: -@width/2;
  }

  .editor{
    width: 1150px;
    margin:auto;
  }

  textarea{
  width: 900px;
  margin:auto;

  }
}


</style>