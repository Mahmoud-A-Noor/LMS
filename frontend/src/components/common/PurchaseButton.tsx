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
  const { data, loading, error, request } = useApi(
    `/purchases/user-own-product`,
    "POST"
  );

  const { request: checkoutRequest } = useApi("/stripe-custom/checkout", "POST");

  useEffect(() => {
    const fetchData = async () => {
      await request({ productId, userId }, null);
    };

    fetchData();
  }, [productId, userId]);

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

  if (data === true)
    return (
      <Button className="text-xl h-auto py-4 px-8 rounded-lg" disabled>
        You Already Own This Product
      </Button>
    );

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
