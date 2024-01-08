import { onMount, createEffect, createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import Fa from 'solid-fa';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const [todos, setTodos] = createStore([]);

function Todo(props) {
    const [done, setDone] = createSignal(false);

    onMount(() => {
        setDone(!!props.done);
    });

    return (
        <div class="flex rounded bg-white shadow-sm">
            <div class="p-4 flex w-full">
                <div class="w-full">
                    <h1 class="text-2xl w-full">{props.title}</h1>
                    <span class="w-full text-gray-600">
                        {props.description}
                    </span>
                </div>
                <input class="w-5 mr-1.5" type="checkbox" checked={done()} />
                <button
                    onClick={() =>
                        setTodos((ts) => ts.filter((t) => t.id !== props.id))
                    }
                    class="text-red-500 hover:text-red-400 hidden-when"
                >
                    <Fa icon={faTrash} />
                </button>
            </div>
        </div>
    );
}

function Bar() {
    return (
        <nav class="h-30 w-full px-2 pt-3 pb-2 bg-white shadow-lg">
            <ul class="w-full flex text-3xl">
                <li class="font-bold w-full px-3">
                    <a href="/">Todolist</a>
                </li>
                <li class="px-3 whitespace-nowrap">
                    <a href="https://github.com/c0rydoras/solid-todolist.git">
                        <Fa icon={faGithub} />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

function Footer() {
    return (
        <div class="h-30 w-full px-2 py-3 bg-white shadow-xl ">
            <ul class="w-full flex">
                <li class="px-5 text-xl w-full text-slate-400">
                    <a href="https://github.com/C0rydoras/solid-todolist/blob/main/LICENSE">
                        LICENSE
                    </a>
                </li>
                <li class="text-lg text-slate-300 whitespace-nowrap px-5">
                    made by{' '}
                    <a href="https://github.com/c0rydoras">@c0rydoras</a>
                </li>
            </ul>
        </div>
    );
}

function App() {
    onMount(() => {
        try {
            const todos = JSON.parse(localStorage.getItem('todos'));
            if (todos?.length) {
                setTodos(todos.filter((t) => t.id));
                setTodoId(Math.max(todos.map((t) => t.id)));
            }
        } catch {
            setTodos([]);
            setTodoId(0);
        }
    });

    createEffect(() => {
        setTodos('todos', todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    });

    const addTodo = () => {
        if (!todoId() || !title()) {
            return;
        }
        setTodoId((t) => t + 1);
        setTodos([
            { id: todoId(), title: title(), description: description() },
            ...todos,
        ]);
        setTitle('');
        setDescription('');
    };

    const [todoId, setTodoId] = createSignal(1);
    const [title, setTitle] = createSignal('');
    const [description, setDescription] = createSignal('');

    return (
        <>
            <header class="sticky top-0 z-40">
                <Bar />
            </header>
            <main class="p-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTodo();
                    }}
                    class="w-full mb-5"
                >
                    <div class="grid md:grid-cols-2 gap-x-3 gap-y-1">
                        <label for="title" class="w-full block text-xl">
                            <input
                                name="title"
                                id="title"
                                class="w-full rounded p-1 px-2"
                                placeholder="Title"
                                required
                                value={title()}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label for="description" class="w-full block text-xl">
                            <input
                                name="description"
                                id="description"
                                placeholder="Description"
                                class="w-full rounded p-1 px-2"
                                required
                                value={description()}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <button
                        class="bg-slate-300 hover:bg-slate-400 mt-2 lg:mt-3 px-4 w-full rounded"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
                <div class="grid gap-2">
                    <Show when={todos}>
                        <For each={todos}>{(todo) => <Todo {...todo} />}</For>
                    </Show>
                </div>
            </main>
            <footer class="sticky top-[100%]">
                <Footer />
            </footer>
        </>
    );
}

export default App;
