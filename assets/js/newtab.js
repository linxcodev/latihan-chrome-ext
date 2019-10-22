function $(id) {
  return document.getElementById(id);
}

function create(name, props) {
  let element = document.createElement(name);

  for (var i in props) {
    element[i] = props[i];
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
      value: res.hasil[i].nomor
    }));
  }

  $('listSurah').appendChild(msgContainer);
}

function listAyat(res) {
  $('listAyat').innerHTML = ''
  var msgContainer = document.createDocumentFragment();

  for (var i = 0; i < res.hasil[0].ayat; i++) {
    msgContainer.appendChild(create('option', {
      text: i+1,
      value: i+1
    }));
  }

  $('listAyat').appendChild(msgContainer);
  $('listAyat').value = 1
}

function change(surahSelect, ayatSelect) {
  get("https://api.banghasan.com/quran/format/json/surat/"+surahSelect+"/ayat/"+ayatSelect, ayat);
}

window.onload = function () {
  var surahSelected = 1;

  $('listSurah').addEventListener('change', function() {
      change(this.value, 1)
      surahSelected = this.value
      get("https://api.banghasan.com/quran/format/json/surat/"+this.value, listAyat);
  });

  $('listAyat').addEventListener('change', function() {
    change(surahSelected, this.value)
  });

  get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat);
  get("https://api.banghasan.com/quran/format/json/surat", listSurah);
  get("https://api.banghasan.com/quran/format/json/surat/1", listAyat);
}


// tugas
// 1. mokeup / white frime
// 2. waktu & tanggal hari ini
// 4. membuat button next and prev ayat
// 3. membuat list waktu sholat sesuai lokasi
// 4. menampilkan nama lokasi saat ini
// 5. menyimpan data yang dipilih user di local storage
// 6. atur waktu setelah 1 hari akan merubah ayat selanjutnya sesuai dengan data yang telah dipilih user
