"use client"
import { useCart } from '@/Context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const handleCheckout = () => {
    // Add payment integration here
    clearCart();
    alert('Checkout successful!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-light-black-7">{item.product.price}</p>
                <p className="text-light-black-7">Quantity: {item.quantity}</p>
                {item.size && <p className="text-light-secondary">Size: {item.size}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-8 py-2 px-4 rounded-md text-white bg-secondary hover:bg-light-yellow"
        onClick={handleCheckout}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Checkout;
