"use client"; // クライアントコンポーネントとして動作

import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  created_at: Date;
};

export default function ClientComponent({
  initialTodoList,
}: {
  initialTodoList: Todo[];
}) {
  const [todoList, setTodoList] = useState(initialTodoList);

  const handleDelete = (id: number) => {
    // 非同期処理をラップ
    const deleteTodo = async () => {
      try {
        const res = await fetch(`/api/todo/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("削除に失敗しました");
        }

        // UIを更新
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error(error);
      }
    };

    deleteTodo(); // 非同期関数を呼び出す
  };

  return (
    <ul className="space-y-4">
      {todoList.map((todo) => (
        <li key={todo.id} className="flex items-center">
          <span>{todo.title}</span>
          <button
            onClick={() => handleDelete(todo.id)} // 非同期処理を間接的に呼び出す
            className="ml-4 text-red-500"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
