"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/legacy/image";
import top_image from "../../public/top_image.jpg";
import { NavBar } from "../app/components/NavBar";
import Footer from "../app/components/Footer";

interface PostProps {
  id: string;
  title: string;
  date: string;
  description: string;
  url: string;
}

const Page: React.FC = () => {
  const [posts, setPosts] = React.useState<PostProps[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(event.target.value);

    useEffect(() => {
      axios.get('http://localhost:8000/api/blog/get')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/blog", { url })
      .then((response) => {
        const newPost: PostProps = response.data;
        setPosts([...posts, newPost]);
        // HOMEに遷移させる
        setShowModal(false);
        setUrl("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <main>
        <div>
          <Image
            src={top_image}
            alt="ano_sono"
            layout="responsive"
            objectFit="cover"
            width={1920}
            height={580}
          />
        </div>
        <div>

              {posts.map((post) => (
                <div key={post.id} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    <a href={post.url} className="btn btn-primary">
                      詳細を見る
                    </a>
                  </div>
                </div>
              ))}
        </div>
        <button
          onClick={handleOpenModal}
          className="absolute bottom-20 right-10 bg-green-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          新規作成
        </button>

        {showModal && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    新規ブログサイト
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={url}
                      onChange={handleChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                    />
                    <div className="flex justify-end mt-3">
                      {" "}
                      {}
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        作成
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        閉じる
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-center"></div>
      </main>
    </>
  );
};

export default Page;
