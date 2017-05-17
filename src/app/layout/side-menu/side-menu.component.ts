/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import { UiStateService, UserService } from '../../services';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogService } from '../dialog.service';
import { DataPlugService } from '../../data-management/data-plug.service';
import { MarketSquareService } from '../../market-square/market-square.service';
import { Subscription } from 'rxjs/Subscription';
import { DataTable } from '../../shared/interfaces/data-table.interface';

import { Router, NavigationEnd } from '@angular/router';
import { APP_CONFIG, IAppConfig} from '../../app.config';
import { User } from '../../user/user.interface';
import {HatApiService} from '../../services/hat-api.service';

declare var $: any;

@Component({
  selector: 'rump-side-menu',
  templateUrl: 'side-menu.component.html'
})
export class SideMenuComponent implements OnInit {
  public selectedItem: string;
  private sub: Subscription;
  public state: any;
  public userAuthenticated = false;
  public menu: Array<any>;
  public dataplugList: Array<any>;
  public mobileMode:boolean = false;

  public profile: any;


  // hack: uiState service needs to be injected before Auth component,
  // so that it can subscribe for Auth observable in time.

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private uiState: UiStateService,
              private _dialogSvc: DialogService,
              private router: Router,
              private userSvc: UserService,
              private hatSvc: HatApiService,
              private dataplugSvc: DataPlugService,
              private marketSvc: MarketSquareService ) {}

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };
    this.userAuthenticated = false;
    this.menu = this.config.menuItems.public;

    this.hatSvc.getPublicData('profile').subscribe((profileResponse: any) => {
      if (profileResponse['public'] === true) {
        this.profile = profileResponse.profile;
      }
    });

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => this.selectedItem = event.url.slice(1));


    this.dataplugSvc.dataplugs$.subscribe( plug => {
      for(var i=0; i<plug.length; i++){
        plug[i].icon = plug[i].icon.replace(/ /g, "-");
      }
      this.dataplugList = plug;
      setTimeout(this.showPopover, 1000);
    });

    this.userSvc.user$.subscribe((user: User) => {
      this.userAuthenticated = user.authenticated;
      this.menu = user.authenticated ? this.config.menuItems.private : this.config.menuItems.public;
    });


    this.sub = this.uiState.tables$.subscribe((tables: Array<DataTable>) => {
      for (const table of tables) {
        const itemToActivate = this.menu.find(menuItem => menuItem.dataType.includes(table.name));
        if (itemToActivate) {
          itemToActivate.disable = '';
        }
      }
    });

    $(window).on("resize", function(){

      if(window.innerWidth > 1113){
        $('.menubar-left').css("left", "0px");
        $('.content-main-authenticated').css({marginLeft: "345px", left: "0px"});
        $('.burger').attr("data-content", "Hide menu");
        this.mobileMode = false;
      }
      else{
        $('.menubar-left').css("left", "-345px");
        $('.content-main-authenticated').css({marginLeft: "0px", left: "0px"});
        $('.burger').attr("data-content", "Show menu");
        this.mobileMode = true;
      }

      if($('.burger').data('bs.popover')){
        $('.burger').data('bs.popover').setContent();
        $('.burger').data('bs.popover').$tip.addClass($('.burger').data('bs.popover').options.placement);
      }
    });

    $(window).resize();

  }






  displayConfirmDialog() {
    this._dialogSvc.createDialog<DialogBoxComponent>(DialogBoxComponent, {
      buttons: [{
        title: 'Continue',
        link: 'https://marketsquare.hubofallthings.com/offers'
      }]
    });
  }


  openPlugPopup(plug: any) {
    const loginName = plug.name.charAt(0).toUpperCase() + plug.name.slice(1);

    const w = window.innerWidth;
    const h = window.innerHeight;

    const popupWidth = w * 0.6; const left = w * 0.2;
    const popupHeight = h * 0.7; const top = h * 0.15;

    const windowRef = window.open(
      `https://${this.marketSvc.hatDomain}/hatlogin?name=${loginName}&redirect=${plug.url}`,
      `Setting up ${plug.name} data plug`,
      `menubar=no,location=yes,resizable=yes,status=yes,chrome=yes,left=${left},top=${top},width=${popupWidth},height=${popupHeight}`
    );
  }


  showPopover() {
    //$('.sidebar-pop').popover({delay: {show: 1000, hide: 0}});
    $('[data-toggle="popover"]').popover();
  }

  animateMenu(){
    var sidenav_x:number = 0;
    var content_margin:number = 345;

    var duration:number = 500;

    if( $('.menubar-left').css('left') == "0px" ){
        sidenav_x = -345;
        content_margin = 0;
        $('.burger').attr("data-content", "Show menu");
    }
    else{
      $('.burger').attr("data-content", "Hide menu");
    }

    $('.burger').data('bs.popover').setContent();
    $('.burger').data('bs.popover').$tip.addClass($('.burger').data('bs.popover').options.placement);

    $('.menubar-left').animate({ left: (sidenav_x + "px") }, duration);



    this.mobileMode = (window.innerWidth < 1113);


    if(this.mobileMode === true){
        $('.content-main-authenticated').animate({ marginLeft: "0px", left: (content_margin + "px") }, duration);
    }
    else{
        $('.content-main-authenticated').animate({ marginLeft: (content_margin + "px"), left: "0px" }, duration);
    }

    $(".burger").addClass("burger-pulse-animation");
    setTimeout(function(){
      $(".burger").removeClass("burger-pulse-animation")
    }, 1000);
  }

  closeMenu(){
    if(window.innerWidth < 1114){
      $('.burger').attr("data-content", "Show menu");
      $('.burger').data('bs.popover').setContent();
      $('.burger').data('bs.popover').$tip.addClass($('.burger').data('bs.popover').options.placement);
      $('.menubar-left').animate({ left: "-345px" }, 500);
      $('.content-main-authenticated').animate({ marginLeft: "0px", left: "0px" }, 500);
    }
  }



}
