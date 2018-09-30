import React from 'react';

function ShoppingCart(props) {
    const total = props.cartItems.reduce((carrier, cartItem) => {
        return carrier + cartItem.quantity * cartItem.product.price
    }, 0);
    return (
        <div className="column">
            <h3 className="title is-4">Shopping Cart</h3>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { props.cartItems.map((item, key) => 
                        (
                        <tr key={ key }>
                            <td>{ item.product.name }</td>
                            <td>{ item.product.price }</td>
                            <td>{ item.quantity }</td>
                            <td><button className="button is-danger is-small" onClick={ event => {
                                event.preventDefault();
                                props.onRemoveItemFromCart(item.product);
                            }}>-</button></td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
            <h3>Total : Rp.{ total }</h3>
        </div>
    )
}

export default ShoppingCart;