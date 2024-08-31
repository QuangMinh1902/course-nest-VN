export interface SwaggerConfig {
  username: string;
  password: string;
  pathDoc: string;
  title: string;
  desc: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  swagger: {
    username: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD,
    pathDoc: process.env.SWAGGER_PATH_DOC,
    title: process.env.SWAGGER_TITLE,
    desc: process.env.SWAGGER_DESC,
  },
});
