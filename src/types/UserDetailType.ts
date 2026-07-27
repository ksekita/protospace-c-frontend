export interface UserDetailType {
  responseUserInfo: ResponseUserInfo;
  responsePrototypeList: ResponsePrototypeList[];
}

export interface ResponsePrototypeList {
  id: number;
  title: string;
  catchCopy: string;
  image: string;
}

export interface ResponseUserInfo {
  id: number;
  username: string;
  profile: string;
  affiliation: string;
  position: string;
}
