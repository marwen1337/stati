import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'

@Injectable()
export class HashService {
  sha256(s: string): string {
    return createHash('sha256').update(s).digest('hex')
  }

  defaultHash(s: string): string {
    return this.sha256(s)
  }
}
