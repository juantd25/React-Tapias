import M from "materialize-css";

let options = {
  edge: "right",
  draggable: true,
  inDuration: 250,
  outDuration: 250,
  preventScrolling: true,
  accordion: true,
};

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, options);
});
