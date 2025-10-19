import { Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';       // NestJS ichidagi asosiy dekorator
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin.dto';

@ApiTags("Auth - Token olish uchun ")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signup(createAdminDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinAdminDto: SigninAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(signinAdminDto, res);
  }

  @HttpCode(200)
  @Post("signOut")
  signOut(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,                    
    @CookieGetter("refreshToken") refreshToken: string,       // CookieGetter orqali refreshToken olish
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
