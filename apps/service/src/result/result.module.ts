import { Module } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultController } from './result.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResultEntity } from './model/result.entity'

@Module({
  providers: [ResultService],
  controllers: [ResultController],
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  exports: [ResultService]
})
export class ResultModule {}
