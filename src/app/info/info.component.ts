import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() data:any
  @Input() active:any
  @Input() edit:any
  @Input() new:any
  @Input() APIkey:any
  @Output() sendRefresh = new EventEmitter<any>()
  @Output() sendError = new EventEmitter<any>()

  constructor() { }

  filterID = (data, id) => {
    for(let i = 0; i<data.ingredients.length; i++) {
      if(data.ingredients[i]._id === id) {
        this.data.ingredients = data.ingredients.filter((x) => (x._id !== id))
      }
    }
  }
  
  addMore = () => {
    this.data.ingredients.push({_id: "", name: "", quantity: ""})
  }

  async acceptChanges() {
    this.active = ["true"]
    this.edit = []
    await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist/" + this.data._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": this.data.name,
        "preparationTimeInMinutes": this.data.preparationTimeInMinutes,
        "description": this.data.description,
        "ingredients": this.data.ingredients
    }),
    })
    this.sendError.emit("Success")
  }

  declineChanges = () => {
    this.fetchData()
    this.edit = []
    this.active = ["true"]
    this.sendRefresh.emit("refresh")
  }

  declineChangesNew = () => {
    this.edit = []
    this.active = []
    this.new = []
    this.sendRefresh.emit("refresh")
  }

  async getData(response) {
    let preData = await response.json()
    for(let i = 0; i<preData.length; i++) {
      if(preData[i]._id === this.data._id) {
        this.data = preData[i]
      }
    }
  }

  async fetchData() {
      await fetch(
        "https://crudcrud.com/api/" + this.APIkey + "/itemlist"
      ).then((response) => this.getData(response))
  }

  async addData() {
    if(this.data.name.length >= 3 && this.data.name.length <= 80 && Number.isInteger(Number(this.data.preparationTimeInMinutes)) === true && this.data.description.length >= 15 && this.data.description.length <= 255 && this.data.ingredients.length >= 2) {
      await fetch("https://crudcrud.com/api/" + this.APIkey + "/itemlist", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": this.data.name,
          "preparationTimeInMinutes": this.data.preparationTimeInMinutes,
          "description": this.data.description,
          "ingredients": this.data.ingredients
      }),
      })
      this.sendRefresh.emit("refresh")
      this.sendError.emit("Success")
      this.new = []
    }
    else {
      this.sendError.emit("Error")
    }
  }

  ngOnInit(): void {
  }

}
