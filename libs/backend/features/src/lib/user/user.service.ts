import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@org/dto';
import { Model } from 'mongoose';
import { User, UserRol } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(data: {
    naam: string;
    email: string;
    rol: UserRol;
    wachtwoordHash: string;
  }) {
    const existing = await this.userModel.findOne({ email: data.email });
    if (existing) throw new ConflictException('Email already in use');

    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findAll() {
    return this.userModel.find().select('-wachtwoordHash');
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
