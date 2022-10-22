import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /**
   * Add functions that will be called by client
   */

  // display tokenBalance
  @Get('get-token-balance')
  getTokenBalance(){
    return this.appService.getTokenBalance();
  }

  // display balance

  // function to buy Tokens

  // make a bet

  // display winner / display prize

  // withdraw tokens
}
