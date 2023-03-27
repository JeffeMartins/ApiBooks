export interface IResp {
  statusCode: number;
  status: string;
  message: string;
  data:
    | object
    | null
    | {
        count?: number;
      };
}

export interface IRespToken {
  statusCode: number;
  status: string;
  token: string;
  expiresIn: number;
  type: string;
}
