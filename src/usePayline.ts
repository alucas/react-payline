import { useContext } from "react";
import PaylineContext from "./PaylineContext";

// See https://docs.payline.com/display/DT/API+JavaScript for full documentation of Payline API
type PaylineApi = {
  endToken: (
    additionnalData: any,
    callback: () => void,
    spinner: any,
    handledByMerchant: boolean
  ) => void;
  finalizeShortCut: () => void;
  getBuyerShortCut: () => Record<string, unknown>;
  getCancelAndReturnUrls: () => { returnUrl: string; cancelUrl: string };
  getContextInfo: (key: string) => Record<string, unknown>;
  getCssIframeWhiteList: () => string[];
  getFragmentedPaymentInfo: () => Record<string, unknown>;
  getLanguage: () => string;
  getOrderInfos: () => Record<string, unknown>;
  getRecurringDetails: () => Record<string, unknown>;
  getToken: () => string;
  getTokenStatus: (
    token: string,
    callback: (tokenStatus: 'ALIVE' | 'EXPIRED' | 'UNKNOWN') => void
  ) => void;
  hide: () => void;
  init: () => void;
  isSandBox: () => boolean;
  reset: (token?: string, template?: string) => void;
  show: () => void;
  toggle: () => void;
  updateWebpaymentData: (token: string, data: any) => void;
};

declare global {
  interface Window {
    Payline?: { Api: PaylineApi };
  }
}

const usePayline = () => {
  if (typeof window === 'undefined') return undefined;
  if (!useContext(PaylineContext).isLoaded) return undefined

  if (!window.Payline)
    throw new Error('window.Payline is unavailable. Check if PaylineProvider is rendered within the component tree.');
  return window.Payline.Api;
};

export default usePayline;
