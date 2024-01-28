import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPokemonService {

  //BehaviorSubjectの定義:
  // pokemonDetailSource: これはポケモンの詳細データを保持するための BehaviorSubject です。初期値は null に設定されています。
  private pokemonDetailSource = new BehaviorSubject<any>(null);
  //pokemonDetailSource の現在の値を購読可能な形式で提供します。これを購読することで、ポケモンの詳細データの変更を追跡できます。
  currentPokemonDetail = this.pokemonDetailSource.asObservable();

  // 新たにpokemonListを管理するためのBehaviorSubjectを追加
  // pokemonListSource: これはポケモンのリストデータを保持するための BehaviorSubject です。初期値は空の配列（[]）に設定されています。
  private pokemonListSource = new BehaviorSubject<any[]>([]);
  //pokemonListSource の現在の値を購読可能な形式で提供します。これにより、ポケモンのリストデータの変更を追跡できます。
  currentPokemonList = this.pokemonListSource.asObservable();

  constructor() { }
  
  //新しいポケモンの詳細データを受け取り、pokemonDetailSource の現在の値を更新します。
  changePokemonDetail(pokemonDetail: any) {
    this.pokemonDetailSource.next(pokemonDetail);
  }

  //新しいポケモンのリストデータを受け取り、pokemonListSource の現在の値を更新します。
  changePokemonList(pokemonList: any[]) {
    this.pokemonListSource.next(pokemonList);
  }
}

//changePokemonDetail や changePokemonList メソッドを使用してデータを更新し、currentPokemonDetail や currentPokemonList を購読してデータの変更を監視します。

