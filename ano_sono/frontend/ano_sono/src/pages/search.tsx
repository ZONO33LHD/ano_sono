import React, { useState } from "react";
import { NavBar } from "../app/components/NavBar";
import Footer from "../app/components/Footer";
import axios from "axios";

interface PostProps {
  id: number;
  title: string;
  description: string;
  url: string;
}

type SearchResult = {
  id: number;
  title: string;
  url: string;
  description: string;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [descriptionTerm, setDescriptionTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8000/api/blog/search`, {
      title: searchTerm,
      description: descriptionTerm,
    });
    setSearchResults(response.data);
  };

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleOpenEditModal = (
    id: number,
    title: string,
    url: string,
    description: string
  ) => {
    setEditId(id);
    setEditTitle(title);
    setEditUrl(url);
    setEditDescription(description);
    setShowModal(true);
  };

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/blog/edit/${editId}`, {
        id: editId,
        title: editTitle,
        url: editUrl,
        description: editDescription,
      })
      .then((response) => {
        // 編集が成功したら、全ての投稿を再取得
        axios
          .get("http://localhost:8000/api/blog/get?startIndex=0")
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setShowModal(false); // モーダルを閉じる
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/blog/delete/${id}`)
      .then((response) => {
        // 削除が成功したら、全ての投稿を再取得
        axios
          .get("http://localhost:8000/api/blog")
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <NavBar />
      <div className="ml-10 mt-6 w-4/5 mx-auto">
        <h1 className="text-2x1 font-bold mb-4">検索画面</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            placeholder="タイトル"
          />
          <input
            type="text"
            value={descriptionTerm}
            onChange={(e) => setDescriptionTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            placeholder="一言"
          />
          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-500 text-white cursor-pointer"
            >
              検索
            </button>
          </div>
        </form>
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="card m-10 bg-white shadow-lg rounded-lg overflow-hidden my-4 block relative hover:shadow-xl transition-shadow duration-200"
          >
            <div>
              <a href={result.url} target="_blank" className="card-body p-4">
                <h5 className="card-title pl-3 text-xl font-bold underline">
                  {result.title}
                </h5>
                <p className="card-text pl-3 text-gray-700 mt-2">
                  {result.description}
                </p>
              </a>
              <button
                onClick={() =>
                  handleOpenEditModal(
                    result.id,
                    result.title,
                    result.url,
                    result.description
                  )
                }
                className="absolute right-20 top-1/2 transform -translate-y-1/2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(result.id)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-16"
              >
                削除
              </button>
            </div>
          </div>
        ))}
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
                  投稿を編集
                </h2>
                <form onSubmit={handleEdit}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                    placeholder="タイトル"
                  />
                  <input
                    type="text"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                    placeholder="URL"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                    placeholder="一言"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      更新
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      キャンセル
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
