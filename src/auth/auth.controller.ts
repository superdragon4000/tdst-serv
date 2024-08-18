import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import User from 'src/model/user.entity';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<User | HttpStatus> {
        return this.authService.register(registerDto);
    }
}
