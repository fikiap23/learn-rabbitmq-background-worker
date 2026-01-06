import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailWorkerService } from './email-worker/email-worker.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('RABBITMQ_URI')!,

        // ⚠️ WAJIB di Docker
        connectionInitOptions: {
          wait: true,
          timeout: 30000,
        },

        // deklarasi exchange (idempotent)
        exchanges: [
          {
            name: 'task.exchange',
            type: 'direct',
          },
        ],

        prefetchCount: 5,

        enableControllerDiscovery: true,
      }),
    }),
  ],
  providers: [EmailWorkerService],
})
export class AppModule {}
