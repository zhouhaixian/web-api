import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('healthz')
@ApiTags('healthz')
export class HealthzController {
  @Get()
  health() {
    return '200 ok';
  }
}
