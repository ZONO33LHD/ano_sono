"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/legacy/image";
import top_image from "../../public/top_image.jpg";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blog/get`)
      .then((response) => {
        setPosts(response.data.slice((currentPage - 1) * 5, currentPage * 5));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog/count")
      .then((response) => {
        setTotalPages(Math.ceil(response.data / 5));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/blog", { url })
      .then((response) => {
        setCurrentPage(1);
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
        <div className="relative w-full flex justify-end bg-white z-10 mb-4 mt-4">
          <button
            onClick={handleOpenModal}
            className="relative mb-4 mr-10 bg-green-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            新規登録
          </button>
        </div>
        <div>
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              className="card m-10 bg-white shadow-lg rounded-lg overflow-hidden my-4 block"
            >
              <div className="card-body p-4">
                <h5 className="card-title text-xl font-bold">{post.title}</h5>
                <p className="card-text text-gray-700 mt-2">
                  {post.description}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="fixed bottom-16 w-full flex justify-center bg-white z-10">
          <button
            onClick={goToPreviousPage}
            className="mx-2 px-4 py-2 bg-gray-200 text-black rounded"
          >
            &lt;
          </button>
          <p className="mx-2">{`${currentPage} / ${totalPages}`}</p>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className="mx-2 px-4 py-2 bg-gray-200 text-black rounded"
          >
            &gt;
          </button>
        </div>

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
