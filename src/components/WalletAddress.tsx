import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Copy, Plus, RefreshCw } from "lucide-react";

interface WalletAddressProps {
  address: string;
  handleFundWallet: () => Promise<void>;
  getAssets: () => Promise<any>;
}

export function WalletAddress({
  address,
  handleFundWallet,
  getAssets,
}: WalletAddressProps) {
  return (
    <Card title="Your Celo Address" className="mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-md p-3 overflow-hidden">
          <code className="text-sm font-mono break-all">{address}</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(address);
              toast.success("Address copied to clipboard");
            }}
            className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Copy address"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleFundWallet} variant="primary">
            <Plus className="h-4 w-4 mr-1.5" />
            Fund with Testnet CELO
          </Button>

          <Button onClick={getAssets} variant="secondary">
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh Balances
          </Button>
        </div>
      </div>
    </Card>
  );
}
