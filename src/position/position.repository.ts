import { EntityRepository, Repository } from 'typeorm';
import { Position } from '../entities/position.entity';

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {}