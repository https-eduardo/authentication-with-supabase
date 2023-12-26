import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from 'src/common/decorators/user-payload.decorator';
import { JwtUserPayload } from 'src/common/types/jwt-user-payload';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get user own information' })
  @ApiResponse({
    status: 200,
    description: 'User info retrieved successfully.',
  })
  async me(@UserPayload() user: JwtUserPayload) {
    return await this.service.findOne(user.sub);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update user's own information" })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
  })
  async updateOwnAccount(
    @UserPayload() user: JwtUserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.service.updateOne(user.sub, updateUserDto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user itself' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'User deleted.',
  })
  async deleteOwnAccount(@UserPayload() user: JwtUserPayload) {
    return await this.service.deleteOne(user.sub);
  }
}
