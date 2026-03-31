import {
  AppleMark,
  GoogleMark,
  KakaoMark,
  NaverMark,
} from "./login-provider-icons";
import { LoginAside } from "./login-aside";
import { LoginFallback } from "./login-fallback";
import { LoginFormPanel } from "./login-form-panel";
import { LoginHeader } from "./login-header";

/** 로그인 화면 블록 */
export const Login = {
  Header: LoginHeader,
  Aside: LoginAside,
  FormPanel: LoginFormPanel,
  Fallback: LoginFallback,
  marks: {
    Google: GoogleMark,
    Kakao: KakaoMark,
    Naver: NaverMark,
    Apple: AppleMark,
  },
} as const;

export type LoginNamespace = typeof Login;
