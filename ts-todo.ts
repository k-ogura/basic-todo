interface Todo
{
    content: string;
    id: number;
}

class TodoControl implements Todo
{
    content : "やること";
    id : 114514;

    complete(){
        console.log("complete todo");
    }

    add ()
    {
        console.log("add todo");
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