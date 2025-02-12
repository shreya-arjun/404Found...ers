import mongoose from "mongoose";
import userModel from "../models/user";
import suggestionModel from "../models/suggestion";

/**
 * Saves a new user to the DB
 * @param {JSON} user 
 */
function addUser(user) {
    const thisUser = new userModel(user);
    const promise = thisUser.save();
    return promise
}

/**
 * Finds an existing user in the DB
 * @param {number} id 
 */
function findUser(id) {
    return userModel.findById(id);
}

/**
 * Removes a user from the DB
 * @param {number} id 
 */
function removeUser(id) {
    return userModel.findByIdAndDelete(id);
}

/**
 * 
 * @param {JSON} suggestion - Instance of a suggestion
 */
function addSuggestion(suggestion) {
    const thisSuggestion = new suggestionModel(suggestion);
    const promise = thisSuggestion.save();
    return promise
}