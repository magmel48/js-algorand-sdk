import JSONRequest from '../jsonrequest';
import { HTTPClient } from '../../client';
import { IntDecoding } from '../../../types/intDecoding';

export default class LookupApplications extends JSONRequest {
  constructor(c: HTTPClient, intDecoding: IntDecoding, private index: number) {
    super(c, intDecoding);
    this.index = index;
  }

  path() {
    return `/v2/applications/${this.index}`;
  }

  // specific round to search
  round(round: number) {
    this.query.round = round;
    return this;
  }
}
