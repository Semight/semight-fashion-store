"use client";

import React, { useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

const Payment = () => {
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const amount = cart.reduce((total, item) => {
      const price =
        typeof item.product.price === "string"
          ? parseFloat(item.product.price.replace("$", ""))
          : item.product.price;
      return total + price * item.quantity;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  const config = {
    public_key: "FLWPUBK-5eb220aa617d61f1edb89faa2b8d2e4e-X",
    tx_ref: Date.now().toString(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email || "guest@example.com",
      phone_number: user?.phone || "08012345678",
      name: user?.name || "Guest User",
    },
    customizations: {
      title: "Semight Fashion Store",
      description: "Payment for items in cart",
      logo: "@/assets/my-logo2.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          // console.log("Payment successful:", response);
          // Perform further actions like updating backend or clearing cart
          closePaymentModal(); // Close the Flutterwave modal programmatically
        } else {
          console.error("Payment failed:", response);
        }
      },
      onClose: () => {
        // console.log("Payment modal closed");
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Payment
      </h1>
      <p className="text-base md:text-lg mb-4 text-center md:text-left">
        Total Amount:{" "}
        <span className="font-semibold">#{totalAmount.toFixed(2)}</span>
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
