import React from "react";
import data from "./data.json";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [],
      size: "",
      sort: "",
    };
  }


  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count ++ ;
        alreadyInCart = true;

      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });

    // to save data after reloading
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  };

  sortProduct = (e) => {
    const sort = e.target.value;
    // console.log(e.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  
  filterProduct = (e) => {
    // console.log(e.target.value);
    const filter = e.target.value;
    if (filter === "ALL") {
      this.setState({ size: filter, products: data.products });
    } else {
      this.setState({
        size: filter,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(filter) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Tasty Burger</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProduct={this.sortProduct}
                filterProduct={this.filterProduct}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeItem={this.removeItem}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All Right Reseved</footer>
      </div>
    );
  }
}

export default App;
