import React from 'react';

const BoardInsert = () => {
    return (
        <div className={"flex items-center justify-end flex-1"}>

        <form className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
            <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="내용을 입력하세요"
                rows={10}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                저장하기
            </button>
        </form>
        </div>
    );
};

export default BoardInsert;