import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
// import { LoggerMiddleWare } from './products/logger.middleware';
import { logger } from './products/logger.middleware';
import { ProductsController } from './products/products.controller';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1/nest-learning'),
    ProductsModule,
    CategoryModule,
    AuthModule,
    MulterModule.register({ dest: "./uploads" }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(LoggerMiddleWare).forRoutes('products');
      // consumer.apply(LoggerMiddleWare).forRoutes(ProductsController);
      // consumer.apply(logger).forRoutes(ProductsController);
      // consumer.apply(LoggerMiddleWare).exclude('products/:id').forRoutes(ProductsController);
      consumer.apply(logger).exclude('products/:id').forRoutes(ProductsController);
  }
}
