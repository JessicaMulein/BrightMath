export default class NotImplementedError extends Error {
static NotImplementedMessage = 'Not implemented';
  public constructor (message?: string) {
    super(NotImplementedError.NotImplementedMessage + (message ? ': ' + message : ''));
    this.name = 'NotImplementedError';
  }
}