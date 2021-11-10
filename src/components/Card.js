import React from "react";
import Card from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';

export default class CreditCard extends React.Component {
  render() {
    return (
          <Card
            name="John Smith"
            number="5555 4444 3333 1111"
            expiry="10/20"
            cvc="737"
            issuer="visa"
          />
    );
  }
}