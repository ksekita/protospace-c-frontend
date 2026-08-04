import { ResponsePrototypeList } from "../types/user/detail.type";
import { ResponseUserInfo } from "../types/user/detail.type";

export interface UserDetailResponse {
  responseUserInfo: ResponseUserInfo;
  responsePrototypeList: ResponsePrototypeList[];
}
