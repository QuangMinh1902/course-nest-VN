export interface SwaggerConfig {
  passsword: string;
  pathDoc: string;
  title: string;
  desc: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3010,
  swagger: {
    password: process.env.SWAGGER_PASSWORD,
    pathDoc: process.env.SWAGGER_PATH_DOC,
    title: process.env.SWAGGER_TITLE,
    desc: process.env.SWAGGER_DESC,
  },
});
