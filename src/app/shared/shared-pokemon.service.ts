import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPokemonService {

  private pokemonDetailSource = new BehaviorSubject<any>(null);
  currentPokemonDetail = this.pokemonDetailSource.asObservable();

  // 新たにpokemonListを管理するためのBehaviorSubjectを追加
  private pokemonListSource = new BehaviorSubject<any[]>([]);
  currentPokemonList = this.pokemonListSource.asObservable();

  constructor() { }

  changePokemonDetail(pokemonDetail: any) {
    this.pokemonDetailSource.next(pokemonDetail);
  }

  // pokemonListを更新するメソッドを追加
  changePokemonList(pokemonList: any[]) {
    this.pokemonListSource.next(pokemonList);
  }
}
