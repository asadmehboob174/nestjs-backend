import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

type EmployeeQueryOptions = {
  where?: {
    role: Role;
  };
};

@Injectable()
export class EmployeesService {

  constructor(private readonly databaseService : DatabaseService) {
    
  }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data : createEmployeeDto
    })
  }

  async findAll(role : Role) {
    const queryOptions : EmployeeQueryOptions = role ? { where: { role } } : {};
    return this.databaseService.employee.findMany(queryOptions);
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where : {
         id
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where : {
        id
      },
      data : updateEmployeeDto
     })
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where : {
        id
      }
    })
  }
}
