import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import path from 'path'
import * as fs from 'fs'
import { ObjectId } from "mongodb";

const privateKey = fs.readFileSync(path.resolve('./private.key'), 'utf-8');

export default {
  async login(req, res) {
    try {
      const { userName, password } = req.body
      const user = await global.con
        .db('color')
        .collection('users')
        .findOne({ userName })

      if (!user) {
        return res.json({ warn: "User not found or wrong password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = { id: user._id };
        let token = await jwt.sign(payload, privateKey, { algorithm: 'RS256' });
        return res.json({ token })
      } else {
        return res.json({ warn: "User not found or wrong password" });
      }
    } catch (er) {
      return new Error(er);
    }
  },
  async userColor(req, res) {
    try {
      const user = await global.con
        .db('color')
        .collection('users')
        .findOne({ _id: new ObjectId(req.user.id) })
      return res.json(user.color)
    } catch (er) {
      return new Error(er)
    }
  },
  async colorPrefer(req, res) {
    try {
      await global.con
        .db('color')
        .collection('users')
        .updateOne({
          _id: new ObjectId(req.user.id)
        }, {
          $set: { color: req.body.color }
        })
        const user = await global.con
        .db('color')
        .collection('users')
        .findOne({ _id: new ObjectId(req.user.id) })
      return res.json(user.color)
    } catch (er) {
      return new Error(er)
    }

  }
}