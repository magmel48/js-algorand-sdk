/**
 * Enum for application transaction types.
 *
 * The full list is availabe at https://developer.algorand.org/docs/reference/transactions/
 */
export declare enum TransactionType {
    /**
     * Payment transaction
     */
    pay = "pay",
    /**
     * Key registration transaction
     */
    keyreg = "keyreg",
    /**
     * Asset configuration transaction
     */
    acfg = "acfg",
    /**
     * Asset transfer transaction
     */
    axfer = "axfer",
    /**
     * Asset freeze transaction
     */
    afrz = "afrz",
    /**
     * Application transaction
     */
    appl = "appl"
}
/**
 * Enums for application transactions on-transaction-complete behavior
 */
export declare enum OnApplicationComplete {
    /**
     * NoOpOC indicates that an application transaction will simply call its
     * ApprovalProgram
     */
    NoOpOC = 0,
    /**
     * OptInOC indicates that an application transaction will allocate some
     * LocalState for the application in the sender's account
     */
    OptInOC = 1,
    /**
     * CloseOutOC indicates that an application transaction will deallocate
     * some LocalState for the application from the user's account
     */
    CloseOutOC = 2,
    /**
     * ClearStateOC is similar to CloseOutOC, but may never fail. This
     * allows users to reclaim their minimum balance from an application
     * they no longer wish to opt in to.
     */
    ClearStateOC = 3,
    /**
     * UpdateApplicationOC indicates that an application transaction will
     * update the ApprovalProgram and ClearStateProgram for the application
     */
    UpdateApplicationOC = 4,
    /**
     * DeleteApplicationOC indicates that an application transaction will
     * delete the AppParams for the application from the creator's balance
     * record
     */
    DeleteApplicationOC = 5
}
/**
 * A dict holding common-to-all-txns arguments
 */
export interface SuggestedParams {
    /**
     * Set this to true to specify fee as microalgos-per-txn
     *   If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum
     */
    flatFee?: boolean;
    /**
     * Integer fee per byte, in microAlgos. For a flat fee, set flatFee to true
     */
    fee: number;
    /**
     * First protocol round on which this txn is valid
     */
    firstRound: number;
    /**
     * Last protocol round on which this txn is valid
     */
    lastRound: number;
    /**
     * Specifies genesis ID of network in use
     */
    genesisID: string;
    /**
     * Specifies hash genesis block of network in use
     */
    genesisHash: string;
}
/**
 * A full list of all available transaction parameters
 *
 * The full documentation is available at:
 * https://developer.algorand.org/docs/reference/transactions/#common-fields-header-and-type
 */
export interface TransactionParams {
    /**
     * String representation of Algorand address of sender
     */
    from: string;
    /**
     * String representation of Algorand address of recipient
     */
    to: string;
    /**
     * Integer fee per byte, in microAlgos. For a flat fee, set flatFee to true
     */
    fee: number;
    /**
     * Integer amount to send
     */
    amount: number;
    /**
     * Integer first protocol round on which this txn is valid
     */
    firstRound: number;
    /**
     * Integer last protocol round on which this txn is valid
     */
    lastRound: number;
    /**
     * Arbitrary data for sender to store
     */
    note?: Uint8Array;
    /**
     * Specifies genesis ID of network in use
     */
    genesisID: string;
    /**
     * Specifies hash genesis block of network in use
     */
    genesisHash: string;
    /**
     * Lease a transaction. The sender cannot send another txn with that same lease until the last round of original txn has passed
     */
    lease?: Uint8Array;
    /**
     * Close out remaining account balance to this account
     */
    closeRemainderTo?: string;
    /**
     * String representation of voting key. For key deregistration, leave undefined
     */
    voteKey: string;
    /**
     * String representation of selection key. For key deregistration, leave undefined
     */
    selectionKey: string;
    /**
     * First round on which voteKey is valid
     */
    voteFirst: number;
    /**
     * Last round on which voteKey is valid
     */
    voteLast: number;
    /**
     * The dilution fo the 2-level participation key
     */
    voteKeyDilution: number;
    /**
     * Asset index uniquely specifying the asset
     */
    assetIndex: number;
    /**
     * Total supply of the asset
     */
    assetTotal: number;
    /**
     * Integer number of decimals for asset unit calcuation
     */
    assetDecimals: number;
    /**
     * Whether asset accounts should default to being frozen
     */
    assetDefaultFrozen: boolean;
    /**
     * String representation of Algorand address in charge of reserve, freeze, clawback, destruction, etc.
     */
    assetManager: string;
    /**
     * String representation of Algorand address representing asset reserve
     */
    assetReserve: string;
    /**
     * String representation of Algorand address with power to freeze/unfreeze asset holdings
     */
    assetFreeze: string;
    /**
     * String representation of Algorand address with power to revoke asset holdings
     */
    assetClawback: string;
    /**
     * Unit name for this asset
     */
    assetUnitName: string;
    /**
     * Name for this asset
     */
    assetName: string;
    /**
     * URL relating to this asset
     */
    assetURL: string;
    /**
     * Uint8Array or UTF-8 string representation of a hash commitment with respect to the asset. Must be exactly 32 bytes long.
     */
    assetMetadataHash: Uint8Array | string;
    /**
     * String representation of Algorand address being frozen or unfrozen
     */
    freezeAccount: string;
    /**
     * true if freezeTarget should be frozen, false if freezeTarget should be allowed to transact
     */
    freezeState: boolean;
    /**
     * String representation of Algorand address – if provided, and if "from" is
     * the asset's revocation manager, then deduct from "revocationTarget" rather than "from"
     */
    assetRevocationTarget?: string;
    /**
     * A unique application index
     */
    appIndex: number;
    /**
     * What application should do once the program has been run
     */
    appOnComplete: OnApplicationComplete;
    /**
     * Restricts number of ints in per-user local state
     */
    appLocalInts: number;
    /**
     * Restricts number of byte slices in per-user local state
     */
    appLocalByteSlices: number;
    /**
     * Restricts number of ints in global state
     */
    appGlobalInts: number;
    /**
     * Restricts number of byte slices in global state
     */
    appGlobalByteSlices: number;
    /**
     * The compiled TEAL that approves a transaction
     */
    appApprovalProgram: Uint8Array;
    /**
     * The compiled TEAL program that runs when clearing state
     */
    appClearProgram: Uint8Array;
    /**
     * Array of Uint8Array, any additional arguments to the application
     */
    appArgs?: Uint8Array[];
    /**
     * Array of Address strings, any additional accounts to supply to the application
     */
    appAccounts?: string[];
    /**
     * Array of int, any other apps used by the application, identified by index
     */
    appForeignApps?: number[];
    /**
     * Array of int, any assets used by the application, identified by index
     */
    appForeignAssets?: number[];
    /**
     * Transaction type
     */
    type?: TransactionType;
    /**
     * Set this to true to specify fee as microalgos-per-txn.
     *
     * If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum
     */
    flatFee?: boolean;
    /**
     * A dict holding common-to-all-txns arguments
     */
    suggestedParams: SuggestedParams;
    /**
     * String representation of the Algorand address that will be used to authorize all future transactions
     */
    reKeyTo?: string;
    /**
     * Set this value to true to mark this account as nonparticipating.
     *
     * All new Algorand accounts are participating by default. This means they earn rewards.
     */
    nonParticipation?: boolean;
}
