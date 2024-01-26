import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // private url = 'http://localhost:3000/pokemon';
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/'

  public pokemon: Pokemon;

  constructor(private http:HttpClient) {
   }


   public getOne(id: number):Observable<Object>{
    console.log(id);
    return this.http.get(`${this.pokeApiUrl}${id}`);
  };


}
