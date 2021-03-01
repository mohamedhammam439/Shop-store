import React, { Component } from "react";
import formatCurrency from "../utiles";
import Roll from "react-reveal/Roll";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      adress: "",
      showCheckout: false}
  }

  handelInput = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  createOrder = e => {
    e.preventDefault();
   
  }

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is Empty</div>
          ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the Cart
            </div>
          )}
        </div>
        <div>
          <div className="cart">
          <Roll left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={Math.random()}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} X {item.count} {"   "}
                      <button onClick={() => this.props.removeItem(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </Roll>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={()=>this.setState({ showCheckout: true })}
              >
                Proced
              </button>
            </div>
          )}
 
          {this.state.showCheckout && (
            <Fade right cascade>
            <div className="cart">
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      name="email"
                      onChange={this.handelInput}
                    />
                  </li>
                  <li>
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      onChange={this.handelInput}
                    />
                  </li>
                  <li>
                    <label>Adress</label>
                    <input
                      type="text"
                      required
                      name="adress"
                      onChange={this.handelInput}
                    />
                  </li>
                  <li>
                    <button className="button primary" type="submit" >Checkout</button>
                  </li>
                </ul>
              </form>
            </div>
            </Fade>
          )}
 
        </div>
      </>
    );
  }
}
