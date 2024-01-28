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
  //検索タイプが type の場合、TYPE_IDS から対応するタイプIDを取得し、そのIDに基づいてAPIを呼び出します。APIから返されたレスポンスに含まれるポケモンの名前のリストを取得し、それらの詳細情報を取得するために retrievePokemonDetails 関数を呼び出します。
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
  //id または name での検索の場合、入力されたクエリをAPIに渡し、handlePokemonData 関数を呼び出してレスポンスを処理します。
    this.apiService.getPokemonDetail(this.searchType, this.searchQuery).subscribe({
      next: (pokemonData) => this.handlePokemonData(pokemonData),
      error: (error) => console.error('Error:', error)
    });
  }
}

//APIからのレスポンスを受け取り、SharedPokemonService を介してアプリケーション全体で共有します。その後、詳細ページに遷移するためのルーティングを行います。
private handlePokemonData(pokemonData: any) {
  //取得したポケモンの詳細（pokemonData）を SharedPokemonService の changePokemonDetail メソッドを使って他のコンポーネントと共有します。
  this.sharedPokemonService.changePokemonDetail(pokemonData);
  const pokemonId = pokemonData.id;
  if (pokemonId) {
    // IDを使用してポケモンの詳細ページに遷移
    this.router.navigate(['/pokemon', pokemonId]);
  }
}

//タイプ検索の結果として取得されたポケモンの名前のリストに基づいて、各ポケモンの詳細情報を取得します。
private retrievePokemonDetails(pokemonNames: string[]) {
  const pokemonDetailsList = [];
  //リスト内の各ポケモンに対して、その名前を使ってAPIリクエストを行い、詳細情報を取得します。
  pokemonNames.forEach(name => {
    this.apiService.getPokemonDetail('name', name).subscribe(pokemonDetail => {
      pokemonDetailsList.push(pokemonDetail);
      // ポケモンのリストが全て取得できたらSharedPokemonService の changePokemonList メソッドを使用して取得したポケモンのリストを共有し、PokemonComponentに遷移
      if (pokemonDetailsList.length === pokemonNames.length) {
        this.sharedPokemonService.changePokemonList(pokemonDetailsList);
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
      

  
