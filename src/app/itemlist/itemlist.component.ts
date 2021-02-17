import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemlistComponent implements OnInit {

  xxx = 0
  ourData = []
  APIkey = "c87a8cdae13f467c8b3a6ca2991bf2be"

  selectRecipe = (x) => {
    console.log(x)
  }

  async deleteRecipe(url) {
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist/" + url, {
      method: 'delete'
    })
    this.fetchData()
    this.xxx = this.xxx + 1
  }


  async fetchData() {
      let response = await fetch(
        "https://crudcrud.com/api/" + this.APIkey + "/itemlist"
      );
      let responseJson = await response.json();
      this.ourData = responseJson
      console.log(responseJson)
      this.xxx = this.xxx + 1
  }

  async addData() {
    let response = await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "cereals with milk",
        "preparationTimeInMinutes": "1",
        "description": "put cereals in and then add some milk",
        "ingredients": [{"_id": "1", "name": "cereals", "quantity": "100g"},{"_id": "2", "name": "milk", "quantity": "100ml"}]
    }),
    })
    let responseJson = await response.json();
    this.ourData.push(responseJson)
    console.log(responseJson)
    this.xxx = this.xxx + 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
