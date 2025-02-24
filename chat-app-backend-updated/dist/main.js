"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.enableCors({
        origin: 'http://localhost:3001',
        credentials: true,
    });
    const configService = app.get(config_1.ConfigService);
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    await app.listen(configService.getOrThrow('PORT') ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map