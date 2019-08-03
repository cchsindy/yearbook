<template>
  <div id="app">
    <div class="header"></div>
    <div class="content">
      <h1>Order your copy of the Covenant Keeper!</h1>
      <p>Please complete this form to order your 2018-19 yearbook.</p>
      <p>Orders must be placed by Monday, August 5. Yearbooks should arrive by August 30. Orders placed individually through Shutterfly will result in a significant price increase.</p>
      <p>Questions? Email <a href="mailto:studentpublications@covenantchristian.org">studentpublications@covenantchristian.org</a>.</p>
      <h1>Yearbook Order</h1>
      <form v-on:submit.prevent>
        <h2>Your Info</h2>
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" v-model="firstname" required>
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="lastname" required>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" required>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="city" required>
        <label for="state">State:</label>
        <input type="text" id="state" v-model="state" required>
        <label for="zipcode">Zipcode:</label>
        <input type="text" id="zipcode" v-model="zipcode" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="phone" required>
        <label for="books">Number of yearbooks:</label>
        <input type="number" id="books" v-model="books" min="1" required>
        <label for="students">Student Name(s):</label>
        <input type="text" id="students" v-model="students" required>
        <h2>Payment</h2>
        <label for="card">Credit Card #:</label>
        <input type="text" id="card" v-model="card" required>
        <label for="expiration">Expiration:</label>
        <input type="text" id="expiration" v-model="expiration" required>
        <label for="code">Security Code:</label>
        <input type="text" id="code" v-model="code" required>
        <label for="amount">Amount: $</label>
        <div class="amount">{{amount}}</div>
        <div class="center">
          <div class="message">{{message}}</div>
          <div v-show="message === 'Processing...'">
            <img src="@/assets/ring-spinner.gif" alt="Spinner">
          </div>
          <div v-if="showSubmit">
            <input type="submit" :disabled="invalid" @click="purchase"><br>
            <span v-if="invalid">Form is incomplete or invalid.</span><br><br>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data: () => {
    return {
      lastname: '',
      firstname: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      phone: '',
      books: '1',
      students: '',
      card: '',
      expiration: '',
      code: '',
      release: '',
      message: '',
      showSubmit: true
    }
  },
  computed: {
    invalid() {
      let invalid = false
      if (this.lastname === ''
        || this.firstname === ''
        || this.address === ''
        || this.city === ''
        || this.state === ''
        || this.zipcode === ''
        || this.email === ''
        || this.phone === ''
        || this.books === ''
        || this.make === ''
        || this.students === ''
        || this.card === ''
        || this.expiration === ''
        || this.code === ''
      ) invalid = true
      return invalid
    },
    amount() {
      return (this.books * 70).toFixed(2)
    }
  },
  methods: {
    purchase() {
      this.showSubmit = false
      this.message = 'Processing...'
      let html = '<html><body>'
      html += '<h1>2018-2019 Yearbook Order</h1>'
      html += '<h2>Details</h2>'
      html += `<p>Yearbooks: ${this.books}</p><p>Students: ${this.students}</p>`
      html += '<h2>Thank you so much!</h2><p>Yearbooks should arrive by August 30.</p>'
      html += '</body></html>'
      let data = {
        firstName: this.firstname,
        lastName: this.lastname,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zipcode,
        email: this.email,
        phone: this.phone,
        books: this.books,
        students: this.students,
        ccNumber: this.card,
        ccExpiration: this.expiration,
        ccCode: this.code,
        amount: this.amount,
        description: '2018-2019 Yearbook Order',
        html
      }
      axios
        .post('https://us-central1-my-covenant.cloudfunctions.net/creditCard', {
          data
        })
        .then(result => {
          this.message = result.data.description
          if (result.data.responseCode != 1) {
            this.message += ' Please fix your information above and try again.'
            this.showSubmit = true
          }
          if (result.data.transactionId) {
            data.transactionId = result.data.transactionId
            axios
              .post('https://us-central1-my-covenant.cloudfunctions.net/yearbook', {
                data
              })
              .then(result => {
                this.message = result.data
              })
              .catch(() => {
                this.message = 'Could not complete your registration.'
              })
          }
        })
        .catch(() => {
          this.message = 'This operation is currently unavailable.'
        })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald');
@import url('https://fonts.googleapis.com/css?family=Work+Sans');

html, body {
  margin: 0;
}
h1 {
  color: #429AB5;
  font-family: Oswald, sans-serif;
  text-transform: uppercase;
}
input {
  display: inline-block;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  padding: 0.5vw;
  width: 50vw;
}
input[type=submit] {
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
input[type=submit]:disabled {
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
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  margin-top: 2px;
  padding: 0.5vw;
  vertical-align: middle;
  width: 50vw;
}
#app {
  font-family: 'Work Sans', sans-serif;
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
.header {
  background-image: url('./assets/keeper.png');
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
