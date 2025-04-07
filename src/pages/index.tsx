import React, { useEffect } from "react";
import { usePortalWallet } from "@/hooks/usePortalWallet";
import Layout from "@/components/Layout";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { WalletAddress } from "@/components/WalletAddress";
import { TokenBalances } from "@/components/TokenBalances";
import { SendTokensForm } from "@/components/SendTokensForm";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Loader2 } from "lucide-react";

export default function Home() {
  // Use our custom hook
  const {
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
  } = usePortalWallet();

  // Refresh assets when portal state changes
  useEffect(() => {
    if (portal?.ready && eip155Address) {
      getAssets();
    }
  }, [portal?.ready, eip155Address]);

  // Handle errors
  if (error) {
    return (
      <Layout>
        <ErrorDisplay error={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Portal Wallet - Hackathon Kit
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A simple wallet application built with Portal using the Celo
            blockchain.{" "}
            <a
              href="https://app.portalhq.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 underline-offset-2 hover:underline"
            >
              Need a Client API Key? Get one here.
            </a>
          </p>
        </div>

        {/* API Key input */}
        <ApiKeyInput
          clientApiKey={clientApiKey}
          setClientApiKey={setClientApiKey}
          initializeWallet={initializeWallet}
          disconnectWallet={disconnectWallet}
          isWalletReady={!!portal?.ready}
        />

        {/* Wallet initialization in progress */}
        {portal && !portal?.ready && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 animate-pulse mb-6">
            <div className="flex items-center space-x-3">
              <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                Wallet is initializing...
              </p>
            </div>
          </div>
        )}

        {/* Wallet interface when connected */}
        {portal?.ready && (
          <div className="space-y-6 animate-fade-in">
            {/* Wallet address */}
            <WalletAddress
              address={eip155Address}
              handleFundWallet={handleFundWallet}
              getAssets={getAssets}
            />

            {/* Token balances */}
            <TokenBalances
              nativeBalance={assets?.nativeBalance}
              tokenBalances={assets?.tokenBalances}
              isLoading={!assets}
            />

            {/* Send tokens form */}
            {Number(assets?.nativeBalance?.balance) > 0 ||
            (assets?.tokenBalances?.length &&
              assets.tokenBalances.length > 0) ? (
              <SendTokensForm
                nativeBalance={assets?.nativeBalance}
                tokenBalances={assets?.tokenBalances}
                sendTokens={sendTokens}
              />
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
}
