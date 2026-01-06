import { Controller, Post } from '@nestjs/common';
import { ProducerService } from '../producer/producer.service';

@Controller('email')
export class EmailController {
  constructor(private readonly producer: ProducerService) {}

  @Post('send')
  async send() {
    await this.producer.sendEmail({
      to: 'test@mail.com',
      subject: 'Hello',
      body: 'RabbitMQ from zero',
    });

    return { status: 'queued' };
  }
}
