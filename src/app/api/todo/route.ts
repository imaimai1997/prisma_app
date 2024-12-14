
import { PrismaClient } from "@prisma/client";

//インスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
    try {
        //prismaでデータベースに接続
        prisma.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}


// データベースからデータを取得する
export const GET = async (req: Request) => {
  try {
      await connect();
      const todos = await prisma.todo.findMany();

      return new Response(JSON.stringify({ todos }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
  
      return new Response(JSON.stringify({ message: 'Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  };

 
  export const POST = async (req: Request) => {
    try {
      const { title } = await req.json(); // JSON リクエストのパース
      await connect(); // データベース接続
  
      const todo = await prisma.todo.create({
        data: {
          title: title,
        },
      });
  
      // 標準の Response クラスを利用して JSON を返却
      return new Response(JSON.stringify({ message: '投稿完了', todo }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
  
      // エラー時のレスポンス
      return new Response(JSON.stringify({ message: '投稿失敗' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } finally {
      await prisma.$disconnect(); // DB接続を切断
    }
  };