interface Todo
{
    content: string;
    id: number;
}

class TodoControl
{

    todolist: Todo[];
    todo_latest: number = 0;

    complete(){
        console.log("complete todo");
    }

    add ()
    {
        console.log("add todo");
        let newtodo: Todo = {
            content : "やること",
            id : 114514
        }
    }

    show()
    {
        console.log("show todo");
    }
}

declare let process: any;
const todo = new TodoControl();

if (process.argv.length >= 3)
{
    let cmd: string = process.argv[2];
    if (cmd == "add")
    {
        if (process.argv.length >= 4)
        {
            todo.add();
        }
    }
    else
    if (cmd == "complete")
    {
        if (process.argv.length >= 4)
        {
            todo.complete();
        }
    }
}
else
{
    todo.show();
}