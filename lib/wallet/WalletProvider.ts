import type { SigningProvider } from "./SigningProvider";

export type WalletIdentity = {
  identity: string;
  status: "ACTIVE" | "DEACTIVATED";
  sequence: number;
};

export type WalletCapabilities = {
  canCreateAgents: boolean;
  canDelegate: boolean;
  signingProvider: "browser" | "native" | "enterprise" | "hardware";
};

export interface WalletProvider {
  getIdentity(): Promise<WalletIdentity>;
  getCapabilities(): Promise<WalletCapabilities>;
  getSigningProvider(): Promise<SigningProvider>;
  lock(): Promise<void>;
}

// Milestone A deliberately has no private-key implementation.
// Browser/native/enterprise custody providers will plug in behind this interface.
