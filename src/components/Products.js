import React, { Component } from "react";
import formatCurrency from "../utiles";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    onClick={() => this.openModal(product)}
                    href={"#" + product._id}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div> {formatCurrency(product.price)} </div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add to Card
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true}>
            <Zoom>
            <button className="close-modal" onClick={this.closeModal}>X</button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                  <strong>{product.title}</strong>
                  </p>
                  <p>
                  {product.description}
                  </p>
                  <p>
                  AvailableSizes: {product.availableSizes.map((x => (
                    <span>
                      <button className="button"> {x} </button>
                    </span>
                  )))}
                  </p>
                  <div className="product-price">
                    <div> {formatCurrency(product.price)} </div>
                    <button className="button primary" onClick={()=>{
                      this.props.addToCart(product);
                      this.closeModal();
                    }}>Add to Cart</button>
                  </div>
                </div>
              </div>
              </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
