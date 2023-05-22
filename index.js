
let theadTr = document.querySelector(".table-headCol");
let tBody = document.querySelector(".table-body");
let focus_td;
let cut_value = {};
let italic_btn = document.getElementById("italic-btn");
let underline_btn = document.getElementById("underline-btn");
let bold_btn = document.getElementById("bold-btn");

let bg_color = document.getElementById("bg-color");
let text_color = document.getElementById("text-color");

let left_align = document.getElementById("left");
let right_align = document.getElementById("right");
let center_align = document.getElementById("center");
let font_size = document.getElementById("font-size");
let font_family = document.getElementById("font-family");

let copy = document.getElementById("copy");
let cut = document.getElementById("cut");
let paste = document.getElementById("paste");
let rows = 100;
let cols = 26;
// created a matrix to save data
let matrix = new Array(rows);

for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
  for (let j = 0; j < cols; j++) {
    matrix[i][j] = {};
  }
}

for (let i = 0; i < cols; i++) {
  //creating the th element and appending in thead element
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(i + 65);
  theadTr.appendChild(th);
}

function create_table_body() {
  for (let i = 0; i < rows; i++) {
    //creating the tr and th element and appending in tbody
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = i + 1;
    tr.appendChild(th);

    for (let j = 0; j < 26; j++) {
      var td = document.createElement("td");
      td.setAttribute("contenteditable", "true");
      td.setAttribute("spellcheck", "false");
      td.setAttribute("id", `${String.fromCharCode(j + 65)}${i + 1}`);
      td.addEventListener("focus", (event) => onfocus_to_td(event));
      td.addEventListener("input", (event) => onInput_to_td(event));
      tr.appendChild(td);
    }

    tBody.appendChild(tr);
  }
}
create_table_body();//function to create table body


const trs = document.querySelectorAll("tr");

function onInput_to_td() {
  saveDataInMat(focus_td);
}

function onfocus_to_td(event) {
  focus_td = event.target;
  document.getElementById("cellNo").innerText = event.target.id;
  console.log(document.getElementById("cellNo"));
  saveDataInMat(focus_td);
}


// italic,bold and underline_btn
bold_btn.addEventListener("click", () => {
  if (!focus_td) return;

  if (focus_td.style.fontWeight == "bold") {
    focus_td.style.fontWeight = "normal";
  } else {
    focus_td.style.fontWeight = "bold";
  }
  saveDataInMat(focus_td);
});

underline_btn.addEventListener("click", () => {
  if (!focus_td) return;
  if (focus_td.style.textDecoration == "underline") {
    focus_td.style.textDecoration = "none";
  } else {
    focus_td.style.textDecoration = "underline";
  }
  saveDataInMat(focus_td);
});

italic_btn.addEventListener("click", () => {
  if (!focus_td) return;

  console.log(focus_td.style.fontStyle == "italic");
  if (focus_td.style.fontStyle == "italic") {
    focus_td.style.fontStyle = "normal";
  } else {
    focus_td.style.fontStyle = "italic";
  }
  saveDataInMat(focus_td);
});

//AddEventListner for the color of text and bg
text_color.addEventListener("input", () => {
  if (!focus_td) return;
  focus_td.style.color = text_color.value;
  saveDataInMat(focus_td);
  console.log(matrix);
});

bg_color.addEventListener("input", () => {
  if (!focus_td) return;
  focus_td.style.backgroundColor = bg_color.value;
  saveDataInMat(focus_td);
  console.log(matrix);
});

//  text alignment in a cell
left_align.addEventListener("click", () => {
  if (!focus_td) return;
  focus_td.style.textAlign = "left";
  saveDataInMat(focus_td);
  console.log(matrix);
});

right_align.addEventListener("click", () => {
  if (!focus_td) return;
  focus_td.style.textAlign = "right";
  saveDataInMat(focus_td);
});

center_align.addEventListener("click", () => {
  if (!focus_td) return;
  focus_td.style.textAlign = "center";
  saveDataInMat(focus_td);
});

// font size 
font_size.addEventListener("change", (event) => {
  // focus_td.style.fontSize = event.target.value;
  focus_td.style.fontSize = font_size.value;
  saveDataInMat(focus_td);
});

// font family
font_family.addEventListener("change", () => {
  if (!focus_td) return;//if focus_td is undefined

  focus_td.style.fontFamily = font_family.value;
  saveDataInMat(focus_td);
});

// copy ,paste and cut
cut.addEventListener("click", () => {
  if (!focus_td) return;//if focus_td is undefined
  cut_value = {
    style: focus_td.style.cssText,
    text: focus_td.innerText,
  };
  saveDataInMat(focus_td);
  focus_td.style.cssText = null;
  focus_td.innerText = null;
});

