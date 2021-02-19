import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {

  selectedAPIkey:string[] = ["false"]
  showContent:string[] = []
  ourData = []
  APIkey = ""
  selectedOne:object = {}
  isActive:string[] = []
  isEdit:string[] = []
  isNew:string[] = []
  errorMessage:string[] = []
  possitiveMessage:string[] = []

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
        this.possitiveMessage = [data]
      }
      setTimeout(this.closePopUps, 3000)
    }
  }

  startCreating = () => {
    this.selectedAPIkey= []
    this.showContent = ["true"]
    this.fetchData()
  }

  closePopUps = () => {
    this.errorMessage = []
    this.possitiveMessage = []
  }

  selectRecipe = (selected) => {
    for(let i = 0; i<this.ourData.length; i++) {
      if(this.ourData[i]._id === selected) {
        this.selectedOne = this.ourData[i]
        this.isActive = ["true"]
        this.isEdit = []
        this.isNew = []
      }
    }
  }

  editRecipe = (selected) => {
    for(let i = 0; i<this.ourData.length; i++) {
      if(this.ourData[i]._id === selected) {
        this.selectedOne = this.ourData[i]
        this.isActive = []
        this.isEdit = ["true"]
        this.isNew = []
      }
    }
  }

  async deleteRecipe(url) {
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist/" + url, {
      method: 'delete'
    })
    this.fetchData()
    this.possitiveMessage = ["Success"]
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
    this.isActive = []
    this.isEdit = []
    this.isNew = ["true"]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
