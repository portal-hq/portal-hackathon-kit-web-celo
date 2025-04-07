import { useState, useEffect } from "react";
import { toast } from "sonner";
import Portal from "@portal-hq/web";
import { appConfig } from "@/config";

export interface UsePortalWalletReturn {
  portal: Portal | undefined;
  eip155Address: string;
  assets: CeloAssets | undefined;
  error: string | undefined;
  clientApiKey: string;
  setClientApiKey: (key: string) => void;
  initializeWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getAssets: () => Promise<CeloAssets | undefined>;
  handleFundWallet: () => Promise<void>;
  sendTokens: (params: {
    to: string;
    tokenMint: string;
    amount: string;
  }) => Promise<string | undefined>;
}

export function usePortalWallet(): UsePortalWalletReturn {
  // State
  const [assets, setAssets] = useState<CeloAssets | undefined>(undefined);
  const [portal, setPortal] = useState<Portal | undefined>(undefined);
  const [eip155Address, setEip155Address] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [clientApiKey, setClientApiKey] = useState<string>("");

  // Check configuration on load
  useEffect(() => {
    isConfigValid();
  }, []);

  const isConfigValid = (): boolean => {
    if (!appConfig.chainId) {
      toast.error("Chain ID is missing in config");
      return false;
    }

    return true;
  };

  const getEip155AddressFrom = async (portalInstance: Portal) => {
    const eip155Address = await portalInstance.getEip155Address();
    setEip155Address(eip155Address);
    return eip155Address;
  };

  const getAssetsFrom = async (portalInstance: Portal) => {
    const assets = (await portalInstance.getAssets(
      appConfig.chainId
    )) as unknown as CeloAssets;
    setAssets(assets);
    return assets;
  };

  const getAssets = async () => {
    if (!portal) return;
    const assets = (await portal.getAssets(
      appConfig.chainId
    )) as unknown as CeloAssets;
    setAssets(assets);
    return assets;
  };

  const initializeWallet = async () => {
    if (!clientApiKey) {
      toast.error("Please enter a Portal Client API Key");
      return;
    }

    const portalInstance = new Portal({
      apiKey: clientApiKey,
      autoApprove: true,
      rpcConfig: appConfig.rpcConfig,
    });
    setPortal(portalInstance);

    portalInstance.onReady(async () => {
      try {
        // Check if wallet exists
        const client = await portalInstance.getClient();

        // Create wallet if it doesn't exist
        if (client?.wallets?.length === 0) {
          await portalInstance.createWallet();
          await getEip155AddressFrom(portalInstance);
          await getAssetsFrom(portalInstance);
          toast.success("Wallet created successfully!");
          return;
        }

        // Wallet exists - check if it's on device
        const isOnDevice = await portalInstance.isWalletOnDevice();
        if (!isOnDevice) {
          const errorMessage =
            "Your wallet exists but is not on this device. You need to create a new Test Portal Client API Key from the Portal Dashboard and update your config.";
          toast.error(errorMessage, { duration: 10000 });
          setError(errorMessage);
          return;
        }

        // Wallet exists and is on device - get wallet details
        await getEip155AddressFrom(portalInstance);
        await getAssetsFrom(portalInstance);
      } catch (error) {
        toast.error(`Error: ${error}`);
        setError(`Error: ${error}`);
      }
    });
  };

  const disconnectWallet = () => {
    setPortal(undefined);
    setEip155Address("");
    setAssets(undefined);
  };

  const handleFundWallet = async () => {
    if (!portal) return;

    try {
      toast.info("Requesting testnet CELO...");
      await portal.receiveTestnetAsset(appConfig.chainId, {
        amount: "0.1",
        token: "CELO",
      });
      toast.success("Wallet funded with testnet CELO!");
    } catch (error) {
      toast.error(`Failed to fund wallet: ${error}`);
    }
  };

  const sendTokens = async ({
    to,
    tokenMint,
    amount,
  }: {
    to: string;
    tokenMint: string;
    amount: string;
  }) => {
    if (!portal) return;

    if (!to || !tokenMint || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      toast.info("Sending tokens...");
      const transactionHash = (await portal.sendAsset(appConfig.chainId, {
        to,
        token: tokenMint,
        amount,
      })) as unknown as string;

      // Check if transactionHash failed
      if (!transactionHash) {
        toast.error("Failed to send tokens");
        return;
      }

      toast.success(`Sent tokens successfully!`, {
        duration: 10000,
        action: {
          label: "View on Explorer",
          onClick: () => {
            window.open(
              `https://celo-alfajores.blockscout.com/tx/${transactionHash}`,
              "_blank"
            );
          },
        },
      });

      // Refresh assets
      await getAssets();
      return transactionHash;
    } catch (error) {
      toast.error(`Failed to send tokens: ${error}`);
    }
  };

  return {
    portal,
    eip155Address,
    assets,
    error,
    clientApiKey,
    setClientApiKey,
    initializeWallet,
    disconnectWallet,
    getAssets,
    handleFundWallet,
    sendTokens,
  };
}
