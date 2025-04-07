import React from "react";
import { Card } from "./ui/Card";
import { Plus } from "lucide-react";

interface TokenBalance {
  name: string;
  symbol: string;
  balance: string;
  metadata: {
    tokenAddress?: string;
  };
}

interface NativeBalance {
  name: string;
  symbol: string;
  balance: string;
}

interface TokenBalancesProps {
  nativeBalance?: NativeBalance;
  tokenBalances?: TokenBalance[];
  isLoading?: boolean;
}

export function TokenBalances({
  nativeBalance,
  tokenBalances = [],
  isLoading = false,
}: TokenBalancesProps) {
  const renderTokenRow = (
    token: TokenBalance | NativeBalance,
    isNative = false
  ) => {
    const formattedBalance = Number(token.balance).toFixed(3);
    const tokenAddress = !isNative
      ? (token as TokenBalance).metadata?.tokenAddress
      : undefined;

    return (
      <tr
        key={token.symbol}
        className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-semibold text-sm mr-3">
              {token.symbol.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{token.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {token.symbol}
              </div>
            </div>
          </div>
          {tokenAddress && (
            <div
              className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono ml-11"
              title={tokenAddress}
            >
              {`${tokenAddress.slice(0, 10)}...${tokenAddress.slice(-8)}`}
            </div>
          )}
        </td>
        <td className="px-4 py-3 text-right border-b border-gray-200 dark:border-gray-700 font-medium">
          {formattedBalance}
        </td>
      </tr>
    );
  };

  return (
    <Card
      title="Token Balances"
      description="View your current token balances"
      className="mb-6 overflow-hidden"
      isLoading={isLoading}
    >
      {!nativeBalance && tokenBalances.length === 0 ? (
        <div className="text-center py-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
            No tokens found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try funding your wallet with testnet CELO.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Token
                </th>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Native CELO token */}
              {nativeBalance && renderTokenRow(nativeBalance, true)}

              {/* Other tokens */}
              {tokenBalances.map((token) => renderTokenRow(token))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
