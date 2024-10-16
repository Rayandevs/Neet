import mongoose from "mongoose";
import { ActionTypes } from "../../lib/Types/database";

const GuildCases = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  moderatorId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  caseId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  actionType: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },

  reason: {
    type: mongoose.SchemaTypes.String,
    default: "No Reason Provided",
  },
});

export default mongoose.model(
  "Guilds",
  new mongoose.Schema({
    guildId: {
      type: mongoose.SchemaTypes.String,
      unique: true,
      required: true,
    },

    cases: {
      type: [GuildCases],
      default: [],
    },
  }),
);

export interface IGuild {
  guildId: string;
  cases: IModerationCase[] | never[];
}

export interface IModerationCase {
  userId: string;
  moderatorId: string;
  caseId?: string;
  actionType: ActionTypes;
  reason?: string;
}

export enum EnumModerationCaseFilterProperties {
  userId = "userId",
  moderatorId = "moderatorId",
  caseId = "caseId",
}
