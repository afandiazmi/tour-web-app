/* eslint-disable */
// cSpell:disable
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51McqV8ITOPej6kWmuPZSbDVMt8lo94M027zfILfh8gXjDo469ho6aeHo5MdKLAHpRh5wggXVYGHrQ5ducKLZCfYI00Xn9I584W'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
