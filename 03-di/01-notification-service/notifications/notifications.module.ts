import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import config from 'config/notification';

@Module({
  providers: [NotificationsService, ConfigService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
