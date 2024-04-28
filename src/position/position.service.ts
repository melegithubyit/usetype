import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { Position } from '../entities/position.entity';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  async create(createPositionDto: Partial<Position>): Promise<Position> {
    // return this.positionRepository.create(createPositionDto);
    const newPosition = await this.positionRepository.create(createPositionDto);
    await this.positionRepository.save(newPosition);
    return newPosition;
  }

  async findAll(): Promise<Position[]> {
    return this.positionRepository.find({ relations: ['parent', 'children'] });
  }

  async findOne(id: string): Promise<Position> {
    return this.positionRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async findChildren(id: string): Promise<Position[]> {
    const position = await this.positionRepository.findOne({
      where: { id },
      relations: ['children'],
    });
    return position.children;
  }

  async update(
    id: string,
    updatePositionDto: Partial<Position>,
  ): Promise<Position> {
    await this.positionRepository.update(id, updatePositionDto);
    return this.positionRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.positionRepository.delete(id);
  }
  
}