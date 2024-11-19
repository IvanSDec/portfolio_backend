import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }, 
    })
  }

  async create(data: { email: string; name: string; password: string }) {
    return this.prisma.user.create({
      data,
    })
  }

}