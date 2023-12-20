const resetBtn = document.querySelector(".lws-reset");
const addMatch = document.querySelector(".lws-addMatch");
const deleteMatch = document.querySelector(".lws-delete");

function Increment(value, id) {
  return {
    type: "increment",
    payload: {
      id: id,
      score: value,
    },
  };
}
function Decrement(value, id) {
  return {
    type: "decrement",
    payload: {
      id: id,
      score: value,
    },
  };
}
function AddMatch(value, id) {
  return {
    type: "addMatch",
    payload: {
      id: id,
      score: value,
    },
  };
}
function DeleteMatch(id) {
  return {
    type: "deleteMatch",
    payload: id,
  };
}

const initialState = {
  match: [
    {
      id: 1,
      score: 0,
    },
    {
      id: 2,
      score: 0,
    },
  ],
};

function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        match: state.match.map((info) =>
          info.id === action.payload.id
            ? { ...info, score: info.score + action.payload.score }
            : info
        ),
      };
    case "decrement":
      return {
        ...state,
        match: state.match.map((info) =>
          info.id === action.payload.id
            ? {
                ...info,
                score:
                  info.score < action.payload.score
                    ? 0
                    : info.score - action.payload.score,
              }
            : info
        ),
      };
    case "reset":
      return {
        ...state,
        match: state.match.map((info) => ({ ...info, score: 0 })),
      };
    case "addMatch":
      return {
        ...state,
        match: [...state.match, action.payload],
      };
    case "deleteMatch":
      return {
        ...state,
        match: state.match.filter((info) => info.id != action.payload),
      };

    default:
      return state;
  }
}

let store = Redux.createStore(scoreReducer);

function render() {
  const state = store.getState();

  //  Display all match information in html
  const allMatches = document.querySelector(".all-matches");
  allMatches.innerHTML = "";

  state.match.forEach((match) => {
    const matchElement = document.createElement("div");
    matchElement.classNameNameList.add("match");

    matchElement.innerHTML = `
    <div classNameName="wrapper">
      <button classNameName="lws-delete ${match.id}" data-id="${match.id}" >
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 classNameName="lws-matchName${match.id}">Match ${match.id}</h3>
    </div>
    <div classNameName="inc-dec">
      <form classNameName=" matchForm incrementForm">
        <h4>Increment</h4>
        <input type="number" name="increment" classNameName="lws-increment ${match.id}" />
      </form>
      <form classNameName="matchForm decrementForm">
        <h4>Decrement</h4>
        <input type="number" name="decrement" classNameName="lws-decrement ${match.id}" />
      </form>
    </div>
    <div classNameName="numbers">
      <h2 classNameName="lws-singleResult">${match.score}</h2>
    </div>
  `;

    allMatches.appendChild(matchElement);
  });
}

render();
store.subscribe(render);

// dynamically handle delete
document.addEventListener("click", function (e) {
  const target = e.target.closest(".lws-delete"); // Or any other selector.
  if (target) {
    store.dispatch(DeleteMatch(Number(target.classNameNameList[1])));
  }
});

// dynamically handle form
document.addEventListener("submit", function (e) {
  e.preventDefault();
  const target = e.target.closest(".matchForm");

  if (target.children[1].name === "increment") {
    store.dispatch(
      Increment(
        // Receive score and id
        Number(target.children[1].value),
        Number(target.children[1].classNameNameList[1])
      )
    );
  }
  if (target.children[1].name === "decrement") {
    store.dispatch(
      Decrement(
        // Receive score and id
        Number(target.children[1].value),
        Number(target.children[1].classNameNameList[1])
      )
    );
  }
});

resetBtn.addEventListener("click", () => {
  store.dispatch({ type: "reset" });
});

addMatch.addEventListener("click", () => {
  const state = store.getState();
  store.dispatch(AddMatch(0, Number(state.match.length + 1)));
});
