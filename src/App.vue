<template>
  <div id="app">

    <router-view/>

    
  </div>
</template>

<script>

import {db} from './firebase';
export default {
  name: 'App',

}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.major {
  height: 50px;
  width: 175px;
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
    width: 250px;
    text-align:center;
    margin-bottom: 2.5em;
    border:0px solid #444;
    background: transparent;
    font-size: 1.1em;
}

input:focus{   
}
textarea{
height: 500px;
width: 85vw;
margin: auto;
background: #eeeeee;
}
@width : 1150px;
@media(min-width: @width){
  width: 900px;
  margin:auto;

}

</style>
