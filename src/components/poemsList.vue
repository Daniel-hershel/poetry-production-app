<template>

  <div class = "listingHolder">
<div class = "listing">
  <!-- Title -->
 <div class = "titleHolder" v-for="poem in poems" :key="poem.id">
      <div class = "title">  {{poem.title}}</div>
    <button classs = "minor" id = "update" @click="edit(poem)">Edit</button>

      <button class="stagePoem" @click="stagePoem(poem)">Stage</button>
  </div>
  
  </div>
    <div id="stage">
    Stage
</div>
  </div>
</template>

<script>
// import {poems} from '../firebase'
export default {
    data(){
        return{
            editMode: true
        }
    },
    props: {
        poems: Array,
        edit: Function
    },
  
    methods:{
       
          stagePoem(poem){
        console.log(poem)
        let stager = document.getElementById('stage');
        stager.innerHTML = '';
        stager.append(poem.poem)
      },
    }
}
</script>

<style lang="less" scoped>
@light:#f9f8eb;
@dark: #415865;
@highlight: #ffe1b6;
@feature: #7a9eb1;

.listingHolder{
    position:absolute;
    width: 90vw;
    margin-left: -45vw;
    left: 50%;
    top:15vh;
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

}
.stagePoem{
  height: 50px;
  background: #444;
  color: #fffff8;
}
}


</style>