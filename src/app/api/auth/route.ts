import { axiosInstance } from "@/libs/axiosConfig";
import axios from "axios";
import { NextRequest } from "next/server";
// import Util from '@alicloud/tea-util';
// import dingtalkoauth2_1_0, * as $dingtalkoauth2_1_0 from '@alicloud/dingtalk/oauth2_1_0';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import * as $tea from '@alicloud/tea-typescript';

// function createClient(): dingtalkoauth2_1_0 {
//   const config = new $OpenApi.Config({ });
//   config.protocol = "https";
//   config.regionId = "central";
//   return new dingtalkoauth2_1_0(config);
// }

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const authCode = searchParams.get('authCode');
//   const refreshToken = searchParams.get('refreshToken');
//   const client = createClient();
//   const getUserTokenRequest = new $dingtalkoauth2_1_0.GetUserTokenRequest({
//     clientId: "ding4zua3ynsogeiyuyh",
//     clientSecret: "EiWvw-ioptrvmbEr_MZySzavFfZ1lGZQKeZd_BdPrPcS4Tr2Q980iXHFU0HH-m8e",
//     code: authCode,
//     refreshToken: refreshToken,
//     grantType: authCode ? "authorization_code" : "refresh_token",
//   });
//   try {
//     const result =await client.getUserToken(getUserTokenRequest);
//     return new Response(result);
//   } catch (err: any) {
//     console.log(err);
//     if (!Util.empty(err.code) && !Util.empty(err.message)) {
//       // err 中含有 code 和 message 属性，可帮助开发定位问题
//     }
//     return new Response('');
//   }
// }

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const authCode = searchParams.get('authCode');
  const refreshToken = searchParams.get('refreshToken');
  try {
    const result = await axios.post('http://api.dingtalk.com/v1.0/oauth2/userAccessToken', {
      clientId: "ding4zua3ynsogeiyuyh",
      clientSecret: "EiWvw-ioptrvmbEr_MZySzavFfZ1lGZQKeZd_BdPrPcS4Tr2Q980iXHFU0HH-m8e",
      code: authCode,
      refreshToken: refreshToken,
      grantType: authCode ? "authorization_code" : "refresh_token",
    });
    console.log(result);
    return new Response(result.data);
  } catch (err: any) {
    if (err.code && err.message) {
      // err 中含有 code 和 message 属性，可帮助开发定位问题
      console.log(err.code, err.message);
    }
    return new Response('');
  }
}
