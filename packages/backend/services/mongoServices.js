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
  return promise;
}

/**
 * Finds an existing user in the DB
 * @param {number} id - Unique user id
 */
function findUser(id) {
  return userModel.findById(id);
}

/**
 * Deletes all suggestions associated with a given user
 * NOTE: This should only be called when deleting a user from the DB
 * @param {number} userId - User ID associated with suggestion(s)
 */
function removeSuggestions(userId) {
  return suggestionModel.deleteMany({ user: userId });
}

/**
 * Removes a user from the DB
 * @param {number} id - Unique user ID
 */
function removeUser(id) {
  removeSuggestions(id);
  return userModel.findByIdAndDelete(id);
}

/**
 * Saves a new suggestions to the DB
 * @param {JSON} suggestion - Instance of a suggestion
 */
function addSuggestion(suggestion) {
  const thisSuggestion = new suggestionModel(suggestion);
  const promise = thisSuggestion.save();
  return promise;
}
