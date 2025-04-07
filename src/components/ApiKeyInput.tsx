import React from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import { CheckCircle } from "lucide-react";

interface ApiKeyInputProps {
  clientApiKey: string;
  setClientApiKey: (key: string) => void;
  initializeWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isWalletReady: boolean;
}

export function ApiKeyInput({
  clientApiKey,
  setClientApiKey,
  initializeWallet,
  disconnectWallet,
  isWalletReady,
}: ApiKeyInputProps) {
  return (
    <Card
      title="Portal Client API Key"
      description="Enter your Client API Key to initialize your wallet"
      className="mb-6"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            autoFocus
            type="text"
            value={clientApiKey}
            onChange={(e) => setClientApiKey(e.target.value)}
            placeholder="Enter your Client API Key"
            disabled={isWalletReady}
            fullWidth
          />

          {!isWalletReady ? (
            <div className="flex space-x-2">
              <Button
                onClick={initializeWallet}
                disabled={!clientApiKey}
                className="whitespace-nowrap"
              >
                Initialize Wallet
              </Button>
            </div>
          ) : (
            <Button
              onClick={disconnectWallet}
              variant="danger"
              className="whitespace-nowrap"
            >
              Disconnect
            </Button>
          )}
        </div>

        {isWalletReady && (
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-3 rounded-md text-sm">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Your wallet is connected and ready to use</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
