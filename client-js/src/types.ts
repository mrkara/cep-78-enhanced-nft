import { CLType, CLValue, CLKeyParameters } from "casper-js-sdk";

export enum CEP47Events {
  Mint = "Mint",
  Transfer = "Transfer",
  Burn = "Burn",
  MetadataUpdate = "MetadataUpdate",
  Approve = "Approve",
}

export interface CallConfig {
  useSessionCode: boolean;
}

export enum NamedKeyConventionMode {
  DerivedFromCollectionName,
  V1_0Standard,
  V1_0Custom,
}

export enum NFTOwnershipMode {
  Minter,
  Assigned,
  Transferable,
}

export enum NFTKind {
  Physical,
  Digital,
  Virtual,
}

export enum NFTHolderMode {
  Accounts,
  Contracts,
  Mixed,
}

export enum NFTMetadataKind {
  CEP78,
  NFT721,
  Raw,
  CustomValidated,
}

export enum NFTIdentifierMode {
  Ordinal,
  Hash,
}

export enum MetadataMutability {
  Immutable,
  Mutable,
}

export enum MintingMode {
  Installer,
  Public,
}

export enum BurnMode {
  Burnable,
  NonBurnable,
}

export enum WhitelistMode {
  Unlocked,
  Locked,
}

export enum OwnerReverseLookupMode {
  NoLookup,
  Complete,
}

export enum EventsMode {
  NoEvents,
  CEP47,
  CES,
}

export interface JSONSchemaEntry {
  name: string;
  description: string;
  required: boolean;
}

export interface JSONSchemaObject {
  properties: Record<string, JSONSchemaEntry>;
}

export type ConfigurableVariables = {
  allowMinting?: boolean;
  contractWhitelist?: string[];
};

export type InstallArgs = {
  collectionName: string;
  collectionSymbol: string;
  totalTokenSupply: string;
  ownershipMode: NFTOwnershipMode;
  nftKind: NFTKind;
  jsonSchema?: JSONSchemaObject;
  nftMetadataKind: NFTMetadataKind;
  identifierMode: NFTIdentifierMode;
  metadataMutability: MetadataMutability;
  mintingMode?: MintingMode;
  whitelistMode?: WhitelistMode;
  holderMode?: NFTHolderMode;
  burnMode?: BurnMode;
  ownerReverseLookupMode?: OwnerReverseLookupMode;
  namedKeyConventionMode?: NamedKeyConventionMode;
  accessKeyName?: string;
  hashKeyName?: string;
  eventsMode?: EventsMode;
} & ConfigurableVariables;

export interface RegisterArgs {
  tokenOwner: CLKeyParameters;
}

export interface MintArgs {
  owner: CLKeyParameters;
  meta: Record<string, string>;
  collectionName?: string;
}

export interface TokenArgs {
  tokenId?: string;
  tokenHash?: string;
}

export type BurnArgs = TokenArgs;

export type TransferArgs = {
  target: CLKeyParameters;
  source: CLKeyParameters;
} & TokenArgs;

export type TokenMetadataArgs = {
  tokenMetaData: Record<string, string>;
};

export type StoreBalanceOfArgs = {
  tokenOwner: CLKeyParameters;
  keyName: string;
};

export type StoreApprovedArgs = {
  keyName: string;
} & TokenArgs;

export type StoreOwnerOfArgs = StoreApprovedArgs;

export type ApproveArgs = {
  operator: CLKeyParameters;
} & TokenArgs;

export type ApproveAllArgs = {
  operator: CLKeyParameters;
  approveAll: boolean;
  tokenOwner: CLKeyParameters;
};

export type MigrateArgs = {
  collectionName: string;
};

type WriteCLValue = {
  cl_type: string;
  bytes: string;
  parsed: string;
};

type TransformValue = {
  WriteCLValue?: WriteCLValue
};

export interface Transform {
  key: string;
  transform: TransformValue;
}

interface Effect {
  transforms: Transform[];
}

interface ExecutionResultBody {
  cost: number;
  error_message?: string | null;
  transfers: string[];
  effect: Effect;
}

/** Result interface for an execution result */
export interface ExecutionResult {
  Success?: ExecutionResultBody;
  Failure?: ExecutionResultBody;
}

export interface WithRemainder<T> {
  data: T;
  remainder: Uint8Array;
}

export interface RawCLValue {
  clType: CLType;
  bytes: Uint8Array;
}

export interface EventItem {
  id: number;
  body: {
    DeployProcessed: {
      execution_result: ExecutionResult;
    };
  };
}

export interface EventParsed {
  name: string;
  clValue: CLValue;
}
