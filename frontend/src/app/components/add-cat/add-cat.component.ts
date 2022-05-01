import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {
  cat = {
    name: '',
    color: '',
    birth_year: '',
    breed: '',
    // owner: '',
    // age: ''
    // published: false
  };
  submitted = false;
  constructor(private catService: CatService) { }
  ngOnInit() {
  }
  saveCat() {
    const data = {
      name: this.cat.name,
      color: this.cat.color,
      birth_year: this.cat.birth_year,
      breed: this.cat.breed
    };
    this.catService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newCat() {
    this.submitted = false;
    this.cat = {
      name: '',
      color: '',
      birth_year: '',
      breed: '',
      // published: false
    };
  }
}
