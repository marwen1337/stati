import { HttpException, HttpStatus } from '@nestjs/common'

export class AgentStillHasMonitorsException extends HttpException {
  constructor() {
    super('Agent still has relations', HttpStatus.CONFLICT)
  }
}
