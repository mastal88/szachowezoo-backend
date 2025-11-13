import { Request, Response, NextFunction } from 'express';
import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';
import { connectDb } from '../db/index.js';

const quizSchema = new Schema(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    correctAnswers: { type: Number, required: false, default: 0 },
    messages: {
      type: [
        {
          discordMessageId: { type: String, required: true },
          gameId: { type: String, required: true },
          playerIds: { type: [String], required: true },
          correctAnswer: { type: Number, required: true },
        },
      ],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);


export type QuizDocument = InferSchemaType<typeof quizSchema>;

const QuizModel: Model<QuizDocument> =
  (mongoose.models.Quiz as Model<QuizDocument> | undefined) ?? mongoose.model<QuizDocument>('Quiz', quizSchema);

export async function listQuizzes(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await connectDb();
    const quizzes = await QuizModel.find().lean().exec();
    res.json({ data: quizzes });
  } catch (error) {
    next(error);
  }
}
