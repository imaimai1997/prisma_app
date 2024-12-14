"use client";

import React from "react";

// 非同期処理を別関数として定義
const addPost = async (text: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    });

    if (!res.ok) {
      throw new Error("Failed to add task");
    }

    console.log("Task added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};

export default function Home() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text");

    if (text) {
      await addPost(text.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="New task..." required />
      <button type="submit">Add Task</button>
    </form>
  );
}
