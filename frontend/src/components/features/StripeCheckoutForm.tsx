"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { Product } from "@/types/product";
import { User } from "@/types/user";

const StripeCheckoutForm = ({ product, user }: { product: Product; user: User }) => {
  const router = useRouter();
  
  // Use the useApi hook to create a purchase session
  const { request, loading, error } = useApi("/stripe/checkout", "POST");

  const handleCheckout = async () => {
    try {
      const response = await request({
        productId: product.id,
        userId: user.id,
      });

      if (response.data && response.data.sessionUrl) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.sessionUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.priceInDollars}</p>
      <button
        onClick={handleCheckout}
        disabled={loading || !!error}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default StripeCheckoutForm;
