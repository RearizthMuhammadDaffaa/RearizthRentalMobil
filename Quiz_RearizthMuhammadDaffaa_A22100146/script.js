

const selectCar = document.getElementById("car")
selectCar.addEventListener('change',pilihMobil)




function pilihMobil(e){
  const carImg = document.getElementById('car-img')
  const harga = document.getElementById('harga')
 
  switch (e.target.value) {
    case "BMW-e36":
        carImg.src = "asset/BMW e36.jpg"
        harga.textContent = "500000"
      break;
    case "mercedes-amg-c63":
      carImg.src = "asset/mercedes amg c63.jpg"
      harga.textContent = "300000"
      break;
    case "honda-civic":
      carImg.src = "asset/honda civic.jpg"
      harga.textContent = "400000"
      break;
    case "bmw-m3":
      carImg.src = "asset/bmw m3.jpg"
      harga.textContent = "800000"
      break;
    default:
      break;
  }
  console.log(parseInt(harga.textContent));
}

function checkHarga(e){
  const harga = document.getElementById('harga')
  
}

function pilihMobilEdit(e){
  const carImgEdit = document.getElementById('car-img-edit')
  const harga = document.getElementById('harga')
  switch (e.target.value) {
    case "BMW-e36":
        carImgEdit.src = "asset/BMW e36.jpg"
        harga.textContent = "500000"
      break;
    case "mercedes-amg-c63":
      carImgEdit.src = "asset/mercedes amg c63.jpg"
      harga.textContent = "500000"
      break;
    case "honda-civic":
      carImgEdit.src = "asset/honda civic.jpg"
      harga.textContent = "500000"
      break;
    case "bmw-m3":
      carImgEdit.src = "asset/bmw m3.jpg"
      harga.textContent = "500000"
      break;
    default:
      break;
  }
 
}



window.addEventListener('load',()=>{
  sewa = JSON.parse(localStorage.getItem("sewa")) || [];
  const data = [];
  const formRental = document.getElementById('form-rental')
  formRental.addEventListener('submit',(e)=>{
    e.preventDefault()
    const nama = document.getElementById('nama').value
    const alamat = document.getElementById('alamat').value
    const car = document.getElementById('car').value
    const durasiWaktu = document.getElementById('durasi').value
    let insertData = {
      id: new Date(),
      nama:nama,
      alamat:alamat,
      gender: e.target.elements.gender.value ,
      car: car,
      durasi: durasiWaktu
    }

    sewa.push(insertData)
    localStorage.setItem('sewa',JSON.stringify(sewa))
    e.target.reset()
    displayData();
  })
  
  
displayData()
 


})

