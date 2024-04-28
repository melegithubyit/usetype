import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from '../entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(
    @Body() createPositionDto: Partial<Position>,
  ): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  async findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @Get(':id/children')
  async findChildren(@Param('id') id: string): Promise<Position[]> {
    return this.positionService.findChildren(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: Partial<Position>,
  ): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.positionService.remove(id);
  }

}