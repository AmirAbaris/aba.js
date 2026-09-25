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
  // TODO: Use sampleTodos.map(...) to create one li description per item.
  children: [],
};

document.querySelector("#list-demo").append(render(listExample));
