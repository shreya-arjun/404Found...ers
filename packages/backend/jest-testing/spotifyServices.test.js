import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";
import {getUserId, getTopArtists } from "../services/spotifyServices.js"; 

test("should return the user id when the response is successful", async () => {
    global.fetch = jest.fn();
    const userData = { id: "abc123" };
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(userData) });
    const accessToken = "";
    const res = await getUserId(accessToken);

    expect(res).toBe("abc123");
    expect(global.fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/me", {
        headers: {
        "Authorization": "Bearer " + accessToken,
        },
    });
});

