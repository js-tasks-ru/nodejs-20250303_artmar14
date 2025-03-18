import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { ConfigModule } from "@nestjs/config";
import notificationConfig from "./config/notification";

@Module({
  imports: [TasksModule, ConfigModule.forRoot({
    isGlobal: true,
    load:[notificationConfig]
  })],
})
export class AppModule {}