paste.addEventListener("click", () => {
  if (!focus_td) return;//if focus_td is undefined


  focus_td.innerText = cut_value.text;
  focus_td.style.cssText = cut_value.style;
  saveDataInMat(focus_td);
});

copy.addEventListener("click", () => {
  if (!focus_td) return;//if focus_td is undefined

  cut_value = {
    style: focus_td.style.cssText,
    text: focus_td.innerText,
  };
  saveDataInMat(focus_td);
  console.log(cut_value);
});









// Save Data in array of arrays's of objects(matrix of objects)
function saveDataInMat(currCell) {
  var obj = {
    style: currCell.style.cssText,
    text: currCell.innerText,
    id: currCell.id,
  };



  let str = obj.id;
  let i = str.slice(1) - 1;
  let j = str.charCodeAt(0) - 65;

  matrix[i][j] = obj;//data of td

  if (arr_of_matrix.length == no_of_sheet) {
    arr_of_matrix[arr_of_matrix.length - 1] = matrix;
    localStorage.setItem("arr_of_matrix",JSON.stringify(arr_of_matrix));
  } else {
    let holdarr_of_matrix = JSON.parse(localStorage.getItem("arr_of_matrix"));
      // arr_of_matrix = [...holdarr_of_matrix, matrix];
      arr_of_matrix=holdarr_of_matrix;
      arr_of_matrix.push(matrix);
      localStorage.setItem("arr_of_matrix", JSON.stringify(arr_of_matrix));
  }


}
// function to downloading json file
function downloadJson() {

  // Convert objects to JSON format to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data string in array and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });
  console.log(blob);

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  console.log(link);
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; //Set the desired file name download attribute 

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



function chooseFile() {
  console.log("chooseFile working");
  document
    .getElementById("choosefile1")
    .addEventListener("input", readJsonFile);
}
// uploading of file
function readJsonFile(event) {
  console.log("working now", event.target)

  console.log("working now", event.target.files)//El.files -> FileList
  const file = event.target.files[0];
  console.log(file);
  //returning the files list object but accessing the

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      console.log(fileContent);

      // {id,style,text}
      // Parse the JSON file content and process the data

      try {
        const jsonData = JSON.parse(fileContent);
        // console.log(typeof jsonData);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((obj) => {
            if (obj.id) {
              var myCell = document.getElementById(obj.id);

              console.log(obj);
              myCell.innerText = obj.text;
              myCell.style.cssText = obj.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}





// Adding the new sheet task here
let no_of_sheet = 1;
let arr_of_matrix = [matrix];
let addSheetBtn = document.getElementById("addSheet");
let sheetsAll = document.querySelector(".sheets");

addSheetBtn.addEventListener("click", () => {
  no_of_sheet++;
  console.log("no_of_sheet", no_of_sheet);
  sheetsAll.innerHTML += `<span class="material-icons" id="sheet-${no_of_sheet}" onclick="showCurrSheetData(this)">file_present</span>`

  // Creating a new matrix for current sheet with empty objects
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = {};
    }
  }

  //emptying the tbody again render all tbody content
  tBody.innerHTML = ``;
  create_table_body();//call the function to create tbody again

});




//Removing one by one file  sheet which has been created from UI and localstorage
document.getElementById("removeFile").addEventListener("click", () => {
  arr_of_matrix = JSON.parse(localStorage.getItem("arr_of_matrix")) || [];
  console.log(arr_of_matrix);
  if (arr_of_matrix.length > 0) {
    arr_of_matrix.pop();
    localStorage.setItem("arr_of_matrix", JSON.stringify(arr_of_matrix));
    sheetsAll.removeChild(sheetsAll.lastElementChild);
    no_of_sheet--;
    tBody.innerHTML="";
    create_table_body();//create fresh table body again
  }
});


function showCurrSheetData(event) {
  //deleting the previous data from sheet
  tBody.innerHTML = ``;
  create_table_body();//call the function to create tbody again


  //showing the current data
  var arr_of_matrix = JSON.parse(localStorage.getItem("arr_of_matrix"));

  let idx = event.id.split("-")[1];//sheet no
  let matrix = arr_of_matrix[idx - 1];//matrix
  console.log( idx);

  matrix.forEach((row) => {
    row.forEach((cell) => {//cell->obj
      if (cell.id) {
        var myCell = document.getElementById(cell.id);
        myCell.innerText = cell.text;
        myCell.style.cssText = cell.style;
      }
    });
  });
}



window.onload = () => {
  arr_of_matrix = JSON.parse(localStorage.getItem("arr_of_matrix")) || [];

  for (let i = 0; i < arr_of_matrix.length; i++) {
    sheetsAll.innerHTML += `<span class="material-icons" id="sheet-${++no_of_sheet}" onclick="showCurrSheetData(this)">file_present</span>`
  }


}


window.onbeforeunload = () => {
  localStorage.setItem("arr_of_matrix", JSON.stringify(arr_of_matrix));
};
