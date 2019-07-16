<template>

  <div class = "listingHolder">
<div class = "listing" v-if="showList">
  <!-- Title -->
 <div class = "entryHolder" v-for="poem in poems" :key="poem.id">
      <div class = "title">  {{poem.title}}</div>
    <button class = "minor" id = "update" @click="edit(poem)">Edit</button>

      <button class="stagePoem" @click="stagePoem(poem)">Stage</button>
  </div>
  
  </div>
  <div class= "container" v-if="!readOnly">
    <div id="stage" v-if="stage">
   {{this.activePoem.title}}
   {{this.activePoem.poem}}
    </div>
    <div id ="miniEditor" v-else>
      <input v-model="updateTitle">
      <textarea v-model="updatePoem"></textarea>
      <button class="minor" @click="save"> Save </button>

    </div>
    </div>
  </div>
</template>

<script>
import {poems, db} from '../firebase'
export default {
    data(){
        return{
            readOnly: true,
            showList: true,
            stage: false,
            updatePoem: '',
            updateTitle: '',
            activePoem: {
              id: '',
              title: '',
              poem: ''
            }
        }
    },
    props: {
        poems: Array,
    },
  
    methods:{

       save(){
           poems.doc(this.activePoem.id).update({title:this.updateTitle})
             .then(function(docRef) {
              console.log("Updated document with ID: ", docRef);
            })
            .catch(function(error) {
              console.error("Error updating document: ", error);
            });
           
           poems.doc(this.activePoem.id).update({poem:this.updatePoem})
            .then(function(docRef) {
              console.log("Updated document with ID: ",docRef);
            })
            .catch(function(error) {
              console.error("Error updating document: ", error);
            });
           
           this.stage = true;
           this.showList = true;
           this.updatePoem  = '';
           this.updateTitle = '';
       },

         edit(poem){
           this.stage = false;
           this.showList = false;
            console.log(poem)
            this.activePoem.id = poem.id;
            this.updatePoem = poem.poem;
            this.updateTitle = poem.title;
           
        },
          stagePoem(poem){
            this.activePoem.id = poem.id;
            this.activePoem.title = poem.title;
            this.activePoem.poem = poem.poem;
            this.readOnly = false;
            this.stage = true;
        
      },
    }
}
</script>

<style lang="less" scoped>
@light:#f9f8eb;
@dark: #415865;
@highlight: #ffe1b6;
@feature: #7a9eb1;

.flex{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.listingHolder{
    position:absolute;
    width: 90vw;
    margin-left: -45vw;
    left: 50%;
    top:15vh;
}
.container{
 .flex();
}
#miniEditor{

  .flex();

}

@width : 1150px;
@media(min-width: @width){
.listingHolder{
 position:absolute;
  top:20vh;
  background:#eeeeee; 
   display:grid;
   width:@width;
  grid-template-columns: 400px 750px;
  grid-template-rows:70vh;
  /* grid-template-rows: minmax(80px, auto); */
   border: 2px solid #444;
   margin:auto;
   left: 50%;
   margin-left: -@width/2;
}
.listing{
 
}

.entryHolder{
  display:grid;
  grid-template-columns: 20vw;
  grid-template-rows: minmax(80px, auto);
   align-items: center;
   border: 2px solid #444;
   margin:1em;
  /* justify-content: center;  */
}
.title{

}
.stagePoem{
  height: 50px;
  background: #444;
  color: #fffff8;
}
#miniEditor{
  width: @width;
  margin:auto;
}
textarea{
  width: @width;
  margin:auto;

}
}


</style>