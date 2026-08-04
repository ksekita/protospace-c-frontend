import { ResponsePrototypeList } from "./detail.type";
import { ResponseUserInfo } from "./detail.type";

export interface UserDetailResponse {
  userDetail: ResponseUserInfo;
  prototypeList: ResponsePrototypeList[];
}
