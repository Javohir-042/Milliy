import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt"
import { Response } from 'express';
import { AdminService } from '../admin/admin.service';
import { AdminDocument } from '../admin/schemas/admin.schemas';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) { }

    private async generateTokens(admin: AdminDocument) {
        const payload = {
            id: admin._id,
            email: admin.email,
            role: admin.role,  
            is_active: admin.is_active, 
            is_creator: admin.is_creator,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME as any,
            }),

            this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME as any
            })
        ]);

        return { accessToken, refreshToken }
    }

    async signup(createAdminDto: CreateAdminDto) {
        const candidate = await this.adminService.findAdminByEmail(
            createAdminDto.email
        );
        console.log(candidate)
        if (candidate) {
            throw new ConflictException("Bunday foydalanuvchi mavjude");
        }

        const newadmin = await this.adminService.create(createAdminDto)
        return newadmin;
    }


    async signin(signinAdminDto: SigninAdminDto, res: Response) {
        const admin = await this.adminService.findAdminByEmail(signinAdminDto.email);
        if (!admin) {
            throw new UnauthorizedException(`Email yoki parol noto'g'ri`);
        }

        const verifyPassword = await bcrypt.compare(
            signinAdminDto.password,
            admin.password
        );
        if (!verifyPassword) {
            throw new UnauthorizedException("Email yoki parol noto'g'ri")
        }

        const { accessToken, refreshToken } = await this.generateTokens(admin);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
        admin.refresh_token = hashedRefreshToken;
        await admin.save();
        res.cookie('refreshToken', refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });

        return {
            message: "admin signin ",
            id: admin.id,
            accessToken,
        };
    }


    async signOut(refreshToken: string, res: Response) {
        const adminData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });

        if (!adminData) {
            throw new BadRequestException("admin not verified")
        }

        const admin = await this.adminService.findOne(adminData.id)
        if (!admin) {
            throw new BadRequestException("Noto'g'ri token yuborildi")
        }

        admin.refresh_token = "";
        await admin.save();

        res.clearCookie("refreshToken");
        return {
            message: "admin logged out successFullly"
        }
    }


    async refreshToken(
        adminId: string,
        refresh_token: string,
        res: Response) {
        const decodedToken = await this.jwtService.decode(refresh_token);

        if (adminId !== decodedToken["id"]) {
            throw new ForbiddenException(" Ruxsat etilmagan id")
        }

        const admin = await this.adminService.findOne(adminId);

        if(!admin || !admin.refresh_token){
            throw new ForbiddenException("Ruxsat etilmagan admin")
        }

        const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
        if(!tokenMatch){
            throw new ForbiddenException("Forbidden");
        }

        const { accessToken, refreshToken } = await this.generateTokens(admin);
        admin.refresh_token = await bcrypt.hash(refreshToken, 7);

        await admin.save();
        res.cookie("refreshToken", refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });

        return {
            message: "admin refreshed",
            adminId: admin.id,
            access_token: accessToken,
        };
    }

}
