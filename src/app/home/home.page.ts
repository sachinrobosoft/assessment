import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  tab = 'photoes';
  images: any = [];
  videos: any = [];
  searchVal = 'animals';
  favouriteList: any = [];
  page = 1;
  selectedItem: any;
  constructor(private apiService: ApiService,
    private router: Router, public modalController: ModalController
  ) {
    let fav = JSON.parse(localStorage.getItem('fav'));
    this.favouriteList = fav ? fav : [];
  }
  ngOnInit(): void {
    this.getImages(this.searchVal, this.page);
  }

  getImages(imageType, pages, callback?) {
    this.apiService.getImages(imageType, pages).subscribe((response) => {
      response.photos.forEach((data) => {
        this.images.push({ id: data.id, type: 'photoes', image: data.src.large, pName: data.photographer, isFav: false })
      });
      if (callback) {
        callback();
      }
      console.log(this.images)
    });
  }

  getVideos(videoType, pages, callback?) {
    this.apiService.getVideos(videoType, pages).subscribe((response) => {
      console.log(response);
      response.videos.forEach((data) => {
        this.videos.push({ id: data.id, type: 'videos', image: data.image, pName: data.user.name, videoLink: data.video_files[0].link, isFav: false })
      })
      if (callback) {
        callback();
      }
      console.log(this.videos)
    });
  }

  selectedTab(tabType) {
    this.clearVal();
    this.tab = tabType;
    if (this.searchVal.length > 2) {
      switch (this.tab) {
        case 'photoes': {
          this.getImages(this.searchVal, this.page)
        } break;
        case 'videos': {
          this.getVideos(this.searchVal, this.page)
        } break;
      }
    }
  }

  search() {
    this.clearVal();
    if (this.searchVal.length > 2) {
      switch (this.tab) {
        case 'photoes': {
          this.getImages(this.searchVal, this.page)
        } break;
        case 'videos': {
          this.getVideos(this.searchVal, this.page)
        } break;
      }
    }
  }

  clearVal() {
    this.page = 1;
    this.images = [];
    this.videos = [];
  }

  setFavourite(item) {
    item.isFav = !item.isFav;
    let isExistsInFav = this.favouriteList.find(data => data.id == item.id);
    if (!isExistsInFav) {
      this.favouriteList.push(item)
    }
    if (!item.isFav) {
      this.favouriteList = this.favouriteList.filter(data => data.id != item.id)
    }
    this.storeFav()
  }

  storeFav() {
    localStorage.setItem('fav', JSON.stringify(this.favouriteList));
  }

  remFavourite(item) {
    this.favouriteList = this.favouriteList.filter(data => data.id != item.id);
    this.storeFav()
  }

  loadData(event) {
    this.page = this.page + 1
    switch (this.tab) {
      case 'photoes': {
        this.getImages(this.searchVal, this.page, function () {
          event.target.complete();
        })
      } break;
      case 'videos': {
        this.getVideos(this.searchVal, this.page, function () {
          event.target.complete();
        })
      } break;
    }
  }

  playVideo(item) {
    this.apiService.setDetails = item;
    this.router.navigateByUrl('/home/details');
  }

  async openViewer(item) {
    if (item.type == 'photoes') {
      const modal = await this.modalController.create({
        component: ViewerModalComponent,
        componentProps: {
          src: item.image,
          title: item.pName,
          swipeToClose: true,
        },
        cssClass: 'ion-img-viewer',
        keyboardClose: true,
        showBackdrop: true,
      });
      return await modal.present();
    }
  }

}
