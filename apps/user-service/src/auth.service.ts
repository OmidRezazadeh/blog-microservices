import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/Register.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserServiceService {
  constructor(
    @InjectRepository(User) // این decorator مهمه
    private readonly userRepository: Repository<User>,
  ) {}
    async store(registerDto:RegisterDto){
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);  
      const user = this.userRepository.create({
        ...registerDto,
        password: hashedPassword});
      return this.userRepository.save(user);
    }

    
}
