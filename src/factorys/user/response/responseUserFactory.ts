import { IResp } from '../../../interfaces/response/IResp';

class ResponseUserFactory {
  public responseUser(status: string, message: string, statusCode: number, data: object | null) {
    const response: IResp = {
      statusCode: statusCode,
      status: status,
      message: message,
      data: data == null ? null : JSON.parse(JSON.stringify(data,(key,value)=>key === 'password' ? undefined : value)),
    };
    return response;
  }
}

export default ResponseUserFactory;
