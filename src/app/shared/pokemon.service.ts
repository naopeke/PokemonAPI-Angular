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
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private pokeTypeUrl = 'https://pokeapi.co/api/v2/type/';

  public pokemon: Pokemon;
  public searchType: 'id' | 'name' | 'type';
  public searchQuery: number | string;


  constructor(private http:HttpClient) {
   }

  //  PokemonService の役割
  //  検索タイプとクエリに基づいて適切なAPIリクエストを実行する getPokemonDetail メソッドを提供します。

  public getPokemonDetail(searchType: 'id' | 'name' | 'type', query: string | number): Observable<any> {
    if (searchType === 'id') {
      return this.http.get(`${this.pokeApiUrl}${query}`);
    } else if (searchType === 'name') {
      return this.http.get(`${this.pokeApiUrl}${query}`);
    } else if (searchType === 'type') {
      return this.http.get(`${this.pokeTypeUrl}${query}`);
    } else {
      // 不明な検索タイプの場合はエラーを投げる
      throw new Error(`Unknown search type: ${searchType}`);
    }
  }


}
