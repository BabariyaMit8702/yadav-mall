 let btncc = document.getElementById("btncc");
          let cbg = document.getElementById("cbg");
          function cb(vr) {
            let currunt_color = getComputedStyle(vr).color;
            let currunt_bgcolor = getComputedStyle(vr).backgroundColor
            if (currunt_color === "rgb(255, 255, 255)") {
              vr.style.color = "black";
              vr.style.backgroundColor = "#d8dee9";
              document.getElementById('btncc').innerHTML = "DARK"
            }
            else {
              vr.style.color = "white";
              vr.style.backgroundColor = "#36404a";
              document.getElementById('btncc').innerHTML = "LIGHT"
            }
          }
          btncc.addEventListener("click", function () {
            cb(cbg);
          });