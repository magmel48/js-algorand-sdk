import JSONRequest from '../jsonrequest';
import { HTTPClient } from '../../client';
import { IntDecoding } from '../../../types/intDecoding';

export default class LookupAccountByID extends JSONRequest {
  constructor(
    c: HTTPClient,
    intDecoding: IntDecoding,
    private account: string
  ) {
    super(c, intDecoding);
    this.account = account;
  }

  path() {
    return `/v2/accounts/${this.account}`;
  }

  round(round: number) {
    this.query.round = round;
    return this;
  }
}
