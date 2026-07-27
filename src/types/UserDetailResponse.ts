import { Prototype } from "./prototype";
import { UserDetailType } from "./UserDetailType";

export interface UserDetailResponse {
  userDetail: UserDetailType;
  prototypeList: Prototype[];
}
