import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/model/user.entity';
import { Equal, Repository } from 'typeorm';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private projectRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User | HttpStatus> {
    const candidate = await this.projectRepository.findOneBy({
        email: Equal(registerDto.email)
    })
    if (candidate) throw new HttpException(
        'This email address is already taken.',
        HttpStatus.CONFLICT,
      );
    
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    return await this.projectRepository.save({
        email: registerDto.email,
        password: hashedPassword
    })
  }
}
