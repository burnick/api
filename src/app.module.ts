import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { configService } from './config/config.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: !configService.isProduction(),
      installSubscriptionHandlers: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          //extensions: error.extensions,
        };
        return graphQLFormattedError;
      },
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
    UsersModule,
    AuthModule,
  ],
  // controllers: [AppController],
  //providers: [AppService, PrismaService],
})
export class AppModule {}
