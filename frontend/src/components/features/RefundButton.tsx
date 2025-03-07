"use client";

import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";


const RefundButton = ({ paymentIntentId }: { paymentIntentId: string }) => {
    
    const {data, request, loading, error} = useApi(`/stripe-custom/refund`, "POST")
    const {alertError, alertSuccess} = useToast()
    const router = useRouter();
    
    async function refundPurchase() {
        try {
            const response = await request(null, paymentIntentId)
            if(!loading){
                if(error){
                    alertError("Failed to process refund")
                }else{
                    alertSuccess("Refund processed successfully")
                    router.refresh();
                }
            }
        } catch (err) {
            console.error("Refund error:", err)
            alertError("An error occurred while processing the refund")
        }
    }

  return (
    <Button variant="outline" onClick={()=>refundPurchase()}>
        Refund
    </Button>
  );
};

export default RefundButton;