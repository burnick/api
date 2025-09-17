import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { Logger } from '@nestjs/common';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { configService } from './config/config.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { RolesModule } from './roles/roles.module';
import { PubSubService } from './pubSub.service';
import { EventResolver } from './event.resolver';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,                                                  
      playground: !configService.isProduction(),
      // installSubscriptionHandlers: true,
      subscriptions: {
        // enable this for subscriptions
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          extensions: !configService.isProduction() ? error.extensions : null,
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
    RolesModule,
    RestaurantModule,
  ],
  // controllers: [AppController],
  // providers: [AppService, PrismaService],
  providers: [PubSubService, EventResolver],
  exports: [PubSubService],
})
export class AppModule {}
