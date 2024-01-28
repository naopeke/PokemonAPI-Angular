import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/shared/pokemon.service';
import { Response } from 'src/app/models/response';
import { TYPE_IDS } from 'src/app/models/constants';
import { SharedPokemonService } from 'src/app/shared/shared-pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pokemon: Pokemon;
  public id: number;
  public pokemonDetail: any;
  public parameter: string;
  public searchType: 'id' | 'name' | 'type';
  public searchQuery: string;
  public pokemonList: any[];

  constructor(
    public apiService: PokemonService,
    private router:Router,
    private activateRoute: ActivatedRoute,
    private sharedPokemonService: SharedPokemonService
  ){
    this.parameter = this.activateRoute.snapshot.params.id;
    this.apiService.pokemon = null;
  }


// HomeComponent の役割

//     ユーザーからの入力（searchType と searchQuery）を受け取り、PokemonService の getPokemonDetail メソッドを使用して検索を実行します。
//     検索結果を SharedPokemonService 経由で共有します。
//     handlePokemonData メソッドは、検索結果を SharedPokemonService に送信する役割を担います。

//performSearch はユーザー入力に基づいてポケモンのデータを検索するメソッドです。このメソッドは、通常、検索フォームを含むコンポーネントに配置します。

performSearch(event:Event): void {
  event.preventDefault();
  console.log("Search button clicked", this.searchType, this.searchQuery);
  if (this.searchType === 'type') {
    if (typeof this.searchQuery === 'string') {
      const typeId = TYPE_IDS[this.searchQuery.toLowerCase()];
      if (typeId) {
        this.apiService.getPokemonDetail('type', typeId).subscribe({
          next: (response) => {
            const pokemonNames = response.pokemon.map(p => p.pokemon.name);
            this.retrievePokemonDetails(pokemonNames);
          },
          error: (error) => console.error('Error:', error)
        });
      }
    }
  } else {
    this.apiService.getPokemonDetail(this.searchType, this.searchQuery).subscribe({
      next: (pokemonData) => this.handlePokemonData(pokemonData),
      error: (error) => console.error('Error:', error)
    });
  }
}


private handlePokemonData(pokemonData: any) {
  this.sharedPokemonService.changePokemonDetail(pokemonData);
  const pokemonId = pokemonData.id;
  if (pokemonId) {
    // IDを使用してポケモンの詳細ページに遷移
    this.router.navigate(['/pokemon', pokemonId]);
  }
}


private retrievePokemonDetails(pokemonNames: string[]) {
  const pokemonDetailsList = [];
  pokemonNames.forEach(name => {
    this.apiService.getPokemonDetail('name', name).subscribe(pokemonDetail => {
      pokemonDetailsList.push(pokemonDetail);
      if (pokemonDetailsList.length === pokemonNames.length) {
        this.sharedPokemonService.changePokemonList(pokemonDetailsList);
        // ポケモンのリストが全て取得できたらPokemonComponentに遷移
        this.router.navigate(['/pokemon']);
      }
    });
  });
}



ngOnInit(): void {
}


}        
    

      // 名前で検索し、IDのページに飛ばすには．．．
      // searchByName(searchInput: string): void {
      //   this.apiService.searchPokemonByName(searchInput).subscribe({
      //     next: (pokemonData: any) => {
      //       const pokemonId = pokemonData.id; // レスポンスからIDを取得
      //       this.router.navigate(['/pokemon'], { queryParams: { id: pokemonId } });
      //     },
      //     error: error => {
      //       console.error('Error:', error);
      //     }
      //   });
      // }
      

  
