export const commaSeperatorInr = (totalval = 0) => {
  const a =
    totalval.length > 0
      ? totalval
          .split("")
          .filter(
            (item) => item.charCodeAt(0) >= 58 && item.charCodeAt(0) <= 126
          )
      : [];
  if (
    totalval !== 0 &&
    totalval !== "" &&
    totalval != "₹" &&
    a.toString().length < 1
  ) {
    // var totalval1 = e.target.value;
    var input = totalval.toString().replace("₹", "");
    var x = input.toString();
    x = x.toString().replace(/,/g, "");

    var afterPoint = "";
    if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res =
      "₹" +
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      lastThree +
      afterPoint;
    // e.target.value = res;
    return res;
  } else if (totalval === "₹") {
    return 0;
  } else return "";
};
