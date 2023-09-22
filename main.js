//console.log("baglandı")
//HTMLden çektiğimiz elemanlar

const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const listArea = document.getElementById("list")
const statusCheckbox =document.getElementById("status-check")
const sumInfo = document.getElementById("sum-info")
//const deleteBtn =getElementById("delete")
const userInput = document.getElementById("user-input")
const select = document.querySelector("select")


//console.log(statusCheckbox)

//console.log(nameInput,priceInput)

//izlediğimiz olaylar

addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input",saveUser)
document.addEventListener("DOMContentLoaded", getUser)
select.addEventListener("change", handleFilter)

//toplamın değerini burada tutatacağız

let sum = 0;

//hem ekranı güncelleyecek hem toplamı yazacak bir fonksiyon

function updateSum(price){
    //jsdeki toplam değerini günceller
    sum += Number(price);

    //htmldeki toplam bilgi alanını güncelleme
    sumInfo.innerText =sum;
}

//eventListener ile çalıştırılan fonksiyonlar
//olay hakkında bilgileri içeren bir parametre gider

function addExpense(event) {
  // alert("tıklandı");
  //sayfayı yenilemesini engelleme
  event.preventDefault();
  //console.dir bana daha detaylı bir açıklama verir
  //console.log(nameInput.value,priceInput.value)
  //alert(nameInput.value + priceInput.value)

  //1- inputların biri bile boş ise alert ver ve fonksiyonu durdur
  // değişkenin değerlerinin undefined null NaN {} "" bütün boş olma durumlarını ! kontrol eder

  if (!nameInput.value || !priceInput.value) {
    alert("Please write expense and the price");
    return;
  }

  //2- inputlar dolu ise bir kart oluştur ve htmlye gönder
  //a-div oluşturma
  const expenseDiv = document.createElement("div");

  //b-dive class ekleme
  expenseDiv.classList.add("expense");

  //eğer ödendi checkboxı tıklandı ise paid classı ekle
  if(statusCheckbox.checked===true){
    expenseDiv.classList.add("paid");
    
  }

  //divimizi ve classını tamamladık şimdi içerik eklemek için innerHTML
  expenseDiv.innerHTML = `
    <h2 class="name">${nameInput.value}</h2>
          <h2 class="price">${priceInput.value}</h2>
          <div class="btns">
           <img id="edit" src="assets/pay-icon.png" >
           <img id="delete" src="assets/delete-icon.png" >
          </div>
    `;

    //oluşan elemanı htmlye gönderme--->appenchild ile gönderebiliyoruz
    listArea.appendChild(expenseDiv)

//toplam alanını güncelleme fonksiyonu
updateSum(priceInput.value)

    //formu temizleme
    nameInput.value ='';
    priceInput.value ='';
    statusCheckbox.checked =false;

}

//listedeki bir elemana tıklayınca çalışır
function handleUpdate(evet){
    //console.log(event.target) --->targetı buluyoruz
    const ele = event.target;
    //silme resminin kapsayıcısına erişme
    const parent =ele.parentElement.parentElement

    //yalnızca silme işleminde silinecek kod
    if(ele.id==="delete"){
        //alert("Delete is successful")
        
        //elementi silme
        parent.remove();

        //toplam fiyat bilgisini güncelleme
        const price = parent.querySelector(".price").textContent
        // console.log(price.textContent)

        updateSum(Number(price) * -1)
        



    }

    //elemanın idsi edit ise onun paid classını tersine çevir
    if(ele.id === "edit"){
      parent.classList.toggle('paid')

    }


}

//kullanıcıyı locala kaydetme
function saveUser (event){
//console.log(event.target.value)
localStorage.setItem('username', event.target.value)
}

//kullanıcı localde varsa onu alma
function getUser (){
  //console.log('uygulama yüklendi')
  const username = localStorage.getItem('username')|| ''

  //console.log(username)

  //kullanıcı ismini inputa aktar
  userInput.value =username
}

//filtreleme kısmı
function handleFilter (){
  //console.log(event.target.value)
  const selected =event.target.value
  const items = list.childNodes

  //tüm elemanları dönme
  items.forEach((item) => {

      //selected alabileceği değerleri izleme
  switch(selected){
    case "all":
      item.style.display ='flex'
      break;

      case "paid":
        if(item.classList.contains("paid")){
          item.style.display = "flex"
        }else{
          item.style.display = "none"
        }
        break;

        case "not-paid":
          if(!item.classList.contains('paid')){
            item.style.display ='flex'
          }else{
            item.style.display ='none'
          }
        break;

  }



  })

}





//Hoisting()------> yukarda tanımlayıp nerede olursa olsun okur ama arrow functionda bu olmaz(sadece normal fonksiyon)
//önemli olan değerleri olan fonksiyon ve değişkenleri ilk önce tanımlar
//önce kullanıp sonra tanımlayabiliriz arrow functionda işlemez
