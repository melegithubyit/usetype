import { Injectable } from '@nestjs/common';
// import { positionRepo } from './position.repository';
import { Position } from '../entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position) private positionRepo: Repository<Position>,
  ) {}

  async create(createPositionDto: Partial<Position>): Promise<Position> {
    // return this.positionRepo.create(createPositionDto);
    const newPosition = await this.positionRepo.create(createPositionDto);
    await this.positionRepo.save(newPosition);
    return newPosition;
  }

  async findAll(): Promise<Position[]> {
    return this.positionRepo.find({ relations: ['parent', 'children'] });
  }

  async findOne(id: number): Promise<Position> {
    return this.positionRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async findChildren(id: number): Promise<Position[]> {
    const position = await this.positionRepo.findOne({
      where: { id },
      relations: ['children'],
    });
    return position.children;
  }

  async update(
    id: number,
    updatePositionDto: Partial<Position>,
  ): Promise<Position> {
    await this.positionRepo.update(id, updatePositionDto);
    return this.positionRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.positionRepo.delete(id);
  }
  
}