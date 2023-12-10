import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const LoginPage = () => {

  const { data: session, status } = useSession();

  if (status === 'loading') {
		return <div>Loading...</div>;
	}


  if (status !== 'authenticated') {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover" style={{ backgroundImage: 'url(画像のURL)' }} />
      <div className="w-1/2 p-12">
        <h1 className="text-3xl mb-6">ログイン</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2">ユーザー名:</label>
            <input className="w-full px-3 py-2 border rounded" type="text" name="username" />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">パスワード:</label>
            <input className="w-full px-3 py-2 border rounded" type="password" name="password" />
          </div>
          <div className="">
            <div className="flex items-center mb-4">
                <input className="mr-2" type="checkbox" name="remember" />
                <label>ログイン状態を保存する</label>
            </div>
            <div>
                <a href="#">パスワードを忘れた方はこちら</a>
            </div>
            <div>
                <a href="#">アカウントを作成する</a>
            </div>
            <div>
				<button onClick={() => signIn('google', {}, { prompt: 'login' })}>
					Googleでログイン
				</button>
			</div>
          </div>
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded" type="submit">ログイン</button>
        </form>
      </div>
    </div>
  );
}
return null;
};

export default LoginPage;