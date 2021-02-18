import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {

  ourData = []
  APIkey = "f2706728248445afb0d31ed297b6e508"
  selectedOne:object = {}
  isActive:any = []
  isEdit:any = []
  isNew:any = []

  listener = (data) => {
    if(data) {
      this.fetchData()
    }
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
