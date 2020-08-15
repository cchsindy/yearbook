import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'

export default class FirebaseService {
  constructor() {
    this.app = firebase.initializeApp({
      apiKey: 'AIzaSyCg_FVHdzP3kvRAyrnpE2bJUsQfMRUgFW4',
      authDomain: 'my-covenant.firebaseapp.com',
      databaseURL: 'https://my-covenant.firebaseio.com',
      projectId: 'my-covenant',
      storageBucket: 'my-covenant.appspot.com',
      messagingSenderId: '945207168321',
      appId: '1:945207168321:web:c3bb4aa02f11e1444e65c0',
    })
    this.firestore = this.app.firestore()
    this.pay = firebase.functions().httpsCallable('stripePayment')
  }

  async stripePay(data) {
    const payment = await this.pay({
      description: 'Yearbook Order',
      amount: data.amount,
      paymentMethodId: data.paymentMethodId,
    })
    return payment
  }
}
