import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(
  "pk_test_51LpgftCdfvkiQW99IawLGfsFBMeldp7EPuWXIZsWfIBDtzFE34eVtE9Zd2ScLLdppN7RIliGjt4n8XYZxi86zAJ400BzD77nt8"
);



function PaymentForm({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  onCaptureCheckout,
  timeout
}) {

    console.log(shippingData)


  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
        console.log(shippingData)
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      timeout()
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
            
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  
                  color="primary"
                >
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}

export default PaymentForm;

