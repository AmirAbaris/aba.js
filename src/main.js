import { patchText, render } from "./framework/render.js";

const app = document.querySelector("#app");
let count = 0;

function createCounter() {
  return {
    type: "button",
    content: `Count: ${count}`,
    onClick: () => {
      count++;
      redraw();
    },
  };
}

function redraw() {
  const description = createCounter();

  if (app.firstChild) {
    patchText(app.firstChild, description.content);
  } else {
    app.append(render(description));
  }
}

redraw();

// A small tree example: the section contains a paragraph and a button.
const nestedExample = {
  type: "section",
  content: "A parent element can contain children:",
  children: [
    { type: "p", content: "I am a child paragraph." },
    { type: "button", content: "I am a child button." },
    {
      type: "input",
      props: { type: "text", placeholder: "A todo could go here" },
    },
  ],
};

document.querySelector("#nested-demo").append(render(nestedExample));

const sampleTodos = ["Learn plain DOM", "Describe elements"];
const listExample = {
  type: "section",
  content: "A list created from data:",
  children: sampleTodos.map((todo) => ({
    type: "li",
    content: todo,
  })),
};

document.querySelector("#list-demo").append(render(listExample));

const todos = [];

function createTodoApp() {
  return {
    type: "section",
    content: "Tiny todo list",
    children: [
      {
        type: "input",
        props: { id: "new-todo", placeholder: "Write a todo" },
      },
      {
        type: "button",
        content: "Add todo",
        onClick: () => {
          const todoValue = document.querySelector("#new-todo").value;
          todos.push({ text: todoValue, completed: false });

          redrawTodos();
        },
      },
      {
        type: "ul",
        children: todos.map((todo) => ({
          type: "li",
          content: `${todo.completed ? "✓" : "○"} ${todo.text}`,
          children: [
            {
              type: "button",
              content: todo.completed ? "Undo" : "Done",
              onClick: () => {
                // TODO: Toggle this todo's completed value and call redrawTodos().
                todo.completed = !todo.completed;
                redrawTodos();
              },
            },
          ],
        })),
      },
    ],
  };
}

function redrawTodos() {
  document.querySelector("#todo-app").replaceChildren(render(createTodoApp()));
}

redrawTodos();
