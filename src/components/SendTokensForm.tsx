import React, { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

interface TokenOption {
  symbol: string;
  name: string;
  balance: string;
  value: string;
}

interface SendTokensFormProps {
  nativeBalance?: {
    name: string;
    symbol: string;
    balance: string;
  };
  tokenBalances?: {
    name: string;
    symbol: string;
    balance: string;
    metadata: {
      tokenAddress?: string;
    };
  }[];
  sendTokens: (params: {
    to: string;
    tokenMint: string;
    amount: string;
  }) => Promise<string | undefined>;
}

export function SendTokensForm({
  nativeBalance,
  tokenBalances = [],
  sendTokens,
}: SendTokensFormProps) {
  // Form state
  const [to, setTo] = useState<string>("");
  const [tokenMint, setTokenMint] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  // Prepare token options
  const tokenOptions: TokenOption[] = [];

  // Add native token
  if (nativeBalance) {
    tokenOptions.push({
      symbol: nativeBalance.symbol,
      name: nativeBalance.name,
      balance: nativeBalance.balance,
      value: "CELO",
    });
  }

  // Add other tokens
  tokenBalances.forEach((token) => {
    if (token.metadata.tokenAddress) {
      tokenOptions.push({
        symbol: token.symbol,
        name: token.name,
        balance: token.balance,
        value: token.metadata.tokenAddress,
      });
    }
  });

  // Handle send
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      await sendTokens({ to, tokenMint, amount });
      // Reset form
      setTo("");
      setTokenMint("");
      setAmount("");
    } finally {
      setSending(false);
    }
  };

  // Get the selected token's balance
  const selectedToken = tokenOptions.find((token) => token.value === tokenMint);
  const maxAmount = selectedToken ? Number(selectedToken.balance) : 0;

  return (
    <Card title="Send Tokens" description="Transfer tokens to another address">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Recipient Address"
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Enter the recipient's address"
          disabled={sending}
          required
        />

        <Select
          label="Token"
          value={tokenMint}
          onChange={(e) => setTokenMint(e.target.value)}
          options={[
            { value: "", label: "Select a token" },
            ...tokenOptions.map((token) => ({
              value: token.value,
              label: `${token.symbol} - ${Number(token.balance).toFixed(3)}`,
            })),
          ]}
          disabled={sending}
          required
        />

        <div>
          <Input
            label="Amount"
            type="number"
            step="0.001"
            min="0.001"
            max={maxAmount.toString()}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.000"
            disabled={sending}
            required
          />
          {selectedToken && (
            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Available: {Number(selectedToken.balance).toFixed(3)}</span>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => setAmount(selectedToken.balance)}
                disabled={sending}
              >
                Max
              </button>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="success"
            isLoading={sending}
            disabled={
              sending ||
              !to ||
              !tokenMint ||
              !amount ||
              Number(amount) <= 0 ||
              (selectedToken && Number(amount) > Number(selectedToken.balance))
            }
            fullWidth
          >
            {sending ? "Sending..." : "Send Tokens"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
