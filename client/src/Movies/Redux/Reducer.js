const initState = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: [""]
};

export const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_MOVIE":
      console.log(action.payload);

      return { ...state };
    default:
      return state;
  }
};
