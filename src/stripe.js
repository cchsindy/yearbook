import { loadStripe } from '@stripe/stripe-js'

export default class StripeService {
  constructor(div) {
    this.card = null
    this.div = div
    this.elements = null
    this.stripe = null
    this.load()
  }

  async intent(data) {
    const intent = await this.stripe.retrievePaymentIntent(data.clientSecret)
    return intent
  }

  async load() {
    // pk_live_fIxJlqxQbJRICEasZvxs2QK600EmFoZAiO
    this.stripe = await loadStripe('pk_test_wgPmrDXSBM6AamX7WP2VqBjq00wuxOvppL')
    this.elements = this.stripe.elements()
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
    this.card = this.elements.create('card', { style: style })
    this.mountCard()
  }

  async method() {
    const method = await this.stripe.createPaymentMethod('card', this.card)
    return method
  }

  mountCard() {
    this.card.mount(this.div)
  }
}
