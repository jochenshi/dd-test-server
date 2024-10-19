import { axiosInstance } from "@/libs/axiosConfig";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const authCode = searchParams.get('authCode');
  const refreshToken = searchParams.get('refreshToken');
  if (!authCode && !refreshToken) {
    return new Response('参数错误');
  }
  try {
    const result = await axiosInstance({
      method: 'POST',
      url:'https://api.dingtalk.com/v1.0/oauth2/userAccessToken',
      data: {
        clientId: "ding4zua3ynsogeiyuyh",
        clientSecret: "EiWvw-ioptrvmbEr_MZySzavFfZ1lGZQKeZd_BdPrPcS4Tr2Q980iXHFU0HH-m8e",
        code: authCode,
        refreshToken: refreshToken,
        grantType: authCode ? "authorization_code" : "refresh_token",
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(result);
    return new Response(result.data);
  } catch (err: any) {
    console.log(err);
    return new Response(err.data?.message || '请求失败');
  }
}
