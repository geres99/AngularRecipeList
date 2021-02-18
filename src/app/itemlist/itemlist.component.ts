import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {

  xxx = 0
  ourData = []
  APIkey = "7ef4705ebe804b9d896fdf1cc3a327ed"

  selectRecipe = (x) => {
    console.log(x)
  }

  async deleteRecipe(url) {
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist/" + url, {
      method: 'delete'
    })
    this.fetchData()
  }

  async getData(response) {
    this.ourData = await response.json()
  }
  

  async fetchData() {
      await fetch(
        "https://crudcrud.com/api/" + this.APIkey + "/itemlist"
      ).then((response) => this.getData(response))
  }

  x = this.fetchData()

  async addData() {
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist", {
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
    this.fetchData()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
