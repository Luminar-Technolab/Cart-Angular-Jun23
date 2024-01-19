import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems:any = []
  cartTotalPrice:number = 0
  constructor(private api:ApiService,private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getcart()
    }else{
      this.cartItems = []
    }
  }
  getcart(){
    this.api.getCartAPI().subscribe((res:any)=>{
      this.cartItems = res
      this.getCartTotalPrice()
    })
  }

  getCartTotalPrice(){
    if(this.cartItems.length>0){
      let total = 0 
      this.cartItems.forEach((product:any)=>{
        total += product.grantTotal
      })
      this.cartTotalPrice = Math.ceil(total)
    }else{
      this.cartTotalPrice = 0
    }
  }

  incrementCart(id:any){
    this.api.cartIncrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  decrementCart(id:any){
    this.api.cartDecrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  removeItem(id:any){
    this.api.removeCartItemAPI(id).subscribe((res:any)=>{
      this.getcart()
      this.api.getCartCount()
    })
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe((res:any)=>{
      this.getcart()
      this.api.getCartCount()
    })
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotalPrice))
    this.router.navigateByUrl("/user/checkout")
  }

}
