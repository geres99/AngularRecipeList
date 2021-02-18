import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {

  ourData = []
  APIkey = "2e1177c2209d47809502a0cbbe398d6f"
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
      "name": "",
      "preparationTimeInMinutes": "",
      "description": "",
      "ingredients": [{"_id": "", "name": "", "quantity": ""}]
  }
    this.isNew = ["true"]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