function displayData(){
  const userContainer = document.getElementById('user-container')
  userContainer.innerHTML = "";
  sewa.forEach((item,index) => {
    const searchName = document.getElementById('searchName')
   
    searchName.addEventListener('keyup',()=>{
      let filter = searchName.value.toUpperCase()
      let name;
      let txtValue;
      const dataUser = document.querySelectorAll('.data-penyewa');
      const cardSearch = document.querySelectorAll('.card')
      for(let i = 0; i< dataUser.length; i++){
          name = dataUser[i].getElementsByTagName("p")[0];
          txtValue = name.textContent || name.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              cardSearch[i].style.display = "";
          } else {
              cardSearch[i].style.display = "none";
          }
      }
    })


    const filterGender = document.getElementById('filterGender')
    filterGender.addEventListener('change',(e)=>{
      if(e.target.value == "all"){
          card.classList.remove('none')
      }else if(e.target.value == "Pria"){
        if(item.gender == "Perempuan"){
          card.classList.add("none")
        }else{
          card.classList.remove("none")
        } 
      }else if(e.target.value == "Perempuan"){
        if(item.gender == "Pria"){
          card.classList.add("none")
        }else{
          card.classList.remove("none")
        }  
      }
    })
    const card = document.createElement('div');
    const genderImg = document.createElement('img');
    const dataPenyewa = document.createElement('div');
    const action = document.createElement('div');
    const edit = document.createElement('button')
    const hapus = document.createElement('button')
    const inputId = `<input type="hidden" value="${index}" name="id">`
    edit.textContent = "Edit"
    hapus.textContent = "hapus"
    card.classList.add('card')
  
    
    genderImg.src = item.gender == "Pria" ? 'asset/male.png':'asset/female.jpg'
    dataPenyewa.classList.add('data-penyewa')
    action.classList.add('action')
    let biodata = `
    <p><span>Nama</span>: ${item.nama}</p>
    <p><span>Alamat</span>: ${item.alamat}</p>
    <p><span>gender</span>: ${item.gender}</p>
    <p><span>merk</span>: ${item.car}</p>
    <p><span>Durasi</span>: ${item.durasi}</p>
    `
    dataPenyewa.innerHTML += biodata;
    card.innerHTML += inputId
    card.appendChild(genderImg);
    card.appendChild(dataPenyewa);
    card.appendChild(action);
    action.appendChild(edit);
    action.appendChild(hapus);

    userContainer.appendChild(card)
    
    hapus.addEventListener('click',(e)=>{
      sewa = sewa.filter(s=> s != item);
      localStorage.setItem('sewa',JSON.stringify(sewa))
      displayData();
    })
    
    edit.addEventListener('click',(e)=>{
      const editBtn = document.getElementById('edit')
      const modal = document.getElementById('modal')
      const namaEdit = document.getElementById('nama-edit')
      const alamatEdit = document.getElementById('alamat-edit')
      const genderPria = document.getElementById('pria-edit')
      const genderPerempuan = document.getElementById('perempuan-edit')
      const editCar = document.getElementById('car-edit')
      const optionSelect = document.querySelectorAll('.optionsSelect')
      const  durasi = document.getElementById('durasi-edit')
      const durasiSelect = document.querySelectorAll('.selectDurasi')
      editCar.addEventListener('change',pilihMobilEdit )
       for(let i = 0; i < optionSelect.length; i++){
        optionSelect[i].id = `data-id-${i}`
       }

    


      


        if(inputId){
            modal.style.display = "block"
            namaEdit.value = sewa[index].nama
            alamatEdit.value = sewa[index].alamat
            
            for(let i = 0; i < optionSelect.length; i++){          
              if(sewa[index].car == optionSelect[i].value){
                optionSelect[i].setAttribute('selected', true);
              }
             }

             for(let i = 0; i < durasiSelect.length; i++){   
              console.log(durasiSelect[i]);       
              if(sewa[index].durasi == durasiSelect[i].value){
                durasiSelect[i].setAttribute('selected', true);
              }
             }
            

              if(sewa[index].car == "BMW-e36") {
                document.getElementById('car-img-edit').src = "asset/BMW e36.jpg"
              } else if (sewa[index].car == "bmw-m3") {
                document.getElementById('car-img-edit').src = "asset/bmw m3.jpg"
              } else if (sewa[index].car == "honda-civic"){
                document.getElementById('car-img-edit').src = "asset/honda civic.jpg"
              } else{
                document.getElementById('car-img-edit').src = "asset/mercedes amg c63.jpg"
              } 
               
              
            
            if(sewa[index].gender == "Pria") {
              genderPria.checked = true
            }else{
              genderPerempuan.checked = true
            }
            console.log(index);
        }
        editBtn.addEventListener('click',()=>{         
          sewa[index].nama = namaEdit.value
          sewa[index].alamat = alamatEdit.value
          sewa[index].car = editCar.value
          sewa[index].durasi = durasi.value
         if(genderPria.checked ){
          sewa[index].gender = "Pria"
         }else{
          sewa[index].gender = "Perempuan"
         }
        
          localStorage.setItem('sewa',JSON.stringify(sewa))
          displayData();
        })
      });
    })

  

    const batal = document.getElementById('batal')
    batal.addEventListener('click',()=>{
      modal.style.display = "none"
    })

  window.addEventListener('click',(e)=>{
    if (e.target == modal) {
      modal.style.display = "none";
    }
  })

    

  

  
}
