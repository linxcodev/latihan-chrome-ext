function $(id) {
  return document.getElementById(id);
}

function create(name, props) {
  let element = document.createElement(name);

  for (var i in props) {
    element[i] = props[i];
    // element.setAttribute("onclick", "test()");
  }

  return element;
}

function get(url, name) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      name(JSON.parse(this.responseText));
    }
  }

  xhttp.open("GET", url, true);
  xhttp.send();
}

function ayat(res) {
  $("ayat").innerHTML = res.ayat.data.ar[0].teks;
  $("terjemah").innerHTML = res.ayat.data.id[0].teks;
}

function listSurah(res) {
  var msgContainer = document.createDocumentFragment();

  for (var i = 0; i < res.hasil.length; i++) {
    msgContainer.appendChild(create('option', {
      text: res.hasil[i].nama,
      value: res.hasil[i].nomor,
      id: 'surah' + res.hasil[i].nomor
    }));
  }

  $('surah').appendChild(msgContainer);
}

function test() {
  console.log("bisa");
}

function myFunction() {
  var x = document.getElementById("mySelect").value;
  document.getElementById("demo").innerHTML = "You selected: " + x;
}

get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat);
get("https://api.banghasan.com/quran/format/json/surat", listSurah);
