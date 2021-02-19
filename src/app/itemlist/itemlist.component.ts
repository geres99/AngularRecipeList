import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {

  ourData = []
  APIkey = "b4d0f497dab0475496cac27c20b126e4"
  selectedOne:object = {}
  isActive:any = []
  isEdit:any = []
  isNew:any = []
  errorMessage:any = []

  listener = (data) => {
    if(data) {
      this.fetchData()
    }
  }

  listenerError = (data) => {
    if(data) {
      if(data === "Error") {
        this.errorMessage = [data]
      }
      else {
        this.errorMessage = [data]
      }
      setTimeout(this.closePopUps, 3000)
    }
  }

  closePopUps = () => {
    this.errorMessage = []
  }

  selectRecipe = (selected) => {
    for(let i = 0; i<this.ourData.length; i++) {
      if(this.ourData[i]._id === selected) {
        this.selectedOne = this.ourData[i]
        this.isActive = ["true"]
        this.isEdit = []
      }
    }
  }

  editRecipe = (selected) => {
    for(let i = 0; i<this.ourData.length; i++) {
      if(this.ourData[i]._id === selected) {
        this.selectedOne = this.ourData[i]
        this.isActive = []
        this.isEdit = ["true"]
      }
    }
  }

  async deleteRecipe(url) {
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist/" + url, {
      method: 'delete'
    })
    this.fetchData()
    this.errorMessage = ["Success"]
    setTimeout(this.closePopUps, 3000)
  }

  async getData(response) {
    this.ourData = await response.json()
    this.isActive = []
  }
  

  async fetchData() {
      await fetch(
        "https://crudcrud.com/api/" + this.APIkey + "/itemlist"
      ).then((response) => this.getData(response))
  }

  x = this.fetchData()

  async addData() {
    this.selectedOne = {
      "name": "cereals with milk",
      "preparationTimeInMinutes": "1",
      "description": "add some cereals and then add milk",
      "ingredients": [{"_id": "1", "name": "cereals", "quantity": "100g"},{"_id": "2", "name": "milk", "quantity": "100ml"}]
  }
    this.isNew = ["true"]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
