const fs = require('fs');

interface Todo
{
    content: string;
    id: number;
}

class TodoControl
{
    // ToDoリスト自身を格納
    public  todolist : Todo[];
    // 読み込みファイル名
    private filename : string = 'todo.json';

    constructor()
    {
        // jsonファイルから読み込んだToDoリストを格納
        this.todolist = JSON.parse(fs.readFileSync(this.filename, 'utf-8')) as Todo[];
    }

    // ToDoの完了処理つまり指定したidのTodoを削除
    complete(del_id : number) : void
    {
        // 要素の走査
        for (let i : number = 0; i < this.todolist.length; i++)
        {
            // 削除したいidと一致する要素を発見
            if(del_id == this.todolist[i].id)
            {
                // 該当要素の削除
                this.todolist.splice(i, 1);
                
                // メッセージ出力
                console.log(`complete todo id: ${del_id}`);

                // ファイルに書き込み
                fs.writeFile(this.filename, JSON.stringify(this.todolist, null, ''));
                
                break;
            }
        }

        return;
    }

    // ToDoの追加処理つまりリストの末尾にTodoを追加
    add (todo_txt : string) : void
    {
        // 追加するToDoのidを格納
        let todo_latest : number;
        // 既存のToDoがある
        if (this.todolist.length > 0)
        {
            // 最新のToDoのidに1加える
            todo_latest = this.todolist[this.todolist.length - 1].id + 1;
        }
        // 既存のToDoがない
        else
        {
            todo_latest = 0;
        }

        // 追加するToDoデータの用意
        const new_todo : Todo = {
            content : todo_txt,
            id      : todo_latest
        };

        // リストの末尾に追加
        this.todolist.push(new_todo);
        
        // メッセージ出力
        console.log(`add todo content: ${todo_txt}`);
        
        // ファイルに書き込み
        fs.writeFile(this.filename, JSON.stringify(this.todolist, null, ''));
        
        return;
    }

    // ToDoの表示処理つまりリストの全表示
    show () : void
    {
        // リストの表示
        for (let i : number = 0; i < this.todolist.length; i++)
        {
            // メッセージ出力
            console.log(`todo[${this.todolist[i].id}]: ${this.todolist[i].content}`);
        }

        return;
    }
}

// Todo操作のインスタンスを生成
const todo = new TodoControl();

// 引数が3つ以上(任意引数が1以上)
if (process.argv.length >= 3)
{
    // addかconpleteが入るはず
    const cmd: string = process.argv[2];
    
    // addオプション
    if (cmd == "add")
    {
        // さらに引数がある(追加するToDoのcontent名)
        if (process.argv.length >= 4)
        {
            const content : string = process.argv[3];
            todo.add(content);
        }
    }
    else
    // completeオプション
    if (cmd == "complete")
    {
        // さらに引数がある(削除するToDoのid)
        if (process.argv.length >= 4)
        {
            const id : number = parseInt(process.argv[3]);
            todo.complete(id);
        }
    }
}
// 引数が2つ以下(任意引数がなし)
else
{
    todo.show();
}
