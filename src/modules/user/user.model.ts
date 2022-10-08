// import mongoose from 'mongoose';
// import { User } from '../../types/user.type.js';
// import { UserType } from '../../types/user-type.enum.js';

// export interface UserDocument extends User, mongoose.Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       require: true,
//       minLength: [1, 'Min length for name is 1'],
//       maxLength: [15, 'Max length for name is 15'],
//       unique: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
//       required: true,
//     },
//     avatarPath: {
//       type: String,
//       required: true,
//       minlength: [5, 'Min length for avatar path is 5'],
//     },
//     password: {
//       type: String,
//       require: true,
//       minLength: [6, 'Min length for password is 6'],
//       maxLength: [12, 'Max length for password is 12']
//     },
//     type: {
//       type: UserType,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const UserModel = mongoose.model<UserDocument>('User', userSchema);
