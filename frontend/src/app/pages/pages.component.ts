import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { tokenService } from '../services/tokenService';
import { Router } from '@angular/router';

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="#">SIH Internal System</a> 2016</div>
        <!--<ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>-->
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit {

  constructor(private tokenService: tokenService, private router: Router) {
  }

  ngOnInit() {
    // console.log(this.tokenService.getToken());
    if (!this.tokenService.getToken()){
      this.router.navigate(['login']);
    }
  }
}
