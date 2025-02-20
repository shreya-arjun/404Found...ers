export class SpotifyLoginService {
  public static async logUserIn() {
    // begin the PKCE Flow
    localStorage.setItem("isLoggedIn", "true");
    console.log("true");
    return "logged in";
    // at the end, add user token and user name to local storage
  }
}
