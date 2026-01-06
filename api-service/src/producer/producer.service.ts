import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProducerService {
  constructor(private readonly amqp: AmqpConnection) {}

  async sendEmail(payload: any) {
    await this.amqp.publish('task.exchange', 'email.send', payload, {
      persistent: true,
    });
  }
}
