<template>
  <div id="app">
    <div class="header"></div>
    <div class="content">
      <h1>Orders closed.</h1>
    </div>
  </div>
</template>

<script>
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald");
@import url("https://fonts.googleapis.com/css?family=Work+Sans");

html,
body {
  margin: 0;
}
h1 {
  color: #429ab5;
  font-family: Oswald, sans-serif;
  text-transform: uppercase;
}
input {
  display: inline-block;
  font-family: "Work Sans", sans-serif;
  font-size: 1em;
  padding: 0.5vw;
  width: 50vw;
}
input[type="submit"] {
  background: #eee;
  border: solid 1px #777;
  border-radius: 1vw;
  display: inline-block;
  font-size: 1.5em;
  margin-top: 5vh;
  padding: 1vw;
  text-transform: uppercase;
  width: auto;
}
input[type="submit"]:disabled {
  border: solid 1px #ccc;
}
label {
  display: inline-block;
  margin: 1vw;
  text-align: right;
  width: 30vw;
}
span {
  color: red;
  font-style: italic;
}
textarea {
  font-family: "Work Sans", sans-serif;
  font-size: 1em;
  margin-top: 2px;
  padding: 0.5vw;
  vertical-align: middle;
  width: 50vw;
}
#app {
  font-family: "Work Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.amount {
  display: inline;
  font-weight: bold;
}
.center {
  text-align: center;
}
.content {
  margin: 2vw;
}
.creditcard {
  max-width: 500px;
}
.header {
  background-image: url("./assets/keeper.png");
  background-position: center;
  background-size: cover;
  height: 50vh;
  text-align: center;
}
.message {
  margin: 4vw;
  font-weight: bold;
}
@media screen and (max-width: 400px) {
  input {
    display: block;
    width: 90vw;
  }
  label {
    display: block;
    text-align: left;
    width: 90vw;
  }
}
</style>
