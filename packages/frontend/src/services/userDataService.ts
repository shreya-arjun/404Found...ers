
export class UserDataService {
    
    public static async fetchPreviousSuggestions() : Promise<any> {
        try {
            const response = await fetch("previousUserSuggestionRoute");
            if (!response.ok) {
                throw new Error(`HTTP Error | Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error while fetching suggestions | Code: ${error}`);
        }
    }

    public static async fetchUserAccountData() : Promise<any> {
        try {
            const response = await fetch("previousUserAccountDataRoute");
            if (!response.ok) {
                throw new Error(`HTTP Error | Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error while fetching suggestions | Code: ${error}`);
        }
    }
}