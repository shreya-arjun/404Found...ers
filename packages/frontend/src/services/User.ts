export class User {
  private userId: string;
  private userSecret: string;
  private userToken: string;

  constructor(userId: string, userSecret: string, userToken: string) {
    this.userId = userId;
    this.userSecret = userSecret;
    this.userToken = userToken;
  }
}
