import { PrismaClient } from "@prisma/client";
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



export const DELETE = async (req: Request, { params }: { params: { id: string }  }) => {
  try {
      const targetId:number = Number(params.id);
   
      await connect();
      const todos = await prisma.todo.delete({
          where: { id: targetId }
      });

      return new Response(JSON.stringify({ message: '削除成功', todos }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    return new Response(JSON.stringify({ message: '削除失敗' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } finally {
      await prisma.$disconnect();
  }
}