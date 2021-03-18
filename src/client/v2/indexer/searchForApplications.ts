import JSONRequest from '../jsonrequest';

export default class SearchForApplications extends JSONRequest {
  // eslint-disable-next-line class-methods-use-this
  path() {
    return '/v2/applications';
  }

  // application ID for filter, as int
  index(index: number) {
    this.query['application-id'] = index;
    return this;
  }

  // specific round to search
  round(round: number) {
    this.query.round = round;
    return this;
  }

  // token for pagination
  nextToken(next: string) {
    this.query.next = next;
    return this;
  }

  // limit results for pagination
  limit(limit: number) {
    this.query.limit = limit;
    return this;
  }
}
