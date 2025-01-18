import { Module } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultController } from './result.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResultEntity } from './model/result.entity'
import { ResultConfigService } from './result-config.service'

@Module({
  providers: [ResultService, ResultConfigService],
  controllers: [ResultController],
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  exports: [ResultService]
})
export class ResultModule {}
