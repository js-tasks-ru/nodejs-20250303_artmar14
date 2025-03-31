import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import database from "./config/database";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRootAsync(database.asProvider())
  ],
})
export class AppModule {}
