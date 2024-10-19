import { axiosInstance } from "@/libs/axiosConfig";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get('accessToken');
  if (!accessToken) {
    return new Response('参数错误');
  }
  try {
    const result = await axiosInstance({
      method: 'GET',
      url:'https://api.dingtalk.com/v1.0/contact/users/me',
      headers: {
        'Content-Type': 'application/json',
        'x-acs-dingtalk-access-token': accessToken
      },
    });
    console.log(result);
    return new Response(result.data);
  } catch (err: any) {
    console.log(err.data);
    return new Response(err.data?.message || '请求失败');
  }
}
