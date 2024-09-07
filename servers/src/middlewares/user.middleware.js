/** @format */

import { ObjectId } from "mongodb";
export default class Conversation {
  constructor({
    _id,
    sender_id,
    receiver_id,
    content,
    created_at,
    updated_at,
  }) {
    const date = new Date();
    this._id = _id || new ObjectId();
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.content = content;
    this.created_at = created_at || date;
    this.updated_at = updated_at || date;
  }
}
