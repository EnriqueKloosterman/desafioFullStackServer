import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:3306,
      username: 'root',
      password: null,
      database: 'todolist',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
