export type SigningPurpose =
  | "CONTROLLER_OPERATION"
  | "AUTHENTICATION_PROOF"
  | "DELEGATION_PROOF";

export type SignRequest = {
  purpose: SigningPurpose;
  identity: string;
  operation: Uint8Array;
  display: string;
};

export interface SigningProvider {
  getPublicKey(): Promise<Uint8Array>;
  getMethodId(): Promise<Uint8Array>;
  sign(request: SignRequest): Promise<Uint8Array>;
}