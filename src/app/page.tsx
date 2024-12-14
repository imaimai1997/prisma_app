import ClientComponent from "./components/Delete";

const getTodoList = async () => {
  const res = await fetch("http://localhost:3000/api/todo", {
    cache: "no-store", // キャッシュ無効化
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todo list");
  }
  const json = await res.json();
  return json.todos;
};

export default async function Page() {
  // 初期データをサーバーコンポーネントで取得
  const initialTodoList = await getTodoList();

  return <ClientComponent initialTodoList={initialTodoList} />;
}
