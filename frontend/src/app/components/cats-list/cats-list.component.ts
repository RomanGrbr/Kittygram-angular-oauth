import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/services/cat.service';
@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {
  cats: any;
  currentCat = null;
  currentIndex = -1;
  name = '';
  constructor(private catService: CatService) { }
  ngOnInit() {
    this.retrieveCats();
  }
  retrieveCats() {
    this.catService.getAll()
      .subscribe(
        data => {
          this.cats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList() {
    this.retrieveCats();
    this.currentCat = null;
    this.currentIndex = -1;
  }
  // setActiveCat(cat, index) {
  //   this.currentCat = cat;
  //   this.currentIndex = index;
  // }
  // removeAllCats() {
  //   this.catService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.retrieveCats();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  searchName() {
    this.catService.findByTitle(this.name)
      .subscribe(
        data => {
          this.cats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
