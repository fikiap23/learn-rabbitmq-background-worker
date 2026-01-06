import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email/email.controller';
import { ProducerService } from './producer/producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URI')!,
        exchanges: [
          {
            name: 'task.exchange',
            type: 'direct',
          },
        ],

        // 🔥 INI PENTING
        connectionInitOptions: {
          wait: true, // tunggu RabbitMQ ready
          timeout: 30000, // default 5s terlalu cepat
        },

        enableControllerDiscovery: true,
        prefetchCount: 1,
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [ProducerService],
})
export class AppModule {}
