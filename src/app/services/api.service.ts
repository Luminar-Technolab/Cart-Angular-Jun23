import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

  getAllproductsAPI(){
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }
  LoginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }
  getProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }

  appendTokenToHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //wishlist/add/
  addToWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenToHeader())
  }
  //wishlist/get-allproducts
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/wishlist/get-allproducts`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      console.log(res);
      this.wishlistCount.next(res.length)
    })
  }

  ///wishlist/remove/:id
  deleteWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenToHeader())
  }

  //cart/add
  addtocartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenToHeader())
  }

  //cart/get-all-products
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/cart/get-all-products`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      console.log(res);
      this.cartCount.next(res.length)
    })
  }

  //cart/increment
  cartIncrementAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/increment/${id}`,this.appendTokenToHeader())
  }
  //cart/decrement
  cartDecrementAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/decrement/${id}`,this.appendTokenToHeader())
  }

  //cart/remove
  removeCartItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/cart/remove/${id}`,this.appendTokenToHeader())
  }
  //emptycart
  emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/cart/empty`,this.appendTokenToHeader())
  }

}
