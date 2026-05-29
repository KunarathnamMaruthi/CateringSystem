class StripeService {
  stripePayment(amount) {
    return `Stripe payment successful: ${amount}`;
  }
}

class PaymentAdapter {
  constructor() {
    this.stripe = new StripeService();
  }

  pay(amount) {
    return this.stripe.stripePayment(amount);
  }
}

module.exports = PaymentAdapter;