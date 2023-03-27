import { IResp } from '../../../interfaces/response/IResp';

class ResponseUserFactory {
  public responseUser(status: string, message: string, statusCode: number, data: object | null) {
    const response: IResp = {
      statusCode: statusCode,
      status: status,
      message: message,
      data: data,
    };
    return response;
  }
}

export default ResponseUserFactory;
