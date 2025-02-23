"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useToast() {
  return {
    alertSuccess: (msg: string) => toast.success(msg),
    alertError: (msg: string) => toast.error(msg),
    alertWarning: (msg: string) => toast.warning(msg),
    alertInfo: (msg: string) => toast.info(msg),
  };
}
