"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";

const PurchaseButton = ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) => {

  const { request: checkoutRequest } = useApi("/stripe-custom/checkout", "POST");


  const handleCheckout = async () => {
    try {
      const response = await checkoutRequest({
        productId: productId,
        userId: userId,
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
    <Button
      onClick={handleCheckout} 
      className="text-xl h-auto py-4 px-8 rounded-lg"
    >
      Buy Now
    </Button>
  );
};

export default PurchaseButton;
