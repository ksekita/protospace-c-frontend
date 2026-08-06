import { UserInfo } from "@/lib/api/prototype-list/useGetPrototype";
import { Prototype } from "./prototype";

export interface PrototypeDetailType {
  responsePrototypeDetail: Prototype;
  responseUserInfo: UserInfo;
  isLoginCheck: boolean;
}
