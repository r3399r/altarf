import { HttpError } from 'src/model/error/HttpError';
import { LambdaOutput } from 'src/model/Lambda';

export const successOutput = <T>(res: T): LambdaOutput =>
  ({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work,
    },
    body: JSON.stringify(res),
  });

export const errorOutput = (e: unknown): LambdaOutput => {
  const error: HttpError = e as HttpError;

  return {
    statusCode: error.status ?? 500,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      status: error.status,
      name: error.name,
      message: error.message,
    }),
  };
};
