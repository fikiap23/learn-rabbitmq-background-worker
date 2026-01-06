import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class EmailWorkerService {
  @RabbitSubscribe({
    exchange: 'task.exchange',
    routingKey: 'email.send',
    queue: 'email.queue',
    queueOptions: {
      durable: true,
    },
  })
  async handle(msg: any) {
    console.log('📨 Processing:', msg);

    await new Promise((r) => setTimeout(r, 1000));

    console.log('✅ Done:', msg.to);
  }
}
