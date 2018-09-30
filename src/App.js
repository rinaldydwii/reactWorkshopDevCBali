import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar';
import Product from './Product';
import ShoppingCart from './ShoppingCart';

class App extends Component {
  state = {
    isLoading: false,
    products: [],
    cartItems: []
  };
  handleAddItemToCart = (product) => {
    let cartItems = this.state.cartItems;

    const alreadyExist = cartItems.some(cartItem => cartItem.product.id === product.id);
    
    if (alreadyExist) {
      cartItems.map(item => {
        if (item.product.id === product.id)
          item.quantity++;
        return item;
      })
    } else {
      cartItems.push({
        product: product,
        quantity: 1
      });
    }
    this.setState({ cartItems: cartItems });
  }
  handleRemoveItemFromCart = (product) => {
    let cartItems = this.state.cartItems;
    const alreadyExist = cartItems.some(cartItem => cartItem.product.id === product.id);

    if (alreadyExist) {
      cartItems.map((item,key) => {
        if (item.product.id === product.id) {
          if (item.quantity > 1) 
            item.quantity--;
          else 
            cartItems.splice(key,1);
        }
        return item;
      })
    }
    
    this.setState({ cartItems: cartItems });
  }
  componentDidMount() {
    this.setState({isLoading: true});
    fetch('https://product-list.glitch.me/')
    .then(res => res.json())
    .then(products => this.setState({products: products, isLoading: false}));
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="columns">
          <div className="column is-two-thirds">
            <div>
              <h3 className="title">Our Products</h3>
              <div className="columns">
                { this.state.isLoading ? 'Loading..' : 
                  this.state.products.map(product => ( <Product product={ product } key={ product.id } onAddItemToCart={ this.handleAddItemToCart } /> ))
                }
              </div>
            </div>
          </div>
          <ShoppingCart cartItems={ this.state.cartItems } onRemoveItemFromCart= { this.handleRemoveItemFromCart } />
        </div>
      </div>
    );
  }
}

export default App;
