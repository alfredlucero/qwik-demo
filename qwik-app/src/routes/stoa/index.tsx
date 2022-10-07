import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import styles from "./stoa.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    count: 0,
  });

  return (
    <>
      STOA
      <div>
        <p>Count: {state.count}</p>
        <button onClick$={() => state.count++}>Increment Count</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Stoa",
};
