import { HTTPClient } from '../../client';
import { IntDecoding } from '../../../types/intDecoding';
import modelsv2 from './models/types';
import AccountInformation from './accountInformation';
import Block from './block';
import Compile from './compile';
import Dryrun from './dryrun';
import GetAssetByID from './getAssetByID';
import GetApplicationByID from './getApplicationByID';
import HealthCheck from './healthCheck';
import PendingTransactionInformation from './pendingTransactionInformation';
import PendingTransactions from './pendingTransactions';
import PendingTransactionsByAddress from './pendingTransactionsByAddress';
import SendRawTransaction from './sendRawTransaction';
import Status from './status';
import StatusAfterBlock from './statusAfterBlock';
import SuggestedParams from './suggestedParams';
import Supply from './supply';
import Versions from './versions';

export default class AlgodClient {
  private c: HTTPClient;
  private intDecoding: IntDecoding;

  constructor(
    token = '',
    baseServer = 'http://r2.algorand.network',
    port = 4180,
    headers = {}
  ) {
    // workaround to allow backwards compatibility for multiple headers
    let tokenHeader: string | Record<string, string> = token;
    if (typeof tokenHeader === 'string') {
      tokenHeader = { 'X-Algo-API-Token': tokenHeader };
    }

    // Get client
    this.c = new HTTPClient(tokenHeader, baseServer, port, headers);
    this.intDecoding = 'default';
  }

  /**
   * Set the default int decoding method for all JSON requests this client creates.
   * @param {"default" | "safe" | "mixed" | "bigint"} method The method to use when parsing the
   *   response for request. Must be one of "default", "safe", "mixed", or "bigint". See
   *   JSONRequest.setIntDecoding for more details about what each method does.
   */
  setIntEncoding(method: IntDecoding) {
    this.intDecoding = method;
  }

  /**
   * Get the default int decoding method for all JSON requests this client creates.
   */
  getIntEncoding() {
    return this.intDecoding;
  }

  healthCheck() {
    return new HealthCheck(this.c);
  }

  versionsCheck() {
    return new Versions(this.c);
  }

  sendRawTransaction(stxOrStxs: Uint8Array | Uint8Array[]) {
    return new SendRawTransaction(this.c, stxOrStxs);
  }

  /**
   * Returns the given account's information.
   * @param {string} account The address of the account to look up.
   */
  accountInformation(account: string) {
    return new AccountInformation(this.c, this.intDecoding, account);
  }

  /**
   * Gets the block info for the given round.
   * @param {number} roundNumber The round number of the block to get.
   */
  block(roundNumber: number) {
    return new Block(this.c, roundNumber);
  }

  /**
   * Returns the transaction information for a specific pending transaction.
   * @param {string} txid The TxID string of the pending transaction to look up.
   */
  pendingTransactionInformation(txid: string) {
    return new PendingTransactionInformation(this.c, txid);
  }

  /**
   * Returns transactions that are pending in the pool.
   */
  pendingTransactionsInformation() {
    return new PendingTransactions(this.c);
  }

  /**
   * Returns transactions that are pending in the pool sent by a specific sender.
   * @param {string} address The address of the sender.
   */
  pendingTransactionByAddress(address: string) {
    return new PendingTransactionsByAddress(this.c, address);
  }

  /**
   * Retrieves the StatusResponse from the running node.
   */
  status() {
    return new Status(this.c, this.intDecoding);
  }

  /**
   * Waits for a specific round to occur then returns the StatusResponse for that round.
   * @param {number} round The number of the round to wait for.
   */
  statusAfterBlock(round: number) {
    return new StatusAfterBlock(this.c, this.intDecoding, round);
  }

  /**
   * Returns the common needed parameters for a new transaction.
   */
  getTransactionParams() {
    return new SuggestedParams(this.c);
  }

  /**
   * Gets the supply details for the specified node's ledger.
   */
  supply() {
    return new Supply(this.c, this.intDecoding);
  }

  compile(source: string) {
    return new Compile(this.c, source);
  }

  dryrun(dr: modelsv2.DryrunSource) {
    return new Dryrun(this.c, dr);
  }

  /**
   * Given an asset ID, return asset information including creator, name, total supply and
   * special addresses.
   * @param {number} index The asset ID to look up.
   */
  getAssetByID(index: number) {
    return new GetAssetByID(this.c, this.intDecoding, index);
  }

  /**
   * Given an application ID, it returns application information including creator, approval
   * and clear programs, global and local schemas, and global state.
   * @param {number} index The application ID to look up.
   */
  getApplicationByID(index: number) {
    return new GetApplicationByID(this.c, this.intDecoding, index);
  }
}