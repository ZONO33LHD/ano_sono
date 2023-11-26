'use client';

/* Loginページ
*　Googleアカウントでログインする
*　ログイン後はホーム画面に遷移する
*  ログイン後はログアウトボタンが表示される
*  ログイン時は、Java側にログイン情報を送信する
*/
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@app/graphql/mutations';
import { useUser } from '@app/hooks/useUser';
import { useAuth } from '@app/hooks/useAuth';
import { useGoogleLogin } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [login, { data, error }] = useMutation(LOGIN);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();
  const { auth, setAuth } = useAuth();

  // Googleログイン
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const { signIn, loaded } = useGoogleLogin({
    onSuccess: async (res) => {
      const { tokenId } = res;
      const { data } = await login({ variables: { tokenId } });
      setCookie('token', data.login.token, { path: '/' });
      setUser(data.login.user);
      setAuth(true);
      setIsLogin(true);
    },
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    cookiePolicy: 'single_host_origin',
  });

  // Googleログアウト
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: () => {
      removeCookie('token');
      setUser(null);
      setAuth(false);
      setIsLogin(false);
    },
  });

  // ログイン後の処理
  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">Ano Sono</h1>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={signIn}
      >
        Googleアカウントでログイン
      </button>
    </div>
  );
};
