import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string[];
  posts:Post[];
  isEdit:boolean = false;

  constructor(private ds:DataService) {
    console.log("constructor ran...");
  }

  ngOnInit() {
    this.name = 'John Doe';
    this.age = 30;
    this.email = 'jdoe@email.com';
    this.address = {
      street:"123 Main St.",
      city:"Austin",
      state:"TX"
    }
    this.hobbies = ['basket weaving', 'extreme knitting', 'nail clipping'];

    this.ds.getPosts().subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  }

  onClick() {
    this.hobbies.push('New Hobby');
  }

  addHobby(hobby) {
    console.log("Adding: " + hobby);
    this.hobbies.push(hobby);
    return false;
  }

  deleteHobby(hobby) {
    console.log("Deleting: " + hobby);
    for (let i = 0; i < this.hobbies.length; i++) {
      if (this.hobbies[i] == hobby) {
        this.hobbies.splice(i, 1);
      }
    }
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

}

interface Address {
  street:string,
  city:string,
  state:string
}

interface Post {
  id:number,
  title:string,
  body:string,
  userId:number
}