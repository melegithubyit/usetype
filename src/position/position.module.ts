import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { PositionRepository } from './position.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository],
})
export class PositionModule {}