var data;
var homePage;

class HomePage{
  constructor(){
    this.data = data;
    this.tables = document.querySelector("#table ol");
    this.menu = document.querySelector("#menu ol");
  }
  
  getTotalCost(items){
    let total = items.reduce((total, curr) => {
       let currCost = data.menu[Number.parseInt(curr.id) - 1].cost * Number.parseInt(curr.count);
       total += currCost;
       return total; 
    }, 0);
    return total;
  }

  createTable(currentData){
    let currentList = document.createElement('li');
    currentList.setAttribute("id", "table" + currentData.id);
    let tableNameElement = document.createElement('p');
    tableNameElement.setAttribute("class", "tableName");
    tableNameElement.innerText = currentData.name;
    let currencyElement = document.createElement('p');
    currencyElement.setAttribute("class", "currency")
    currencyElement.innerText = this.data.currency;
    let costElement = document.createElement('p');
    costElement.setAttribute("class", "cost");
    costElement.innerText = this.getTotalCost(currentData.items);
    let itemsCountElement = document.createElement('p');
    itemsCountElement.setAttribute("class", "itemCount");
    itemsCountElement.innerText = "Total items : " + currentData.items.length;
    currentList.appendChild(tableNameElement);
    currentList.appendChild(currencyElement);
    currentList.appendChild(costElement);
    currentList.appendChild(itemsCountElement);
    currentList.setAttribute('class', 'dragged');
    currentList.addEventListener('click', () => {
      showTableInfo(currentList);
    });
    currentList.addEventListener('dragover', (event) => {
      event.preventDefault();
        // event.target.style.background = "yellow";
        
    });
    currentList.addEventListener('drop', (event)=>{
      let id = event.dataTransfer.getData("id").charAt(event.dataTransfer.getData("id").length - 1);
      let items = data.tableList[Number.parseInt(currentData.id) - 1].items;
      let isPresent = false;
      for(let item of items){
        if(id == item.id){
          item.count = Number.parseInt(item.count) + 1;
          isPresent = true;
          break;
        }
      }
      if(!isPresent){
        items.push({"id" : id, "count" : 1});
      }
      costElement.innerText = this.getTotalCost(data.tableList[Number.parseInt(currentData.id) - 1].items);
      itemsCountElement.innerText = "Total items : " + currentData.items.length;
    })
    return currentList;
  }

  createDish(currentData){
    let currentList = document.createElement('li');
    currentList.setAttribute("id", "dish" + currentData.id);
    let image = document.createElement('div');
    image.style.backgroundImage = `url(${currentData.url})`;
    
    image.setAttribute("class", "dish-image");
    let dishNameElement = document.createElement('p');
    dishNameElement.setAttribute("class", "dishName");
    dishNameElement.innerText = currentData.name;
    let currencyElement = document.createElement('p');
    currencyElement.setAttribute("class", "currency");
    currencyElement.innerText = this.data.currency;
    let costElement = document.createElement('p');
    costElement.setAttribute("class", "cost");
    costElement.innerText = currentData.cost;
    currentList.appendChild(image);
    currentList.appendChild(dishNameElement);
    currentList.appendChild(currencyElement);
    currentList.appendChild(costElement);
    currentList.setAttribute("draggable", "true");
    currentList.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData("id", event.target.id);
    });
    return currentList;
  }

  showTable(tableData){
    // const tableData = this.data.tableList; 
    for(let currentData of tableData){
      this.tables.appendChild(this.createTable(currentData))
    }
  }

  showMenu(menuData){
    // const menuData = this.data.menu;
    for(let currentData of menuData){
      this.menu.appendChild(this.createDish(currentData))
    }
  }

}
const popFoot = document.querySelector('.popup footer');
const popupContent = document.querySelector('.popup-back tbody');
const popupBox = document.querySelector('.popup-back');
const popupHeader = document.querySelector('.popup-back header');
const popupCloser = document.querySelector('.close-popup');
popupCloser.addEventListener('click', (event) => {
  popupBox.style.display = "none";
  popupContent.innerHTML = "";
  document.querySelector('.popup-back .popup header p').remove('p');
  popFoot.innerHTML = "";
});


function showTableInfo(tableElement){
  popupBox.style.display = "flex";
  tableElement.style.backgroundColor = "yellow";
  //get Id of clicked element
  const id = tableElement.getAttribute("id");
  const tableId = id.match(new RegExp('[1-9][0-9]*'))[0];
  //get Table details
  let itemsTable = getTableInfo(tableId);
  let items = itemsTable.items;
  let headerPara = document.createElement('p');
  let totalCostEle = document.createElement('p');
  headerPara.innerText = itemsTable.name + " | Order details";
  popupHeader.appendChild(headerPara);
  let menu = [];
  for(let item of items){
    menu.push(data.menu[Number.parseInt(item.id) - 1]);
  }
  totalCostEle.innerText = "Total cost : " + homePage.getTotalCost(itemsTable.items); 
  for(let itemIndex in menu){
    let row = document.createElement('tr');
    let sNo = document.createElement('td');
    let name = document.createElement('td');
    let price = document.createElement('td');
    let count = document.createElement('input');
    count.value = items[itemIndex].count;
    count.setAttribute('type', 'number');
    count.setAttribute('min', 1);
    sNo.innerText = Number.parseInt(itemIndex) + 1;
    row.setAttribute('id', 'item-' + menu[itemIndex].id);
    name.innerText = menu[itemIndex].name;
    price.innerText = menu[itemIndex].cost;
    row.appendChild(sNo);
    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(count);
    popupContent.appendChild(row);

    count.addEventListener('keyup', (event) => {
      let count = event.target.value;
      items[itemIndex].count = count;
      let costEle = tableElement.querySelector('.cost');
      let updatedCost = homePage.getTotalCost(itemsTable.items);
      costEle.innerText = updatedCost;
      totalCostEle.innerText = "Total cost : " + updatedCost;
    });
  }
  popFoot.appendChild(totalCostEle);
}

function getTableInfo(tableId){
  const table = data.tableList;
  let d = table.filter((currTable)=>{
    if(currTable.id === tableId){
      return true;
    }
  }).map((data) =>{
    return {"name" : data.name, "items" : data.items};
  });
  return d[0];
}


const menuFilter = document.querySelector('#menu-filter');
const tableFilter = document.querySelector('#table-filter');

menuFilter.addEventListener('keyup', (event) =>{
  let searchWord = event.target.value;
  let filteredList = data.menu.filter((curr) => {
    if(searchWord.toLowerCase() === curr.name.substr(0, searchWord.length).toLowerCase()){
      return true;
    }  
  });
  homePage.menu.innerHTML = '';
  homePage.showMenu(filteredList);
});

tableFilter.addEventListener('keyup', (event) =>{
  let searchWord = event.target.value;
  let filteredList = data.tableList.filter((curr) => {
    if(searchWord.toLowerCase() === curr.name.substr(0, searchWord.length).toLowerCase()){
      return true;
    }  
  });
  homePage.tables.innerHTML = '';
  homePage.showTable(filteredList);
});

const run = async ()=>{
  let res = await fetch("Data.json");
  data = await res.json();
  homePage = new HomePage();
  homePage.showTable(data.tableList);
  homePage.showMenu(data.menu);
};
run();