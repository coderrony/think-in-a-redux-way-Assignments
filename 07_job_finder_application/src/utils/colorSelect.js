const colorSelect = (jobType) => {
  if (jobType === "Internship") {
    return "#FF5757";
  } else if (jobType === "Full Time") {
    return "#FF8A00";
  } else if (jobType === "Remote") {
    return "#56E5C4";
  }
};

export default colorSelect;
