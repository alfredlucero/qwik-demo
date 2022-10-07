import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import styles from "./stoa.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const todayDate = new Date();
  const todayWeekDay = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  const todayDisplayDate = todayDate.toLocaleDateString();
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const yesterdayWeekDay = currentDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  const yesterdayDisplayDate = currentDate.toLocaleDateString();

  const state = useStore({
    currentYesterdayDescription: "",
    yesterdayList: [
      {
        id: new Date().setDate(new Date().getDate() - 1),
        description: "I finished this ticket yesterday.",
      },
    ],
    todayList: [
      {
        id: new Date().getTime(),
        description: "I will work on this task today.",
      },
    ],
    currentTodayDescription: "",
  });

  return (
    <>
      <h1>STOA - Your Daily Standup</h1>
      <div>
        <h2>
          Yesterday - {yesterdayWeekDay}, {yesterdayDisplayDate}
        </h2>
        <p>What did I do yesterday?</p>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            onChange$={(e) => {
              state.currentYesterdayDescription = (
                e.target as HTMLInputElement
              ).value;
            }}
            value={state.currentYesterdayDescription}
          />
          <button
            onClick$={() => {
              if (!state.currentYesterdayDescription) {
                return;
              }

              state.yesterdayList = [
                ...state.yesterdayList,
                {
                  id: new Date().getTime(),
                  description: state.currentYesterdayDescription,
                },
              ];
              state.currentYesterdayDescription = "";
            }}
          >
            Add
          </button>
        </div>

        <ul>
          {state.yesterdayList.map((yesterdayItem) => {
            return (
              <li>
                <div>
                  {yesterdayItem.description}

                  <button
                    onClick$={() =>
                      (state.yesterdayList = state.yesterdayList.filter(
                        (item) => item.id !== yesterdayItem.id
                      ))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <h2>
          Today - {todayWeekDay}, {todayDisplayDate}
        </h2>
        <p>What am I going to do today?</p>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            onChange$={(e) => {
              state.currentTodayDescription = (
                e.target as HTMLInputElement
              ).value;
            }}
            value={state.currentTodayDescription}
          />
          <button
            onClick$={() => {
              if (!state.currentTodayDescription) {
                return;
              }

              state.todayList = [
                ...state.todayList,
                {
                  id: new Date().getTime(),
                  description: state.currentTodayDescription,
                },
              ];
              state.currentTodayDescription = "";
            }}
          >
            Add
          </button>
        </div>

        <ul>
          {state.todayList.map((todayItem) => {
            return (
              <li>
                <div>
                  {todayItem.description}

                  <button
                    onClick$={() =>
                      (state.todayList = state.todayList.filter(
                        (item) => item.id !== todayItem.id
                      ))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Stoa",
};
