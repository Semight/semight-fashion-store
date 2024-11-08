"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";

const FLUTTERWAVE_PAYMENT_LINK = "https://sandbox-flw-web-v3.herokuapp.com/pay/1wtjngidgodk";

const Payment = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();


    // const config = {
  //   public_key: "FLWPUBK-5eb220aa617d61f1edb89faa2b8d2e4e-X",
  //   tx_ref: Date.now().toString(),
  //   amount: model.amount,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: email,
  //     phone_number: phoneNumber,
  //     name: fullName,
  //   },
  //   customizations: {
  //     title: "Wallet Topup",
  //     description: "Topup for Enterprisiin wallet",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    const amount = cart.reduce((total, item) => {
      const price = typeof item.product.price === 'string'
        ? parseFloat(item.product.price.replace('$', ''))
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  const handlePayment = () => {
    if (!isAuthenticated) {
      console.log("User is authenticated:", isAuthenticated);
      router.push('/login');
    } else {
      window.location.href = FLUTTERWAVE_PAYMENT_LINK;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">Payment</h1>
      <p className="text-base md:text-lg mb-4 text-center md:text-left">
        Total Amount: <span className="font-semibold">#{totalAmount.toFixed(2)}</span>
      </p>
      <div className="flex justify-center md:justify-start">
        <button
          className="w-full md:w-auto py-2 px-4 rounded-md text-white bg-primary hover:bg-primary-1 transition-all duration-300"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
