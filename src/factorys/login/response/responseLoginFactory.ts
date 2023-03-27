import { IRespToken } from '../../../interfaces/response/IResp';

class ResponseLoginFactory {
  public responseLogin(
    statusCode: number,
    status: string,
    token: string,
    expiresIn: number,
    type: string
  ) {
    const response: IRespToken = {
      statusCode: statusCode,
      status: status,
      token: token,
      expiresIn: expiresIn,
      type: type,
    };
    return response;
  }
}

export default ResponseLoginFactory;
